import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {SERVICE_STATUSES} from "../consts";
import React from "react";

export function SelectServiceStatus({state, setState, isReadonly = false}) {
    return <FormControl required>
        <InputLabel>Service Status</InputLabel>
        <Select  value={state?.serviceStatus} defaultValue={state.serviceStatus}
                 onChange={e => setState((prev) => ({...prev, serviceStatus: e.target.value}))}
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