import React, {useState} from 'react';
import styled from 'styled-components';
import {
    Actions,
    Button,
    Card,
    Emblem,
    Field,
    Form,
    Header,
    Icon,
    Input,
    InputWrap,
    Label, Link, LinkWrap, BeforeLinkText,
    Screen,
    Subtitle,
    Title,
    TitleWrap, Login
} from "./CommonStyles";

export function SignUpPage() {
    const [form, setForm] = useState({
        personalNumber: '',
        unit: '',
        password: '',
        confirmPassword: '',
    });

    const onChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm((f) => ({...f, [name]: type === 'checkbox' ? checked : value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const errors = [];
        if (form.password.length < 6) {
            errors.push('Password must be at least 6 characters.');
        }
        if (form.password !== form.confirmPassword) {
            errors.push('Passwords do not match.');
        }
        if (!form.acceptTerms) {
            errors.push('You must accept the terms.');
        }

        if (errors.length) {
            // eslint-disable-next-line no-alert
            alert(errors.join('\n'));
            return;
        }

        const payload = {
            personalNumber: form.personalNumber.trim(),
            unitCode: form.unitCode.trim(),
            password: form.password,
        };

        // Replace with actual sign-up flow
        // eslint-disable-next-line no-alert
        alert(`Attempting sign up:\n${JSON.stringify(payload, null, 2)}`);
    };

    return (
        <Screen>
            <Card>
                <Header>
                    <Emblem/>
                    <TitleWrap>
                        <Title>Create Shmirot Account</Title>
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
                                placeholder="Enter Personal Number"
                                value={form.personalNumber}
                                onChange={onChange}
                                autoComplete="username"
                                required
                            />
                        </InputWrap>
                    </Field>

                    <Field>
                        <Label htmlFor="unitCode">Unit</Label>
                        <InputWrap>
                            <Icon>🏷️</Icon>
                            <Input
                                id="unit"
                                name="unit"
                                type="text"
                                placeholder="Enter your unit name"
                                value={form.unitCode}
                                onChange={onChange}
                                autoComplete="organization"
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
                                placeholder="Create Password"
                                value={form.password}
                                onChange={onChange}
                                autoComplete="new-password"
                                required
                            />
                        </InputWrap>
                    </Field>

                    <Field>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <InputWrap>
                            <Icon>✅</Icon>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                value={form.confirmPassword}
                                onChange={onChange}
                                autoComplete="new-password"
                                required
                            />
                        </InputWrap>
                    </Field>
                    <Actions>
                        <Button type="submit">Enter</Button>
                    </Actions>
                </Form>
            <LinkWrap>
                <BeforeLinkText>
                    Already have an account?
                    <Link href="/login">Login here</Link>
                </BeforeLinkText>
            </LinkWrap>
            </Card>
        </Screen>
    );
}


const TermsWrap = styled.label`
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
