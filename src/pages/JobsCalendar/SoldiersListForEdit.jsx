import {canSoldierDoJob, SoldierRow} from "./JobDialog";
import React from "react";
import {HeaderTitle} from "./MonthlyJobsPage";
import styled from "styled-components";

export function SoldiersListForEdit({suggestionsMap, selectedJob, soldiersByScore, setSuggestionsMap}) {
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

