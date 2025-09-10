// Custom dropdown for Job Masters
import React, {useRef, useState} from "react";
import {
    Caret,
    DropdownButton,
    DropdownItem,
    DropdownMenu,
    EmptyItem,
    ItemMeta,
    ItemName,
    Placeholder
} from "../CommonStyles";
import {Dropdown} from "@mui/joy";

export function JobMasterSelect({id, value, options, onChange, placeholder}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const selected = options.find(o => String(o.personalNumber) === String(value));


    const handleSelect = (pn) => {
        onChange(pn);
        setOpen(false);
    };

    return (
        <Dropdown>
            <DropdownButton
                type="button"
                onClick={() => setOpen(o => !o)}
            >
                {selected ? (
                    <div>
                        <ItemName>{selected.firstName} {selected.lastName}</ItemName>
                        <ItemMeta>{selected.unit} • {selected.personalNumber}</ItemMeta>
                    </div>
                ) : (
                    <Placeholder>{placeholder}</Placeholder>
                )}
                <Caret>▾</Caret>
            </DropdownButton>

            {open && (
                <DropdownMenu role="listbox" tabIndex={-1}>
                    {options.length === 0 && (
                        <EmptyItem>No job masters available</EmptyItem>
                    )}
                    {options.map(opt => (
                        <DropdownItem
                            key={opt.personalNumber}
                            role="option"
                            aria-selected={String(opt.personalNumber) === String(value)}
                            onClick={() => handleSelect(opt.personalNumber)}
                        >
                            <ItemName>{opt.firstName} {opt.lastName}</ItemName>
                            <ItemMeta>{opt.unit} • {opt.personalNumber}</ItemMeta>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            )}
        </Dropdown>
    );
}
