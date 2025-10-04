import styled from "styled-components";
import useSWR from "swr";
import {GET_SOLDIERS_ORDERED_BY_SCORE_URL} from "../../api/JobMasterApi";
import {useEffect} from "react";
import {SERVICE_STATUSES} from "../../consts";
import {useUser} from "../../providers/UserProvider";

export function ScoreBoard({currentTab}) {
    const {user, isJobMaster} = useUser();

    const {data: soldiers, mutate} = useSWR(GET_SOLDIERS_ORDERED_BY_SCORE_URL(isJobMaster ? user?.personalNumber : user?.jobMasterPersonalNumber))

    useEffect(() => {
        if (currentTab === 'score') mutate().then()
    }, [currentTab === 'score'])

    return <ScoreList>
        {soldiers?.toReversed().map((soldier) => (
            <ScoreItem key={soldier.personalNumber}
                       highlighted={!isJobMaster && soldier.personalNumber === user?.personalNumber}>
            <ScoreName>{soldier.firstName} {soldier.lastName}</ScoreName>
                <ScoreDetails>
                    <span>Score: {soldier.score}</span>
                    <span>Rank: {soldier.rank}</span>
                    <span>Service Status: {SERVICE_STATUSES[soldier.serviceStatus]}</span>

                </ScoreDetails>
            </ScoreItem>
        ))}
        {(!soldiers?.length) && <span> There are no soldiers registered for you </span>}
    </ScoreList>
}


const ScoreList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const ScoreItem = styled.div`
    padding: 12px;
    background: ${props => props.highlighted ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
    border-radius: 8px;
    border: 1px solid var(--army-green-dark);
`;

const ScoreName = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: var(--sand);
    margin-bottom: 4px;
`;

const ScoreDetails = styled.div`
    display: flex;
    gap: 16px;
    font-size: 14px;
    color: var(--sand);
    opacity: 0.8;
`;

