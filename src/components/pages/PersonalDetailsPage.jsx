import React, {useEffect, useState} from 'react';
import {useUser} from "../../userContext";
import {Button, TextField} from "@mui/material";
import styled from "styled-components";
import {SelectExemptions} from "../SelectExemptions";
import {SelectServiceStatus} from "../SelectServiceStatus";
import {EditJobMasterApi} from "../../api/JobMasterApi";
import {EditSoldierApi} from "../../api/SoldiersApi";

export function PersonalDetailsPage({currentTab}) {
    const {user, isJobMaster, login} = useUser()
    const [soldier, setSoldier] = useState(user);

    useEffect(() => {
        if (!!user) {
            setSoldier(user)
        }
    }, [user, currentTab]);


    const onSubmit = (e) => {
        e.preventDefault()

        if (isJobMaster) {
            EditJobMasterApi(soldier.personalNumber, soldier).then().catch()
        }
        else{
            EditSoldierApi(soldier?.personalNumber, soldier).then().catch()
        }

        login(soldier)
    }

    return (
        <Form onSubmit={onSubmit}>
            <FormRow>
                <TextField
                    label="First Name"
                    variant="outlined"
                    onChange={(e) => setSoldier({...soldier, firstName: e.target.value})}
                    fullWidth
                    required
                    value={soldier?.firstName}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={soldier?.lastName}
                    required
                    onChange={(e) => setSoldier({...soldier, lastName: e.target.value})}
                />
            </FormRow>
            <FormRow>
                <TextField
                    label="Rank"
                    variant="outlined"
                    onChange={(e) => setSoldier({...soldier, rank: e.target.value})}
                    fullWidth
                    value={soldier?.rank}
                    required
                />
                <TextField
                    label="Unit"
                    variant="outlined"
                    value={soldier?.unit}
                    onChange={(e) => setSoldier({...soldier, unit: e.target.value})}
                    fullWidth
                />
            </FormRow>
            <FormRow>
                {!!soldier?.exemptions && <SelectExemptions state={soldier} setState={setSoldier}/>}
                {soldier?.serviceStatus !== undefined && <SelectServiceStatus state={soldier} setState={setSoldier}/>}
            </FormRow>
            <Button type="submit">Save Changes</Button>
        </Form>
    );
};



const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const FormRow = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;

    & > * {
        flex: 1;
    }
`;
