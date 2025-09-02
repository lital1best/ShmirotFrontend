import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --army-green: #3b5d3a;
    --army-green-dark: #2f4a2e;
    --olive: #6b8f5b;
    --khaki: #a89f7b;
    --sand: #d2c29d;
    --black-80: rgba(0,0,0,0.8);
    --black-60: rgba(0,0,0,0.6);
    --accent: #c7d36f;
    --accent-2: #e8f2a9;
    --danger: #ff6b6b;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif;
    color: #f2f4ef;
    /* Camouflage-style layered gradients */
    background:
      radial-gradient(1200px 600px at 10% 10%, rgba(0,0,0,0.25), transparent 40%),
      radial-gradient(700px 400px at 85% 20%, rgba(0,0,0,0.25), transparent 45%),
      radial-gradient(1000px 500px at 30% 80%, rgba(0,0,0,0.25), transparent 40%),
      repeating-linear-gradient(
        35deg,
        #2a3a28 0px,
        #2a3a28 8px,
        #334c32 8px,
        #334c32 16px,
        #3e5f3b 16px,
        #3e5f3b 28px,
        #566c47 28px,
        #566c47 38px
      ),
      linear-gradient(0deg, #202a20, #1b241b);
    background-attachment: fixed;
  }
`;

const Screen = styled.div`
  min-height: 100%;
  display: grid;
  place-items: center;
  padding: 32px 16px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 440px;
  background: linear-gradient(180deg, rgba(17, 24, 17, 0.9), rgba(17, 24, 17, 0.85));
  border: 1px solid rgba(199, 211, 111, 0.25);
  border-radius: 14px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.5),
    inset 0 0 0 1px rgba(255,255,255,0.04);
  overflow: hidden;
  backdrop-filter: blur(6px);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 20px 10px 20px;
  border-bottom: 1px solid rgba(199, 211, 111, 0.18);
  background: linear-gradient(180deg, rgba(199, 211, 111, 0.08), rgba(199, 211, 111, 0.02));
`;

const Emblem = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background:
    conic-gradient(from 45deg, #c7d36f, #a3bb3f, #c7d36f) border-box;
  -webkit-mask:
    linear-gradient(#000 0 0) padding-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  border: 2px solid transparent;
  display: grid;
  place-items: center;
  position: relative;

  &::before {
    content: "";
    width: 18px;
    height: 18px;
    background:
      linear-gradient(135deg, #1b241b, #2f4a2e);
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    box-shadow: 0 0 0 1px rgba(199, 211, 111, 0.35), 0 2px 6px rgba(0,0,0,0.5);
  }
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #e9f0d8;
`;

const Subtitle = styled.div`
  font-size: 12px;
  color: #b7c28c;
  opacity: 0.9;
`;

const RoleTabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 12px;
  gap: 12px;
  background: linear-gradient(180deg, rgba(199,211,111,0.07), rgba(199,211,111,0.0));
  border-bottom: 1px dashed rgba(199, 211, 111, 0.25);
