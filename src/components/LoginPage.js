import React, {useState} from 'react';
import styled, {createGlobalStyle} from 'styled-components';


export default function LoginPage() {
    const [form, setForm] = useState({
        id: '',
        password: '',
        unitCode: '',
        remember: true,
    });

    const onChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm((f) => ({...f, [name]: type === 'checkbox' ? checked : value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // Placeholder submit handler
        const payload = {
            id: form.id.trim(),
            password: form.password,
            remember: form.remember,
        };
        // Replace with actual auth flow
        // eslint-disable-next-line no-alert
        alert(`Attempting login:\n${JSON.stringify(payload, null, 2)}`);
    };

    return (
        <Screen>
            <Card>
                <Header>
                    <Emblem/>
                    <TitleWrap>
                        <Title>Login into Shmirot Portal</Title>
                        <Subtitle>Restricted — Authorized Personnel Only</Subtitle>
                    </TitleWrap>
                </Header>
                <Form onSubmit={onSubmit}>
                    <Field>
                        <Label htmlFor="id">Personal Number</Label>
                        <InputWrap>
                            <Icon>🆔</Icon>
                            <Input
                                id="id"
                                name="id"
                                type="text"
                                placeholder={`Enter Personal Number`}
                                value={form.id}
                                onChange={onChange}
                                autoComplete="username"
                                required
                            />
                        </InputWrap>
                    </Field>
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
            </Card>
        </Screen>
    );
}


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
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
    inset 0 0 0 1px rgba(255, 255, 255, 0.04);
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

const Emblem = styled.img.attrs({
    src: '/army_logo.jpg',
    alt: 'Army Logo'
})`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
    border: 2px solid rgba(199, 211, 111, 0.25);
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
    width: 86%;
    padding: 12px 12px 12px 42px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(199, 211, 111, 0.25);
    color: #f2f4ef;
    outline: none;
    transition: 140ms ease;
    font-size: 14px;

    &:focus {
        border-color: rgba(199, 211, 111, 0.8);
        box-shadow: 0 0 0 3px rgba(199, 211, 111, 0.14);
        background: rgba(255, 255, 255, 0.06);
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

