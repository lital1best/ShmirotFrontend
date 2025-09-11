import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
    Actions,
    BeforeLinkText,
    Button,
    Card,
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
    DialogWrapper,
    Subtitle,
    Title,
    TitleWrap
} from "../CommonStyles";
import {CreateJobMasterApi} from "../../api/JobMasterApi";
import {options} from "axios";
import {CreateSoldierApi} from "../../api/SoldiersApi";
import {JobMasterContract} from "../../entities/contracts/JobMasterContract";
import {SoldierContract} from "../../entities/contracts/SoldierContract";

export function PasswordSetupPage({login}) {
    const navigate = useNavigate();
    const {state} = useLocation();
    const account = state?.account;


    useEffect(() => {
        if (!account) {
            navigate('/signup', {replace: true});
        }
    }, [account, navigate]);

    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
    });

    const onChange = (e) => {
        const {name, value} = e.target;
        setForm((f) => ({...f, [name]: value}));
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

        if (errors.length) {
            // eslint-disable-next-line no-alert
            alert(errors.join('\n'));
            return;
        }

        if (account.role === 'jobMaster') {
            const jobMaster = new JobMasterContract(account.personalNumber, account.firstName, account.lastName, account.unit, account.rank)
            CreateJobMasterApi(jobMaster).catch(err => console.log(err)).then(data => login(data.data))
        } else {
            const soldier = new SoldierContract(account.personalNumber, account.firstName, account.lastName, account.unit, account.rank, account.jobMasterPersonalNumber)
            CreateSoldierApi(soldier).catch(err => console.log(err)).then(data => login(data.data))
        }
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
