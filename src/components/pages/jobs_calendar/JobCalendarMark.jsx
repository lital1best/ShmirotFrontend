import {useUser} from "../../../userContext";
import useSWR from "swr";
import {DOES_SOLDIER_HAS_CONSTRAINT_FOR_JOB_URL} from "../../../api/SoldiersConstrainsApi";
import {Tooltip} from "@mui/material";
import {EXEMPTIONS_OPTIONS, SERVICE_STATUSES} from "../../../consts";
import React from "react";
import styled from "styled-components";

export function JobCalendarMark({job, onClick, isSelected}) {
    const {user, isJobMaster} = useUser()

    const {data: hasConstraint} = useSWR((!isJobMaster || job?.soldier) && DOES_SOLDIER_HAS_CONSTRAINT_FOR_JOB_URL(isJobMaster? job?.soldier?.personalNumber ?? job?.soldier: user.personalNumber, job.id))

    return <Tooltip title={
        <>
            <div>Description: {job.description}</div>
            <div>ServiceStatus: {SERVICE_STATUSES[job.serviceStatus]}</div>
            {
                job?.exemptions.length > 0 &&
                <div>Exemptions: {job.exemptions.map(exemptionIndex => EXEMPTIONS_OPTIONS[exemptionIndex]).join(",")}</div>
            }
            <div>Score: {job.score}</div>
        </>
    } arrow>
        <JobPill key={job.id} onClick={onClick}
                 isAssigned={!!job?.soldier} isJobMaster={isJobMaster} isSelected={isSelected}
                 hasConstraint={hasConstraint}>
            <span>{job.location}</span>
        </JobPill>
    </Tooltip>
}

const JobPill = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 8px;
    ${(props) => props.isAssigned && `
    background: rgba(0, 255, 0, 0.2);
  `}

    ${(props) => (props.isJobMaster && !props.isAssigned) && `
    background: rgba(255, 0, 0, 0.2);
  `}

    ${(props) => (props.hasConstraint) && `
    background: #cc6600;
  `}

    ${(props) => props.isSelected && `
    animation: highlightBorder 2s linear infinite;
    @keyframes highlightBorder {
      0% { border-color: var(--army-green-dark); }
      50% { border-color: #4CAF50; }
      100% { border-color: var(--army-green-dark); }
    }
  `}

    color: var(--accent-2);
    border: 1px solid var(--army-green-dark);
    border-radius: 999px;
    font-size: 12px;
    cursor: pointer;
`;