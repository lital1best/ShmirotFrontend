import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
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
import {createJobMasterApi} from "../../api/JobMasterApi";
import {createSoldierApi} from "../../api/SoldiersApi";
import {auth} from "../../firebase";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useUser} from "../../providers/UserProvider";
import {useSnackbar} from "../../providers/SnackbarProvider";

export function PasswordSetupPage() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {login, setCreateUserFail} = useUser();
    const { showMessage } = useSnackbar();

    const account = state?.account;


    useEffect(() => {
        if (!account) {
            navigate('/signup', {replace: true});
        }
    }, [account, navigate]);

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const onChange = (e) => {
        const {name, value} = e.target;
        setForm((f) => ({...f, [name]: value}));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const errors = [];
        if (!form.email) {
            errors.push('Email is required.');
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.push('Please enter a valid email address.');
        }
        if (form.password.length < 6) {
            errors.push('Password must be at least 6 characters.');
        }
        if (form.password !== form.confirmPassword) {
            errors.push('Passwords do not match.');
        }

        if (errors.length) {
            // eslint-disable-next-line no-alert
            showMessage(errors.join('\n'));
            return;
        }

        setCreateUserFail(false);

        createUserWithEmailAndPassword(auth, form.email, form.password).then(() => {
            const apiCall =
                account.role === "jobMaster"
                    ? createJobMasterApi(account)
                    : createSoldierApi(account);
            return apiCall.then(() => {
                login(form.email, form.password)
            }).catch(() => {
                console.log("Create user fail")
                setCreateUserFail(true)
            })
        }).catch(showMessage);
    };

    return (
        <DialogWrapper>
            <Card>
                <Header>
                    <Emblem/>
                    <TitleWrap>
                        <Title>Set Your Password</Title>
                        <Subtitle>Final step to create your account</Subtitle>
                    </TitleWrap>
                </Header>

                <Form onSubmit={onSubmit}>
                    <Field>
                        <Label htmlFor="email">Email</Label>
                        <InputWrap>
                            <Icon>📧</Icon>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter Email"
                                value={form.email}
                                onChange={onChange}
                                autoComplete="email"
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
                        <Button type="button"
                                onClick={() => navigate('/signup', {state: {account: account}})}>Back</Button>
                        <Button type="submit">Create Account</Button>
                    </Actions>
                </Form>

                <LinkWrap>
                    <BeforeLinkText>
                        Already have an account?
                        <Link href="/login">Login here</Link>
                    </BeforeLinkText>
                </LinkWrap>
            </Card>
        </DialogWrapper>
    );
}
