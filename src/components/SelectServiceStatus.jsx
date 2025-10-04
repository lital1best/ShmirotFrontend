import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {SERVICE_STATUSES} from "../consts";
import React from "react";

export function SelectServiceStatus({state, setState, isReadonly = false}) {
    const onChange = (e) => {
        const value = e.target.value;
        setState((prev) => {
            const newState = {...prev, serviceStatus: value};
            if (prev?.serviceStatus !== value) { // if we change the service status, we need to clear the soldier
                newState.soldier = null;
            }

            return newState;

        })
    }
    return <FormControl required>
        <InputLabel>Service Status</InputLabel>
        <Select  value={state?.serviceStatus} defaultValue={state.serviceStatus}
                 onChange={onChange}
                 inputProps={{ readOnly: isReadonly }}
        >
            {
                SERVICE_STATUSES.map((value, index) => (
                    <MenuItem key={index} value={index}>
                        {value}
                    </MenuItem>
                ))
            }
        </Select>
        </FormControl>
}