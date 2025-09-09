import React, {useState} from 'react';
import styled from 'styled-components';
import {
    Actions, Button, Card, Emblem, Field, Form, Header,
    Icon, Input, InputWrap, Label, DialogWrapper, Subtitle, Title, TitleWrap, Link, LinkWrap, BeforeLinkText
} from "../CommonStyles";


export function LoginPage() {
    const [form, setForm] = useState({
        personalNumber: '',
        password: ''
    });

    const onChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm((f) => ({...f, [name]: type === 'checkbox' ? checked : value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // Placeholder submit handler
        const payload = {
            personalNumber: form.personalNumber.trim(),
            password: form.password,
            remember: form.remember,
        };
        // Replace with actual auth flow
        // eslint-disable-next-line no-alert
        alert(`Attempting login:\n${JSON.stringify(payload, null, 2)}`);
    };

    return (
        <DialogWrapper>
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
                                value={form.personalNumber}
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
                        <Button type="submit">Enter</Button>
                    </Actions>
                </Form>
                <LinkWrap>
                    <BeforeLinkText>
                        Don't have an account?
                        <Link href="/signup">Create one here</Link>
                    </BeforeLinkText>
                </LinkWrap>
            </Card>
        </DialogWrapper>
    );
}

