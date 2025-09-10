// HomePage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import {Button, Subtitle, Title} from "./CommonStyles";
import MonthlyJobsPage from "./pages/monthly_jobs_page/MonthlyJobsPage";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('monthly');

  return (
    <Screen>
      <Container>
        <Header>
          <Title>Shmirot Home</Title>
          <Subtitle>Welcome to your Shmirot dashboard</Subtitle>
        </Header>

        <Tabs role="tablist" aria-label="Shmirot sections">
          <Button
            role="tab"
            aria-selected={activeTab === 'monthly'}
            aria-controls="tab-monthly"
            id="tab-monthly-btn"
            $active={activeTab === 'monthly'}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly Shmirot
          </Button>
          <Button
            role="tab"
            aria-selected={activeTab === 'score'}
            aria-controls="tab-score"
            id="tab-score-btn"
            $active={activeTab === 'score'}
            onClick={() => setActiveTab('score')}
          >
            Score
          </Button>
          <Button
            role="tab"
            aria-selected={activeTab === 'personal'}
            aria-controls="tab-personal"
            id="tab-personal-btn"
            $active={activeTab === 'personal'}
            onClick={() => setActiveTab('personal')}
          >
            Personal Details
          </Button>
        </Tabs>

        <Panel
          id="tab-monthly"
          role="tabpanel"
          aria-labelledby="tab-monthly-btn"
          hidden={activeTab !== 'monthly'}
        >
          <SectionTitle>Monthly Shmirot</SectionTitle>
          <Placeholder>
              <MonthlyJobsPage/>
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
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 16px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 980px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--army-green-dark);
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
`;

const Header = styled.header`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
`;


const Tabs = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 1px solid var(--army-green-dark);
`;

const Panel = styled.section`
  margin-top: 16px;
  background: rgba(168, 159, 123, 0.08); /* khaki tint */
  border: 1px solid var(--army-green-dark);
  border-radius: 12px;
  padding: 20px;
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
