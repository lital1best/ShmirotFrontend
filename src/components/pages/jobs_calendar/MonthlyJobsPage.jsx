import React, {useMemo, useState} from "react";
import styled from "styled-components";
import {Button} from "../../CommonStyles";
import {canSoldierDoJob, JobDialog, SoldierRow} from "./JobDialog";
import {useUser} from "../../../userContext";
import useSWR from "swr";
import {
    GET_SOLDIERS_ORDERED_BY_SCORE_URL,
    JOB_MASTER_JOBS_FOR_MONTH_URL,
    SuggestJobsForMonthApi
} from "../../../api/JobMasterApi";
import {SOLDIERS_JOBS_FOR_MONTH_URL} from "../../../api/SoldiersApi";
import {JobCalendarMark} from "./JobCalendarMark";
import {SubmitJobsAssignment} from "../../../api/JobsApi";

export default function MonthlyJobsPage() {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [suggestionsMap, setSuggestionsMap] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);

    const {user, isJobMaster} = useUser()
    const [currentMonth, setCurrentMonth] = useState(() => {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 1);
    });

    const {data: soldiersByScore} = useSWR(GET_SOLDIERS_ORDERED_BY_SCORE_URL(user?.personalNumber))

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
            setSuggestionsMap({});
            setIsEditMode(false);
        })
    };

    const onSuggestClick = async () => {
        const suggestionsData = await SuggestJobsForMonthApi(user.personalNumber, currentMonth.getMonth() + 1, currentMonth.getFullYear());

        setSuggestionsMap(new Map(suggestionsData.data.map(suggestion => [suggestion.jobId, suggestion.soldierPersonalNumber])));
        setIsEditMode(true);
    }

    const submitSuggestions = async () => {
        SubmitJobsAssignment(Object.keys(suggestionsMap).map(key => ({jobId: key, soldierPersonalNumber: suggestionsMap[key]}))).then(onDialogClose).catch(console.error)
    }


    return <CalendarContainer>
        <CalendarHeader>
            <HeaderLeft>
                <HeaderTitle>{monthLabel}</HeaderTitle>
                <HeaderSub>Assign and review monthly shmirot</HeaderSub>
            </HeaderLeft>
            <HeaderActions>
                {isEditMode ? (
                    <>
                        <EditModeIndicator>Edit Mode</EditModeIndicator>
                        <Button hidden={!isJobMaster} onClick={submitSuggestions}>Submit Suggestions</Button>
                    </>
                ) : (
                    <Button hidden={!isJobMaster} onClick={onSuggestClick}>Suggest Assigns</Button>
                )}

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
                                jobsThisDay?.map((job) => {
                                    const suggestion = suggestionsMap[job.id];
                                    return <JobCalendarMark
                                        onClick={() => {
                                            startAddFor(job.date);
                                            setSelectedJob(job)
                                        }}
                                        job={{
                                            ...job,
                                            soldier: suggestion?.soldierPersonalNumber ?? job.soldier,
                                            isSuggestion: !!suggestion
                                        }}
                                        isSelected={selectedJob?.id === job.id}
                                    />
                                })
                            }
                        </JobsList>
                    </DayCell>
                );
            })}
            {Array.from({length: trailingBlanks})?.map((_, i) => (
                <EmptyCell key={`trail-${i}`}/>
            ))}
        </DayGrid>
        {selectedJob && isEditMode && <SoldiersListForEdit suggestionsMap={suggestionsMap} selectedJob={selectedJob} soldiersByScore={soldiersByScore} setSuggestionsMap={setSuggestionsMap}/>}
        <JobDialog isJobMaster={isJobMaster}
                   isOpen={showAddDialog && !isEditMode} onClose={onDialogClose} selectedDate={selectedDate}
                   selectedJob={selectedJob} soldiersByScore={soldiersByScore}/>

    </CalendarContainer>
}

export function SoldiersListForEdit({suggestionsMap, selectedJob, soldiersByScore, setSuggestionsMap}){
    const selectedSoldierPersonalNumber = suggestionsMap[selectedJob.id] ?? soldiersByScore?.find(s => s.personalNumber === selectedJob?.soldier?.personalNumber)?.personalNumber;

    return <EligibleSoldiersContainer>
            <HeaderTitle>Eligible Soldiers for {selectedJob.description}</HeaderTitle>
            <SoldiersList>
                {
                    soldiersByScore?.filter(s => canSoldierDoJob(s, selectedJob)).map(soldier => (
                    <SoldierItem
                    key={soldier?.personalNumber}
                    $isSelected={selectedSoldierPersonalNumber === soldier?.personalNumber}
                    onClick={async () => {
                        setSuggestionsMap((prev) => ({
                            ...prev,
                            [selectedJob.id]: soldier.personalNumber
                        }));
                    }}>
                        <SoldierRow soldier={soldier} jobConstraints={[]}/>
                    </SoldierItem>
                    ))
                }
        </SoldiersList>
    </EligibleSoldiersContainer>
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

const EditModeIndicator = styled.div`
    background-color: red;
    color: var(--sand);
    padding: 6px 12px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    font-weight: bold;
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

const EligibleSoldiersContainer = styled.div`
    margin-top: 20px;
    padding: 16px;
    background: rgba(168, 159, 123, 0.08);
    border: 1px solid var(--army-green-dark);
    border-radius: 10px;
`;

const SoldiersList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 4px;
    margin-top: 12px;
`;

const SoldierItem = styled.div`
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    background: ${props => props.$isSelected ? 'rgba(199, 211, 111, 0.2)' : 'transparent'};

    &:hover {
        background: rgba(199, 211, 111, 0.1);
    }
`;


