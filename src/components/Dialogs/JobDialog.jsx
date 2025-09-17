import {Actions, Button, Card, Field, Form, Input, ItemMeta, ItemName, Label} from "../CommonStyles";
import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Modal from '@mui/material/Modal';
import {createJob, deleteJob, editJob} from "../../api/JobsApi";
import {SERVICE_STATUSES} from "../../consts";
import {UserContext, useUser} from "../../userContext";
import useSWR from "swr";
import {GET_SOLDIERS_ORDERED_BY_SCORE_URL} from "../../api/JobMasterApi";
import {CreateSoldierConstrain, DeleteSoldierConstrain, EditSoldierConstrain} from "../../api/SoldiersConstrainsApi";
import {SelectExemptions} from "../SelectExemptions";
import {SelectServiceStatus} from "../SelectServiceStatus";


export function JobDialog({isOpen, onClose, selectedDate, selectedJob, isJobMaster, constrains}) {
    const [jobForm, setJobForm] = useState({
        description: '',
        location: '',
        serviceStatus: 0,
        exemptions: [],
        score: 1,
        soldier: null,
    });
    const [soldierConstrain ,setSoldierConstrain] = useState({})


    useEffect(() => {
        if (!!selectedJob)
            setJobForm(selectedJob)
    }, [!!selectedJob])

    useEffect(() => {
        if (constrains?.length && !isJobMaster)
            setSoldierConstrain(constrains[0])
    }, [constrains])

    const {user} = useUser(UserContext);

    const {data: soldiersSuggestions, mutate} = useSWR(GET_SOLDIERS_ORDERED_BY_SCORE_URL(user?.personalNumber))

    const elligableSoldiers = soldiersSuggestions?.filter(s => canSoldierDoJob(s, jobForm))

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

        setSoldierConstrain(null)
    };

    const handleSubmitJob = (e) => {
        e.preventDefault();

        if (isJobMaster) {
            if (!!selectedJob) {
                editJob({
                    ...jobForm, personalNumber: jobForm?.soldier?.personalNumber,
                }, selectedJob.id).then(handleCloseDialog).catch()
            } else {
                createJob({
                    ...jobForm, personalNumber: jobForm?.soldier?.personalNumber,
                    date: selectedDate,
                    jobMasterPersonalNumber: user?.personalNumber,
                }).then(handleCloseDialog).catch()
            }
        }

        else{
            if (constrains?.length){
                EditSoldierConstrain(soldierConstrain?.reason, soldierConstrain?.id).then(handleCloseDialog).catch()
            }
            else {
                CreateSoldierConstrain({
                    soldierPersonalNumber: user.personalNumber,
                    jobId: selectedJob?.id,
                    reason: soldierConstrain.reason
                }).then(handleCloseDialog).catch()
            }
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
                        readOnly={!isJobMaster}
                        required
                    />
                </Field>
                <Field>
                    <Label>Location</Label>
                    <Input
                        value={jobForm.location}
                        onChange={e => setJobForm({...jobForm, location: e.target.value})}
                        placeholder="Location"
                        readOnly={!isJobMaster}
                        required
                    />
                </Field>
                <Field>
                    <Label>Score</Label>
                    <Input
                        type="number"
                        value={jobForm.score}
                        required
                        readOnly={!isJobMaster}
                        onChange={e => setJobForm({...jobForm, score: parseInt(e.target.value)})}
                    />
                </Field>
                <SelectServiceStatus setState={setJobForm} state={jobForm} isReadonly={!isJobMaster}/>
                <SelectExemptions setState={setJobForm} state={jobForm} isReadonly={!isJobMaster}/>

                {
                    isJobMaster ?  <FormControl fullWidth>
                            <InputLabel>Assign a soldier</InputLabel>
                            <div style={{display: 'flex', gap: '8px'}}>
                                <Select
                                    fullWidth
                                    renderValue={selected => <SoldierRow soldier={selected}/>}
                                    value={jobForm?.soldier}
                                    onChange={(e) => setJobForm({
                                        ...jobForm,
                                        soldier: e.target.value,
                                        personalNumber: e.target.value.personalNumber
                                    })}>
                                    {
                                        elligableSoldiers?.map((soldier) => (
                                            <MenuItem value={soldier} key={soldier.personalNumber}>
                                                <SoldierRow soldier={soldier}/>
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                {jobForm.soldier &&
                                    <Button
                                        type="button"
                                        onClick={() => setJobForm({...jobForm, soldier: null, personalNumber: null})}
                                    >
                                        X
                                    </Button>
                                }
                            </div>
                        </FormControl>
                    : <FormControl fullWidth>
                            <Label>Constrain reason</Label>
                            <Input
                                value={soldierConstrain?.reason}
                                onChange={e => setSoldierConstrain(prev=> ({...prev, reason: e.target.value}))}
                                required
                            />
                        </FormControl>
                }
                <Actions>
                    <Button type="button" onClick={handleCloseDialog}>Cancel</Button>
                    {
                        !!selectedJob && isJobMaster &&
                        <Button type="button" onClick={() => deleteJob(selectedJob.id).then(handleCloseDialog)}>Delete
                            job</Button>
                    }
                    {
                        !!selectedJob && !isJobMaster && soldierConstrain && soldierConstrain?.id &&
                        <Button type="button" onClick={() => DeleteSoldierConstrain(soldierConstrain.id).then(handleCloseDialog)}>Delete
                            constrain</Button>
                    }
                    { isJobMaster && <Button type="submit" $active>{!!selectedJob ? "Edit job" : "Add a new job"}</Button>}
                    { !isJobMaster && <Button type="submit" $active> {constrains?.length? "Edit constrain": "Submit a constrain"} </Button>}
                </Actions>
            </Form>
        </Card>
    </Modal>
}

export const canSoldierDoJob = (soldier, job) => soldier.serviceStatus === job.serviceStatus && (!job.exemptions.length || !job.exemptions.some(e => soldier.exemptions.includes(e)))

const SoldierRow = ({soldier}) => <div>
    <ItemName>{soldier.firstName} {soldier.lastName}</ItemName>
    <ItemMeta>Score: {soldier.score} • Rank: {soldier.rank}</ItemMeta>
</div>

