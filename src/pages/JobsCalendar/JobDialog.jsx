import {Actions, Button, Card, Field, Form, Input, ItemMeta, ItemName, Label} from "../../theme/commonStyles";
import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import Modal from '@mui/material/Modal';
import WarningIcon from '@mui/icons-material/Warning';
import {createJob, deleteJob, editJob} from "../../api/jobsApi";
import useSWR from "swr";
import {
    createSoldierConstraint,
    deleteSoldierConstraint,
    editSoldierConstraint,
    GET_CONSTRAINTS_BY_JOB_ID_URL
} from "../../api/soldiersConstrainsApi";
import {SelectExemptions} from "../../components/SelectExemptions";
import {SelectServiceStatus} from "../../components/SelectServiceStatus";
import {useUser} from "../../providers/Auth/UserProvider";


export function JobDialog({isOpen, onClose, selectedDate, selectedJob, isJobMaster, soldiersByScore}) {
    const [jobForm, setJobForm] = useState({
        description: '',
        location: '',
        serviceStatus: 0,
        exemptions: [],
        score: 1,
        soldier: null,
    });
    const [constraintReason ,setConstraintReason] = useState('')

    const {user} = useUser();
    const eligibleSoldiers = soldiersByScore?.filter(s => canSoldierDoJob(s, jobForm))

    const {data: jobConstraints, mutate: mutateConstraints} = useSWR(!!selectedJob && GET_CONSTRAINTS_BY_JOB_ID_URL(selectedJob?.id))
    const userConstraint = jobConstraints?.find(c => c.soldierPersonalNumber === user?.personalNumber)

    useEffect(() => {
        if (!isJobMaster && !!selectedJob){
            setConstraintReason(userConstraint?.reason ?? '')
        }
    }, [jobConstraints])

    useEffect(() => !!selectedJob? setJobForm(selectedJob) : resetJobForm(), [selectedJob])

    const resetJobForm = () =>{
        setJobForm({
            description: '',
            location: '',
            serviceStatus: 0,
            exemptions: [],
            score: 1,
            soldier: null,
            jobMasterPersonalNumber: 0
        });
    }

    const handleCloseDialog = () => {
        onClose().then(() => {
            resetJobForm()
            mutateConstraints().then()
            setConstraintReason('')
        });
    };

    const handleSubmitJob = (e) => {
        e.preventDefault();

        if (isJobMaster) {
            if (!!selectedJob) {
                editJob({
                    ...jobForm, personalNumber: jobForm?.soldier?.personalNumber,
                }, selectedJob.id).then(handleCloseDialog)
            } else {
                createJob({
                    ...jobForm, personalNumber: jobForm?.soldier?.personalNumber,
                    date: selectedDate,
                    jobMasterPersonalNumber: user?.personalNumber,
                }).then(handleCloseDialog)
            }
        }

        else{
            if (!!userConstraint){
                editSoldierConstraint(constraintReason, userConstraint?.id).then(handleCloseDialog)
            }
            else {
                createSoldierConstraint({
                    soldierPersonalNumber: user.personalNumber,
                    jobId: selectedJob?.id,
                    reason: constraintReason
                }).then(handleCloseDialog)
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
                        value={jobForm?.location}
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
                        value={jobForm?.score}
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
                                    renderValue={selected => <SoldierRow soldier={selected} jobConstraints={jobConstraints}/>}
                                    value={jobForm?.soldier}
                                    onChange={(e) => setJobForm({
                                        ...jobForm,
                                        soldier: e.target.value,
                                        personalNumber: e.target.value.personalNumber
                                    })}>
                                    {
                                        eligibleSoldiers?.map((soldier) => (
                                            <MenuItem value={soldier} key={soldier.personalNumber}>
                                            <SoldierRow soldier={soldier} jobConstraints={jobConstraints}/>
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                {jobForm?.soldier &&
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
                            <Label>Constraint reason</Label>
                            <Input
                                value={constraintReason}
                                onChange={e => setConstraintReason(e.target.value)}
                                required
                            />
                        </FormControl>
                }
                <Actions>
                    <Button type="button" onClick={handleCloseDialog}>Cancel</Button>
                    {
                        !!selectedJob && isJobMaster &&
                        <Button type="button" onClick={() => deleteJob(selectedJob?.id).then(handleCloseDialog)}>Delete
                            job</Button>
                    }
                    {
                        !!selectedJob && !isJobMaster && userConstraint && userConstraint?.id &&
                        <Button type="button" onClick={() => deleteSoldierConstraint(userConstraint.id).then(handleCloseDialog)}>Delete
                            constrain</Button>
                    }
                    { isJobMaster && <Button type="submit" $active>{!!selectedJob ? "Edit job" : "Add a new job"}</Button>}
                    { !isJobMaster && <Button type="submit" $active> {!!userConstraint? "Edit constrain": "Submit a constrain"} </Button>}
                </Actions>
            </Form>
        </Card>
    </Modal>
}

export const canSoldierDoJob = (soldier, job) => soldier.serviceStatus === job.serviceStatus && (!job.exemptions.length || !job.exemptions.some(e => soldier.exemptions.includes(e)))

export const SoldierRow = ({soldier, jobConstraints}) => {
    const soldierConstraint = jobConstraints?.find(c => c.soldierPersonalNumber === soldier.personalNumber);

    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            {soldierConstraint && (
                <Tooltip title={`Constraint: ${soldierConstraint.reason}`} style={{marginLeft: 'auto'}}>
                    <WarningIcon color="error" fontSize="small"/>
                </Tooltip>
            )}

            <div style={{flexGrow: 1}}>
                <ItemName>{soldier.firstName} {soldier.lastName}</ItemName>
                <ItemMeta>Score: {soldier.score} • Rank: {soldier.rank}</ItemMeta>
            </div>
        </div>
    );
}

