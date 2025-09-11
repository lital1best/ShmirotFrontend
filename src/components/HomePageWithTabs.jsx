// HomePage.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Subtitle, Title } from "./CommonStyles";
import MonthlyJobsPage from "./pages/monthly_jobs_page/MonthlyJobsPage";
import { useUser } from "../userContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [activeTab, setActiveTab] = useState('monthly');
    const navigate = useNavigate();
    const { user, logout } = useUser();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [!!user]);

    return (
        <Screen>
            <Tabs role="tablist" aria-label="Shmirot sections">
                <StyledTabButton
                    $active={activeTab === 'monthly'}
                    onClick={() => setActiveTab('monthly')}
                >
                    Monthly Shmirot
                </StyledTabButton>
                <StyledTabButton
                    $active={activeTab === 'score'}
                    onClick={() => setActiveTab('score')}
                >
                    Score
                </StyledTabButton>
                <StyledTabButton
                    role="tab"
                    aria-selected={activeTab === 'personal'}
                    aria-controls="tab-personal"
                    id="tab-personal-btn"
                    $active={activeTab === 'personal'}
                    onClick={() => setActiveTab('personal')}
                >
                    Personal Details
                </StyledTabButton>
            </Tabs>

            <Container>
                <Header>
                    <div>
                        <Title>Shmirot Home</Title>
                        <Subtitle>Welcome to your Shmirot dashboard</Subtitle>
                    </div>
                    <Button onClick={logout}>Logout</Button>
                </Header>

                <Panel
                    id="tab-monthly"
                    role="tabpanel"
                    aria-labelledby="tab-monthly-btn"
                    hidden={activeTab !== 'monthly'}
                >
                    <Placeholder>
                        <MonthlyJobsPage />
                    </Placeholder>
                </Panel>

                <Panel
                    id="tab-score"
                    role="tabpanel"
                    aria-labelledby="tab-score-btn"
                    hidden={activeTab !== 'score'}
                >
                    <SectionTitle>Score</SectionTitle>
                    <Placeholder>
                        {/* Replace with score widgets/charts */}
                        Coming soon: your current score, history, and rankings.
                    </Placeholder>
                </Panel>

                <Panel
                    id="tab-personal"
                    role="tabpanel"
                    aria-labelledby="tab-personal-btn"
                    hidden={activeTab !== 'personal'}
                >
                    <SectionTitle>Personal Details</SectionTitle>
                    <Placeholder>
                        {/* Replace with editable profile fields */}
                        Coming soon: your profile, contact info, and preferences.
                    </Placeholder>
                </Panel>
            </Container>
        </Screen>
    );
}

const Screen = styled.main`
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    padding: 32px 0 20px 20px;
    gap: 16px;
`;

const Tabs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 4px;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid var(--army-green-dark);
    border-radius: 8px;
    backdrop-filter: blur(2px);
    height: fit-content;
    width: 160px;
`;

const StyledTabButton = styled(Button)`
    padding: 8px 16px;
    border: none;
    background: ${({$active}) =>
    $active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
    border-left: ${({$active}) =>
    $active ? '2px solid var(--accent-1)' : 'none'};
    color: ${({$active}) => ($active ? 'var(--accent-1)' : 'var(--sand)')};
    font-weight: ${({$active}) => ($active ? '600' : '400')};
    cursor: pointer;
    width: 100%;
    text-align: left;
    font-size: 14px;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
    }
`;

const Container = styled.div`
    width: 90%;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid var(--army-green-dark);
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(2px);
    overflow: hidden;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.25);
  z-index: 100;
  border-bottom: 1px solid var(--army-green-dark);
`;

const Panel = styled.section`
    flex: 1;
    background: rgba(168, 159, 123, 0.08);
    padding: 24px;
    height: calc(100vh - 180px);
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(168, 159, 123, 0.3);
        border-radius: 4px;
    }
`;

const SectionTitle = styled.h2`
    font-size: 18px;
    margin: 0 0 10px 0;
    color: var(--accent-2);
`;

const Placeholder = styled.div`
    color: var(--sand);
    opacity: 0.9;
    font-size: 14px;
`;
