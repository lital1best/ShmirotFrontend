import {Actions, Button, Card, Field, Form, Input, ItemMeta, ItemName, Label} from "../CommonStyles";
import React, {useEffect, useState} from "react";
import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select} from "@mui/material";
import Modal from '@mui/material/Modal';
import {createJob, deleteJob, editJob} from "../../api/JobsApi";
import {ExemptionsOptions, ServiceStatus} from "../../consts";
import {UserContext, useUser} from "../../userContext";
import useSWR from "swr";
import {getSoldiersOrderedByScoreUrl} from "../../api/JobMasterApi";


export function JobDialog({isOpen, onClose, selectedDate, selectedJob}) {
    const [jobForm, setJobForm] = useState( {
        description: '',
        location: '',
        serviceStatus: 0,
        exemptions: [],
        score: 1,
        soldier: null,
    });


    useEffect(() => {
        if (!!selectedJob)
            setJobForm(selectedJob)
    }, [!!selectedJob])

    const {user} = useUser(UserContext);

    const {data: soldiersSuggestions, mutate} = useSWR(getSoldiersOrderedByScoreUrl(user.personalNumber))

    const elligableSoldiers = soldiersSuggestions?.filter(s =>  (s.exemptions.length === 0|| !s.exemptions.some(e => jobForm?.exemptions.includes(e))) && s.serviceStatus === jobForm.serviceStatus)

    const handleCloseDialog = () => {
        onClose();
        setJobForm({
            description: '',
            location: '',
            serviceStatus: 0,
            exemptions: [],
            score: 1,
            soldier: null,
            jobMasterPersonalNumber: 0
        });
    };

    const handleSubmitJob = (e) => {
        e.preventDefault();

        if (!!selectedJob){
            editJob({
                ...jobForm, personalNumber: jobForm.soldier.personalNumber,
            }, selectedJob.id).then(handleCloseDialog)
        }
        else{
            createJob({
                ...jobForm, personalNumber: jobForm.soldier.personalNumber,
                date: selectedDate,
                jobMasterPersonalNumber: user.personalNumber,
            }).then(handleCloseDialog)
        }
    };

    return <Modal
        open={isOpen}
        onClose={handleCloseDialog}
        disableEscapeKeyDown
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        <Card>
            <Form onSubmit={handleSubmitJob}>
                <Field>
                    <Label>Description</Label>
                    <Input
                        value={jobForm?.description}
                        onChange={e => setJobForm({...jobForm, description: e.target.value})}
                        placeholder="Job description"
                        required
                    />
                </Field>
                <Field>
                    <Label>Location</Label>
                    <Input
                        value={jobForm.location}
                        onChange={e => setJobForm({...jobForm, location: e.target.value})}
                        placeholder="Location"
                        required
                    />
                </Field>
                <Field>
                    <Label>Score</Label>
                    <Input
                        type="number"
                        value={jobForm.score}
                        required
                        onChange={e => setJobForm({...jobForm, score: parseInt(e.target.value)})}
                    />
                </Field>
                <Field>
                    <FormControl fullWidth size="small" required>
                        <InputLabel>Service Status</InputLabel>
                        <Select value={jobForm.serviceStatus} defaultValue={jobForm.serviceStatus}
                                onChange={e => setJobForm({...jobForm, serviceStatus: e.target.value})}
                        >
                            {
                                ServiceStatus.map((value, index) => (
                                    <MenuItem key={index} value={index}>
                                        {value}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Field>
                <FormControl fullWidth>
                    <InputLabel>Exemptions</InputLabel>
                    <Select
                        multiple
                        value={jobForm.exemptions}
                        onChange={(event) => setJobForm({...jobForm, exemptions: event.target.value})}
                        renderValue={(selected) => selected.map(value => ExemptionsOptions[value]).join(", ")}
                    >
                        {
                            ExemptionsOptions.map((option, index) => (
                                <MenuItem key={option} value={index}>
                                    <Checkbox checked={jobForm.exemptions.indexOf(index) > -1}/>
                                    <ListItemText primary={option}/>
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Assign a soldier</InputLabel>
                    <Select renderValue={selected => <SoldierRow soldier={selected}/>} value={jobForm?.soldier} onChange={(e) => setJobForm({...jobForm, soldier: e.target.value, personalNumber: e.target.value.personalNumber})}>
                        {
                            elligableSoldiers?.map((soldier) => (
                                <MenuItem value={soldier} key={soldier.personalNumber}>
                                    <SoldierRow soldier={soldier}/>
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Actions>
                    <Button type="button" onClick={handleCloseDialog}>Cancel</Button>
                    {
                        !!selectedJob &&
                            <Button type="button" onClick={() => deleteJob(selectedJob.id).then(handleCloseDialog)}>Delete job</Button>
                    }
                    <Button type="submit" $active>{!!selectedJob? "Edit job": "Add a new job"}</Button>
                </Actions>
            </Form>
        </Card>
    </Modal>
}

const SoldierRow = ({soldier}) => <div>
            <ItemName>{soldier.firstName} {soldier.lastName}</ItemName>
            <ItemMeta>Score: {soldier.score} • Rank: {soldier.rank}</ItemMeta>
        </div>