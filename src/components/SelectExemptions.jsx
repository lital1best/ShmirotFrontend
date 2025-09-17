import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select} from "@mui/material";
import {EXEMPTIONS_OPTIONS} from "../consts";
import React from "react";

export function SelectExemptions({setState, state, isReadonly = false}) {
    return state && <FormControl>
        <InputLabel>Exemptions</InputLabel>
        <Select
            multiple
            value={state?.exemptions}
            onChange={(event) => setState((prev) => ({...prev, exemptions: event.target.value}))}
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