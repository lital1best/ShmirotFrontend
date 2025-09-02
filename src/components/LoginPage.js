import React, { useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #1a2332 0%, #2d3748 50%, #1a202c 100%);
  font-family: 'Rajdhani', sans-serif;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    background-image: 
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255, 255, 255, 0.03) 10px,
        rgba(255, 255, 255, 0.03) 20px
      ),
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 10px,
        rgba(255, 255, 255, 0.03) 10px,
        rgba(255, 255, 255, 0.03) 20px
      );
  }
`;

const LoginCard = styled.div`
  background: rgba(26, 35, 50, 0.95);
  border: 2px solid #4a5568;
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: 480px) {
    margin: 1rem;
    padding: 2rem 1.5rem;
  }
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const StarBadge = styled.div`
  display: inline-block;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #1a202c;
  font-weight: 900;
  box-shadow: 
    0 8px 16px rgba(255, 215, 0, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.3);
  margin: 0 auto 1rem;
`;

const LoginTitle = styled.h1`
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  font-weight: 900;
  color: #e2e8f0;
  margin: 0.5rem 0;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const LoginSubtitle = styled.p`
  color: #a0aec0;
  font-size: 0.9rem;
  margin: 0;
  font-weight: 600;
  letter-spacing: 1px;
`;

const UserTypeSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: rgba(45, 55, 72, 0.5);
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #4a5568;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const UserTypeButton = styled.button`
  background: transparent;
  border: 2px solid #4a5568;
  border-radius: 6px;
  padding: 1rem 0.5rem;
  color: #a0aec0;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: 1px;

  &:hover {
    border-color: #68d391;
    color: #e2e8f0;
    background: rgba(104, 211, 145, 0.1);
    transform: translateY(-2px);
  }

  ${props => props.active && `
    border-color: #68d391;
    background: linear-gradient(135deg, rgba(104, 211, 145, 0.2) 0%, rgba(72, 187, 120, 0.1) 100%);
    color: #68d391;
    box-shadow: 
      0 4px 12px rgba(104, 211, 145, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  `}

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
`;

const RankIcon = styled.div`
  font-size: 1.5rem;
`;

const LoginForm = styled.form`
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  animation: ${fadeInUp} 0.8s ease-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.delay || '0s'};
`;

const FormLabel = styled.label`
  display: block;
  color: #e2e8f0;
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
  font-family: 'Orbitron', monospace;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(45, 55, 72, 0.8);
  border: 2px solid #4a5568;
  border-radius: 6px;
  color: #e2e8f0;
  font-size: 1rem;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #68d391;
    background: rgba(45, 55, 72, 0.9);
    box-shadow: 
      0 0 0 3px rgba(104, 211, 145, 0.1),
      0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &::placeholder {
    color: #718096;
    font-style: italic;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 
    0 8px 16px rgba(72, 187, 120, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
    transform: translateY(-2px);
    box-shadow: 
      0 12px 24px rgba(72, 187, 120, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  ${props => props.loading && `
    background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  `}
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoginFooter = styled.div`
  text-align: center;
  border-top: 1px solid #4a5568;
  padding-top: 1.5rem;
`;

const SecurityNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #ffd700;
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  letter-spacing: 1px;
`;

const SecurityIcon = styled.span`
  font-size: 1rem;
`;

const HelpLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 0.85rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const HelpLink = styled.a`
  color: #68d391;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #9ae6b4;
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  color: #4a5568;

  @media (max-width: 480px) {
    display: none;
  }
`;

const LoginPage = () => {
  const [userType, setUserType] = useState('soldier');
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    serviceNumber: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      console.log('Login attempt:', { userType, credentials });
      setIsLoading(false);
      // Here you would typically handle the actual authentication
    }, 2000);
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setCredentials({
      username: '',
      password: '',
      serviceNumber: ''
    });
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <LoginCard>
          <LoginHeader>
            <StarBadge>★</StarBadge>
            <LoginTitle>MILITARY ACCESS PORTAL</LoginTitle>
            <LoginSubtitle>Secure Authentication System</LoginSubtitle>
          </LoginHeader>

          <UserTypeSelector>
            <UserTypeButton
              type="button"
              active={userType === 'soldier'}
              onClick={() => handleUserTypeChange('soldier')}
            >
              <RankIcon>🎖️</RankIcon>
              <span>REGULAR SOLDIER</span>
            </UserTypeButton>
            <UserTypeButton
              type="button"
              active={userType === 'jobmaster'}
              onClick={() => handleUserTypeChange('jobmaster')}
            >
              <RankIcon>⭐</RankIcon>
              <span>JOB MASTER</span>
            </UserTypeButton>
          </UserTypeSelector>

          <LoginForm onSubmit={handleLogin}>
            <FormGroup delay="0.1s">
              <FormLabel htmlFor="username">
                {userType === 'jobmaster' ? 'OFFICER ID' : 'SOLDIER ID'}
              </FormLabel>
              <FormInput
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                placeholder={userType === 'jobmaster' ? 'Enter Officer ID' : 'Enter Soldier ID'}
                required
              />
            </FormGroup>

            {userType === 'soldier' && (
              <FormGroup delay="0.2s">
                <FormLabel htmlFor="serviceNumber">
                  SERVICE NUMBER
                </FormLabel>
                <FormInput
                  type="text"
                  id="serviceNumber"
                  name="serviceNumber"
                  value={credentials.serviceNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Service Number"
                  required
                />
              </FormGroup>
            )}

            <FormGroup delay={userType === 'soldier' ? "0.3s" : "0.2s"}>
              <FormLabel htmlFor="password">
                SECURITY CODE
              </FormLabel>
              <FormInput
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Enter Security Code"
                required
              />
            </FormGroup>

            <LoginButton
              type="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  <span>🔐</span>
                  SECURE LOGIN
                </>
              )}
            </LoginButton>
          </LoginForm>

          <LoginFooter>
            <SecurityNotice>
              <SecurityIcon>🛡️</SecurityIcon>
              <span>CLASSIFIED SYSTEM - AUTHORIZED PERSONNEL ONLY</span>
            </SecurityNotice>
            <HelpLinks>
              <HelpLink href="#forgot">Forgot Credentials?</HelpLink>
              <Separator>|</Separator>
              <HelpLink href="#support">Technical Support</HelpLink>
            </HelpLinks>
          </LoginFooter>
        </LoginCard>
      </Container>
    </>
  );
};

export default LoginPage;