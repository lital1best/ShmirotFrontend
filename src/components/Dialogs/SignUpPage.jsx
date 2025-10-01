import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
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
import useSWR from "swr";
import {JOB_MASTER_BASE_URL} from "../../api/JobMasterApi";
import {JobMasterSelect} from "./JobMasterSelect";
import {SelectServiceStatus} from "../SelectServiceStatus";

export function SignUpPage() {
    const navigate = useNavigate();
    const {state} = useLocation();

    const [form, setForm] = useState({
        personalNumber: '',
        firstName: '',
        lastName: '',
        rank: '',
        unit: '',
        role: 'jobMaster',
        jobMasterPersonalNumber: '',
    });

    const {data: jobMasters, mutate} = useSWR(JOB_MASTER_BASE_URL);

    useEffect(() => {
            if (!!state?.account) {
                setForm(state.account)
            }
        }, [state?.account, navigate]
    )

    const onChange = (e) => {
        const {name, value, type, checked} = e.target;

        if (name === 'unit') {
            mutate().then()
        }

        setForm((f) => ({...f, [name]: type === 'checkbox' ? checked : value}));
    };

    // Helper for custom dropdown selection
    const onSelectJobMaster = (personalNumber) => {
        const jobMaster = jobMasters.find(jm => jm.personalNumber === personalNumber)
        setForm((f) => ({...f, jobMasterPersonalNumber: personalNumber, unit: jobMaster.unit}));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const errors = [];
        if (form.role === 'soldier' && !String(form.jobMasterPersonalNumber || '').trim()) {
            errors.push('Please choose a Job Master.');
        }

        if (errors.length) {
            // eslint-disable-next-line no-alert
            alert(errors.join('\n'));
            return;
        }

        navigate('/signup/password', {state: {account: form}});
    };

    return (
        <DialogWrapper>
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
                        <Label htmlFor="personalNumber">Personal Number</Label>
                        <InputWrap>
                            <Icon>🆔</Icon>
                            <Input
                                id="personalNumber"
                                name="personalNumber"
                                type="number"
                                placeholder="Enter Personal Number"
                                value={form.personalNumber}
                                onChange={onChange}
                                autoComplete="username"
                                required
                            />
                        </InputWrap>
                    </Field>

                    <Field>
                        <Label htmlFor="firstName">First Name</Label>
                        <InputWrap>
                            <Icon>🧾</Icon>
                            <Input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="Enter First Name"
                                value={form.firstName}
                                onChange={onChange}
                                autoComplete="given-name"
                                required
                            />
                        </InputWrap>
                    </Field>

                    <Field>
                        <Label>Last Name</Label>
                        <InputWrap>
                            <Icon>🧾</Icon>
                            <Input
                                name="lastName"
                                type="text"
                                placeholder="Enter Last Name"
                                value={form.lastName}
                                onChange={onChange}
                                autoComplete="family-name"
                                required
                            />
                        </InputWrap>
                    </Field>

                    <Field>
                        <Label htmlFor="rank">Rank</Label>
                        <InputWrap>
                            <Icon>🎖️</Icon>
                            <Input
                                name="rank"
                                type="text"
                                placeholder="Enter Rank"
                                value={form.rank}
                                onChange={onChange}
                                autoComplete="off"
                            />
                        </InputWrap>
                    </Field>

                    <Field>
                        <Label htmlFor="unit">Unit</Label>
                        <InputWrap>
                            <Icon>🏷️</Icon>
                            <Input
                                name="unit"
                                type="text"
                                placeholder="Enter Unit"
                                value={form.unit}
                                onChange={onChange}
                                autoComplete="organization"
                            />
                        </InputWrap>
                    </Field>

                    {/* Re-added account type selection */}
                    <Field>
                        <Label>Account Type</Label>
                        <RoleWrap>
                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="jobMaster"
                                    checked={form.role === 'jobMaster'}
                                    onChange={onChange}
                                />
                                Job Master
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="soldier"
                                    checked={form.role === 'soldier'}
                                    onChange={onChange}
                                />
                                Regular Soldier
                            </label>
                        </RoleWrap>
                    </Field>

                    {form.role === 'soldier' && (
                        <>
                        <SelectServiceStatus setState={setForm} state={form}/>
                        <Field>
                            <Label>Choose Job Master</Label>
                            <InputWrap>
                                <Icon>👤</Icon>
                                <JobMasterSelect
                                    id="jobMasterPersonalNumber"
                                    value={form.jobMasterPersonalNumber}
                                    options={!!form.unit ? jobMasters?.filter((jb) => jb.unit === form.unit) : jobMasters}
                                    onChange={onSelectJobMaster}
                                    placeholder="Select a Job Master..."
                                    unit={form.unit}
                                />
                            </InputWrap>
                        </Field>
                        </>
                    )}

                    <Actions>
                        <Button type="submit">Continue</Button>
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


const RoleWrap = styled.div`
    display: flex;
    gap: 16px;

    label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
    }
`;
