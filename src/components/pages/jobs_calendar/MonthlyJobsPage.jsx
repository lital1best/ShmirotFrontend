import React, {useMemo, useState} from "react";
import styled from "styled-components";
import {Button} from "../../CommonStyles";
import {JobDialog} from "./JobDialog";
import {useUser} from "../../../userContext";
import useSWR from "swr";
import {JOB_MASTER_JOBS_FOR_MONTH_URL} from "../../../api/JobMasterApi";
import {SOLDIERS_JOBS_FOR_MONTH_URL} from "../../../api/SoldiersApi";
import {Tooltip} from "@mui/material";
import {EXEMPTIONS_OPTIONS, SERVICE_STATUSES} from "../../../consts";
import {DOES_SOLDIER_HAS_CONSTRAINT_FOR_JOB_URL, GET_CONSTRAINTS_BY_SOLDIER_URL} from "../../../api/SoldiersConstrainsApi";
import {JobCalendarMark} from "./JobCalendarMark";

export default function MonthlyJobsPage() {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);

    const {user, isJobMaster} = useUser()
    const [currentMonth, setCurrentMonth] = useState(() => {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 1);
    });

    const getMonthJobsUrlFunction = isJobMaster ? JOB_MASTER_JOBS_FOR_MONTH_URL : SOLDIERS_JOBS_FOR_MONTH_URL
    const swrKey = getMonthJobsUrlFunction(user?.personalNumber, currentMonth?.getMonth() + 1, currentMonth?.getFullYear());
    const {
        data: jobs,
        mutate: mutateJobs
    } = useSWR(swrKey);

    const {monthLabel, leadingBlanks, monthDays, trailingBlanks} = useMemo(
        () => buildMonthView(currentMonth),
        [currentMonth]
    );

    const onPrev = () => {
        setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    };
    const onNext = () => {
        setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    };
    const onToday = () => {
        const d = new Date();
        setCurrentMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    };

    const startAddFor = (dateKey) => {
        setSelectedDate(dateKey);
        setShowAddDialog(true);
    };

    const onDialogClose = () => {
        mutateJobs(swrKey).then(() => {
            setShowAddDialog(false);
            setSelectedJob(null);
            setSelectedDate(null);
        })
    };

    return <CalendarContainer>
        <CalendarHeader>
            <HeaderLeft>
                <HeaderTitle>{monthLabel}</HeaderTitle>
                <HeaderSub>Assign and review monthly shmirot</HeaderSub>
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

        <DayGrid role="grid">
            {Array.from({length: leadingBlanks})?.map((_, i) => (
                <EmptyCell key={`lead-${i}`}/>
            ))}
            {monthDays?.map((day) => {
                const key = day.date.toISOString().slice(0, 10);
                const jobsThisDay = Array.isArray(jobs) ? jobs?.filter(j => j.date === key) : [];

                return (
                    <DayCell
                        key={key}
                        $today={day.isToday}
                    >
                        <DayHeader>
                            <DayNumber $today={day.isToday}>{day.date.getDate()}</DayNumber>
                            {isJobMaster &&
                                <SmallAction
                                    type="button"
                                    onClick={() => startAddFor(key)}
                                >
                                    + Add Job
                                </SmallAction>
                            }
                        </DayHeader>

                        <JobsList>
                            {
                                jobsThisDay?.map((job) => <JobCalendarMark job={job} setSelectedJob={setSelectedJob}/>)
                            }
                        </JobsList>
                    </DayCell>
                );
            })}
            {Array.from({length: trailingBlanks})?.map((_, i) => (
                <EmptyCell key={`trail-${i}`}/>
            ))}
        </DayGrid>
        <JobDialog isJobMaster={isJobMaster}
                   isOpen={showAddDialog || !!selectedJob} onClose={onDialogClose} selectedDate={selectedDate}
                   selectedJob={selectedJob}/>
    </CalendarContainer>
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