`;

const RoleTab = styled.button`
  cursor: pointer;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid ${({ active }) => (active ? 'rgba(199, 211, 111, 0.8)' : 'rgba(199, 211, 111, 0.25)')};
  background: ${({ active }) =>
    active
      ? 'linear-gradient(180deg, rgba(199,211,111,0.15), rgba(199,211,111,0.05))'
      : 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))'};
  color: ${({ active }) => (active ? '#e8f2a9' : '#dfe8c4')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: all 160ms ease;

  &:hover {
    border-color: rgba(199, 211, 111, 0.6);
    transform: translateY(-1px);
  }
`;

const Form = styled.form`
  padding: 18px 20px 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #c9d59b;
`;

const InputWrap = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 12px 12px 42px;
  border-radius: 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(199, 211, 111, 0.25);
  color: #f2f4ef;
  outline: none;
  transition: 140ms ease;
  font-size: 14px;

  &:focus {
    border-color: rgba(199, 211, 111, 0.8);
    box-shadow: 0 0 0 3px rgba(199, 211, 111, 0.14);
    background: rgba(255,255,255,0.06);
  }

  &::placeholder {
    color: rgba(240, 246, 220, 0.5);
  }
`;

const Icon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #b7c28c;
  opacity: 0.9;
  font-size: 16px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 6px;
`;

const RememberWrap = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #dfe8c4;
  cursor: pointer;

  input {
    accent-color: #a3bb3f;
  }
`;

const Button = styled.button`
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(199, 211, 111, 0.35);
  background: linear-gradient(180deg, #3b5d3a, #2f4a2e);
  color: #f2f4ef;
  font-weight: 700;
  letter-spacing: 0.4px;
  min-width: 120px;
  transition: transform 120ms ease, box-shadow 120ms ease, filter 120ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Footer = styled.div`
  padding: 14px 18px 18px;
  font-size: 12px;
  color: #b7c28c;
  border-top: 1px dashed rgba(199, 211, 111, 0.25);
  background: linear-gradient(0deg, rgba(199,211,111,0.05), rgba(199,211,111,0.02));
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LinkText = styled.button`
  background: transparent;
  border: none;
  color: #e8f2a9;
  cursor: pointer;
  padding: 0;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

function LoginPage() {
  const [role, setRole] = useState('soldier'); // 'soldier' | 'jobMaster'
  const [form, setForm] = useState({
    id: '',
    password: '',
    unitCode: '',
    remember: true,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Placeholder submit handler
    const payload = {
      role,
      id: form.id.trim(),
      password: form.password,
      ...(role === 'jobMaster' ? { unitCode: form.unitCode.trim() } : {}),
      remember: form.remember,
    };
    // Replace with actual auth flow
    // eslint-disable-next-line no-alert
    alert(`Attempting login:\n${JSON.stringify(payload, null, 2)}`);
  };

  const roleLabel = role === 'soldier' ? 'Regular Soldier' : 'Job Master Soldier';
  const idPlaceholder = role === 'soldier' ? 'Military ID' : 'Job Master ID';

  return (
    <>
      <GlobalStyle />
      <Screen>
        <Card>
          <Header>
            <Emblem />
            <TitleWrap>
              <Title>Secure Access Portal</Title>
              <Subtitle>Restricted — Authorized Personnel Only</Subtitle>
            </TitleWrap>
          </Header>

          <RoleTabs>
            <RoleTab
              type="button"
              active={role === 'soldier'}
              aria-pressed={role === 'soldier'}
              onClick={() => setRole('soldier')}
              title="Login as Regular Soldier"
            >
              🪖 Soldier
            </RoleTab>
            <RoleTab
              type="button"
              active={role === 'jobMaster'}
              aria-pressed={role === 'jobMaster'}
              onClick={() => setRole('jobMaster')}
              title="Login as Job Master Soldier"
            >
              🎖️ Job Master
            </RoleTab>
          </RoleTabs>

          <Form onSubmit={onSubmit} aria-label={`${roleLabel} Login Form`}>
            <Field>
              <Label htmlFor="id">{idPlaceholder}</Label>
              <InputWrap>
                <Icon>🆔</Icon>
                <Input
                  id="id"
                  name="id"
                  type="text"
                  placeholder={`Enter ${idPlaceholder}`}
                  value={form.id}
                  onChange={onChange}
                  autoComplete="username"
                  required
                />
              </InputWrap>
            </Field>

            {role === 'jobMaster' && (
              <Field>
                <Label htmlFor="unitCode">Unit Code</Label>
                <InputWrap>
                  <Icon>🏷️</Icon>
                  <Input
                    id="unitCode"
                    name="unitCode"
                    type="text"
                    placeholder="Enter Unit Code"
                    value={form.unitCode}
                    onChange={onChange}
                    autoComplete="organization"
                    required
                  />
                </InputWrap>
              </Field>
            )}

            <Field>
              <Label htmlFor="password">Password</Label>
              <InputWrap>
                <Icon>🔒</Icon>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={onChange}
                  autoComplete="current-password"
                  required
                />
              </InputWrap>
            </Field>

            <Actions>
              <RememberWrap>
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={onChange}
                />
                Remember me
              </RememberWrap>
              <Button type="submit">Enter</Button>
            </Actions>
          </Form>

          <Footer>
            <span>Report suspicious activity to your CO.</span>
            <LinkText type="button" onClick={() => alert('Password reset flow')}>
              Forgot password?
            </LinkText>
          </Footer>
        </Card>
      </Screen>
    </>
  );
}

export default LoginPage;