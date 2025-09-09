import React, {useMemo, useState} from "react";
import styled from "styled-components";
import {Button} from "../../CommonStyles";

export default function MonthlyJobsPage() {
    const [currentMonth, setCurrentMonth] = useState(() => {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 1);
    });

    const [jobsByDate, setJobsByDate] = useState(() => ({})); // { 'YYYY-MM-DD': [{ id, text }] }
    const [editingDateKey, setEditingDateKey] = useState(null);
    const [newJobText, setNewJobText] = useState("");

    const {monthLabel, leadingBlanks, monthDays, trailingBlanks} = useMemo(
        () => buildMonthView(currentMonth),
        [currentMonth]
    );

    const onPrev = () => {
        setEditingDateKey(null);
        setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    };
    const onNext = () => {
        setEditingDateKey(null);
        setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    };
    const onToday = () => {
        setEditingDateKey(null);
        const d = new Date();
        setCurrentMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    };

    const startAddFor = (dateKey) => {
        setEditingDateKey(dateKey);
        setNewJobText("");
    };

    const submitJob = (e) => {
        e.preventDefault();
        const key = editingDateKey;
        if (!key || !newJobText.trim()) return;
        setJobsByDate((prev) => {
            const list = prev[key] || [];
            const next = [...list, {id: Date.now(), text: newJobText.trim()}];
            return {...prev, [key]: next};
        });
        setNewJobText("");
        setEditingDateKey(null);
    };

    const removeJob = (dateKey, id) => {
        setJobsByDate((prev) => {
            const list = prev[dateKey] || [];
            return {...prev, [dateKey]: list.filter((j) => j.id !== id)};
        });
    };

    return (
        <CalendarContainer>
            <CalendarHeader>
                <HeaderLeft>
                    <HeaderTitle>{monthLabel}</HeaderTitle>
                    <HeaderSub>Assign and review monthly jobs</HeaderSub>
                </HeaderLeft>
                <HeaderActions>
                    <Button onClick={onPrev}>◀</Button>
                    <Button onClick={onToday}>Today</Button>
                    <Button onClick={onNext}>▶</Button>
                </HeaderActions>
            </CalendarHeader>

            <Weekdays>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <Weekday key={d}>{d}</Weekday>
                ))}
            </Weekdays>

            <DayGrid role="grid" >
                {Array.from({length: leadingBlanks}).map((_, i) => (
                    <EmptyCell key={`lead-${i}`} aria-hidden="true"/>
                ))}
                {monthDays.map((day) => {
                    const key = day.date.toString();
                    const jobs = jobsByDate[key] || [];
                    const isEditing = editingDateKey === key;
                    return (
                        <DayCell
                            key={key}
                            aria-selected={isEditing}
                            $today={day.isToday}
                        >
                            <DayHeader>
                                <DayNumber $today={day.isToday}>{day.date.getDate()}</DayNumber>
                                <SmallAction
                                    type="button"
                                    onClick={() => startAddFor(key)}
                                >
                                    + Add Job
                                </SmallAction>
                            </DayHeader>

                            <JobsList>
                                {jobs.map((j) => (
                                    <JobPill key={j.id}>
                                        <span>{j.text}</span>
                                        <RemoveBtn
                                            type="button"
                                            onClick={() => removeJob(key, j.id)}
                                            title="Remove"
                                        >
                                            ×
                                        </RemoveBtn>
                                    </JobPill>
                                ))}
                            </JobsList>

                            {isEditing && (
                                <AddForm onSubmit={submitJob}>
                                    <AddInput
                                        autoFocus
                                        value={newJobText}
                                        onChange={(e) => setNewJobText(e.target.value)}
                                        placeholder="Job description…"
                                    />
                                    <AddButton type="submit">Add</AddButton>
                                </AddForm>
                            )}
                        </DayCell>
                    );
                })}
                {Array.from({length: trailingBlanks}).map((_, i) => (
                    <EmptyCell key={`trail-${i}`} aria-hidden="true"/>
                ))}
            </DayGrid>
        </CalendarContainer>
    );
}

function buildMonthView(monthDate) {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const monthLabel = firstOfMonth.toLocaleString(undefined, {month: "long", year: "numeric"});

    const startDay = firstOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const leadingBlanks = startDay;
    const monthDays = Array.from({length: daysInMonth}, (_, i) => {
        const d = new Date(year, month, i + 1);
        return {date: d, isToday: isSameDate(d, new Date())};
    });

    const cellsUsed = leadingBlanks + daysInMonth;
    const trailingBlanks = (7 - (cellsUsed % 7)) % 7;

    return {monthLabel, leadingBlanks, monthDays, trailingBlanks};
}

function isSameDate(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CalendarHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--army-green-dark);
  border-radius: 10px;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  color: var(--accent-2);
`;

const HeaderSub = styled.span`
  color: var(--sand);
  font-size: 12px;
  opacity: 0.9;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  padding: 0 2px;
`;

const Weekday = styled.div`
  text-align: center;
  color: var(--sand);
  font-weight: 700;
  letter-spacing: 0.2px;
  padding: 6px 0;
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(120px, 1fr);
  gap: 8px;
`;

const DayCell = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(168, 159, 123, 0.08);
  border: 1px solid var(--army-green-dark);
  border-radius: 10px;
  padding: 10px;
  min-height: 120px;
  outline: none;
  position: relative;

  ${(p) =>
    p.$today &&
    `
    box-shadow: 0 0 0 2px var(--accent) inset;
    border-color: var(--accent);
  `}
`;

const EmptyCell = styled.div`
  border-radius: 10px;
  min-height: 120px;
`;

const DayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
`;

const DayNumber = styled.div`
  font-weight: 800;
  color: var(--accent-2);
`;

const SmallAction = styled.button`
  appearance: none;
  border: 1px solid var(--army-green-dark);
  background: transparent;
  color: var(--sand);
  padding: 4px 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.15s ease;

  &:hover {
    background: var(--army-green-dark);
    color: var(--accent-2);
    border-color: var(--olive);
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(199, 211, 111, 0.35);
    outline: none;
  }
`;

const JobsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const JobPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  background: rgba(0, 0, 0, 0.2);
  color: var(--accent-2);
  border: 1px solid var(--army-green-dark);
  border-radius: 999px;
  font-size: 12px;
`;

const RemoveBtn = styled.button`
    appearance: none;
    border: none;
    background: transparent;
    color: var(--sand);
    cursor: pointer;
    font-size: 14px;
    padding: 0 4px;

    &:hover {
        color: var(--accent);
    }
`;

const AddForm = styled.form`
  display: flex;
  gap: 6px;
  margin-top: auto; /* push to bottom */
  padding-top: 8px;
  border-top: 1px dashed var(--army-green-dark);
`;

const AddInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid var(--army-green-dark);
  background: rgba(255, 255, 255, 0.04);
  color: var(--accent-2);
  outline: none;
  font-size: 13px;
  transition: 140ms ease;

  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(199, 211, 111, 0.25);
    background: rgba(255, 255, 255, 0.06);
  }

  &::placeholder {
    color: rgba(240, 246, 220, 0.5);
  }
`;

const AddButton = styled(Button)`
  padding: 8px 10px;
  font-weight: 700;
`;