import {Actions, Button, Card, Field, Form, Input, Label} from "../CommonStyles";
import React, {useState} from "react";
import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select} from "@mui/material";
import Modal from '@mui/material/Modal';
import {createJob} from "../../api/JobsApi";
import {ExemptionsOptions, ServiceStatus} from "../../consts";


export function AddJobDialog({isOpen, onClose, selectedDate}) {
    const [jobForm, setJobForm] = useState({
        description: '',
        location: '',
        serviceStatus: 0,
        exemptions: [],
        score: 0,
    });

    const handleCloseDialog = () => {
        onClose();
        setJobForm({
            description: '',
            location: '',
            serviceStatus: ServiceStatus[0],
            exemptions: [],
            score: 0,
            jobMasterPersonalNumber: 0
        });
    };

    const handleSubmitJob = (e) => {
        e.preventDefault();

        createJob({
            ...jobForm,
            date: selectedDate,
            jobMasterPersonalNumber: 1,
        }).then()
        handleCloseDialog();
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
                        value={jobForm.description}
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
                        <Select defaultValue={0}
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
                <Actions>
                    <Button type="button" onClick={handleCloseDialog}>Cancel</Button>
                    <Button type="submit" $active>Add Job</Button>
                </Actions>
            </Form>
        </Card>
    </Modal>
}
