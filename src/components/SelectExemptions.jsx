import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select} from "@mui/material";
import {EXEMPTIONS_OPTIONS} from "../consts";
import React from "react";

export function SelectExemptions({setState, state, isReadonly = false}) {
    const onChange = (e) => {
        setState((prev) => {
            const newState = {...prev, exemptions: e.target.value}

            // if we change the exemptions and the assigned soldier can't do the job, we need to clear the soldier
            if (prev?.soldier?.exemptions?.some(e => newState?.exemptions?.includes(e))) {
                newState.soldier = null;
            }

            return newState;
        })

    }


    return state && <FormControl>
        <InputLabel>Exemptions</InputLabel>
        <Select
            multiple
            value={state?.exemptions}
            onChange={onChange}
            renderValue={(selected) => selected.map(value => EXEMPTIONS_OPTIONS[value]).join(", ")}
            inputProps={{readOnly: isReadonly}}
        >
            {
                EXEMPTIONS_OPTIONS.map((option, index) => (
                    <MenuItem key={option} value={index}>
                        <Checkbox checked={state?.exemptions?.indexOf(index) > -1}/>
                        <ListItemText primary={option}/>
                    </MenuItem>
                ))
            }
        </Select>
    </FormControl>
}