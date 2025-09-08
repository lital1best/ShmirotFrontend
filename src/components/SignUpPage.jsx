import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
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
    Screen,
    Subtitle,
    Title,
    TitleWrap
} from "./CommonStyles";
import useSWR from "swr";
import {jobMastersBaseUrl} from "../api/JobMasterApi";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const options = {revalidateOnFocus: false, revalidateOnReconnect: false};

export function SignUpPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        personalNumber: '',
        firstName: '',
        lastName: '',
        rank: '',
        unit: '',
        role: 'jobMaster', // add back account type: 'jobMaster' | 'soldier'
        jobMasterPersonalNumber: '',
    });

    const {data: jobMasters} = useSWR(jobMastersBaseUrl, fetcher, options);


    const onChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm((f) => ({...f, [name]: type === 'checkbox' ? checked : value}));
    };

    // Helper for custom dropdown selection
    const onSelectJobMaster = (personalNumber) => {
        const jobMaster = jobMasters.find(jm => jm.personalNumber == personalNumber)
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

        const account = {
            personalNumber: String(form.personalNumber || '').trim(),
            firstName: String(form.firstName || '').trim(),
            lastName: String(form.lastName || '').trim(),
            rank: String(form.rank || '').trim(),
            unit: String(form.unit || '').trim(),
            role: form.role,
            jobMasterPersonalNumber: form.role === 'soldier'
                ? String(form.jobMasterPersonalNumber || '').trim()
                : undefined,
        };

        navigate('/signup/password', {state: {account}});
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
                        <Label htmlFor="personalNumber">Personal Number</Label>
                        <InputWrap>
                            <Icon>🆔</Icon>
                            <Input
                                id="personalNumber"
                                name="personalNumber"
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
                        <Label htmlFor="lastName">Last Name</Label>
                        <InputWrap>
                            <Icon>🧾</Icon>
                            <Input
                                id="lastName"
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
                                id="rank"
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
                                id="unit"
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
                        <Field>
                            <Label htmlFor="jobMasterPersonalNumber">Choose Job Master</Label>
                            <InputWrap>
                                <Icon>👤</Icon>
                                <JobMasterSelect
                                    id="jobMasterPersonalNumber"
                                    value={form.jobMasterPersonalNumber}
                                    options={!!form.unit? jobMasters.filter((jb) => jb.unit === form.unit): jobMasters}
                                    onChange={onSelectJobMaster}
                                    placeholder="Select a Job Master..."
                                    unit={form.unit}
                                />
                            </InputWrap>
                        </Field>
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
        </Screen>
    );
}

// Custom dropdown for Job Masters
function JobMasterSelect({id, value, options, onChange, placeholder}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const selected = options.find(o => String(o.personalNumber) === String(value));


    const handleSelect = (pn) => {
        onChange(pn);
        setOpen(false);
    };

    return (
        <Dropdown>
            <DropdownButton
                id={id}
                ref={ref}
                aria-haspopup="listbox"
                aria-expanded={open}
                type="button"
                onClick={() => setOpen(o => !o)}
            >
                {selected ? (
                    <div>
                        <ItemName>{selected.firstName} {selected.lastName}</ItemName>
                        <ItemMeta>{selected.unit} • {selected.personalNumber}</ItemMeta>
                    </div>
                ) : (
                    <Placeholder>{placeholder}</Placeholder>
                )}
                <Caret>▾</Caret>
            </DropdownButton>

            {open && (
                <DropdownMenu role="listbox" tabIndex={-1}>
                    {options.length === 0 && (
                        <EmptyItem>No job masters available</EmptyItem>
                    )}
                    {options.map(opt => (
                        <DropdownItem
                            key={opt.personalNumber}
                            role="option"
                            aria-selected={String(opt.personalNumber) === String(value)}
                            onClick={() => handleSelect(opt.personalNumber)}
                        >
                            <ItemName>{opt.firstName} {opt.lastName}</ItemName>
                            <ItemMeta>{opt.unit} • {opt.personalNumber}</ItemMeta>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            )}
        </Dropdown>
    );
}

// STYLED COMPONENTS

const Dropdown = styled.div`
    position: relative;
    width: 100%;
`;

const DropdownButton = styled.button`
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 12px 38px 12px 44px; /* left padding clears the icon in InputWrap */
    height: 44px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #fff;
    outline: none;
    cursor: pointer;

    &:focus {
        box-shadow: 0 0 0 2px rgba(195, 213, 75, 0.5);
    }
`;

const Placeholder = styled.span`
    color: rgba(255, 255, 255, 0.6);
`;

const Caret = styled.span`
    margin-left: 8px;
    opacity: 0.8;
`;

const DropdownMenu = styled.div`
    position: absolute;
    left: 0;
    right: 0;

    top: ${({$openUp}) => ($openUp ? 'auto' : 'calc(80% + 6px)')};
    bottom: ${({$openUp}) => ($openUp ? 'calc(80% + 6px)' : 'auto')};
    max-height: 120px;
    overflow: auto;
    padding: 6px;
    border-radius: 12px;
    background: rgba(20, 25, 20, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
`;

const DropdownItem = styled.div`
    padding: 10px 12px;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
    }
`;

const EmptyItem = styled.div`
    padding: 12px;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
`;

const ItemName = styled.div`
    font-weight: 600;
    line-height: 1.1;
`;

const ItemMeta = styled.div`
    font-size: 12px;
    opacity: 0.85;
    margin-top: 2px;
    line-height: 1.1;
`;

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
