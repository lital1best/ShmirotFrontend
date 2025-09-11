import React, {useEffect, useState} from 'react';
import {
    Actions,
    BeforeLinkText,
    Button,
    Card,
    DialogWrapper,
    Emblem,
    Field,
    Form,
    Header,
    Icon,
    Input,
    InputWrap,
    Label,
    Link,
    LinkWrap,
    Subtitle,
    Title,
    TitleWrap
} from "../CommonStyles";
import {GetJobMasterByPersonalNumber} from "../../api/JobMasterApi";
import {GetSoldierByPersonalNumber} from "../../api/SoldiersApi";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../userContext";


export function LoginPage() {
    const [form, setForm] = useState({
        personalNumber: '',
        password: ''
    });

    const navigate = useNavigate()
    const {user, login} = useUser();

    useEffect(() => {
        if (!!user) {
            navigate('/');
        }
    }, [!!user]);

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
        };

        GetJobMasterByPersonalNumber(form.personalNumber).then(submitUserAndNavigate)
            .catch(_ =>
                    GetSoldierByPersonalNumber(form.personalNumber).then(submitUserAndNavigate)
                        .catch(err => alert(`User not found: ${err.message}`))
            )
    };

    const submitUserAndNavigate = (data) => {
        login(data.data)
        navigate('/')
    }

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
                                name="personalNumber"
                                type="number"
                                placeholder={`Enter Personal Number`}
                                value={form.personalNumber}
                                onChange={onChange}
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

