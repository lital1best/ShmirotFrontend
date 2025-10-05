import {Tooltip} from "@mui/material";
import {ItemMeta, ItemName} from "../../theme/commonStyles";
import React from "react";
import WarningIcon from "@mui/icons-material/Warning";

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