// Custom dropdown for Job Masters
import React, {useRef, useState} from "react";
import styled from "styled-components";

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
                id={id}
                ref={ref}
                aria-haspopup="listbox"
                aria-expanded={open}
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

const Dropdown = styled.div`
    position: relative;
    width: 100%;
`;

const DropdownButton = styled.button`
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 12px 38px 12px 44px; /* left padding clears the icon in InputWrap */
    height: 44px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #fff;
    outline: none;
    cursor: pointer;

    &:focus {
        box-shadow: 0 0 0 2px rgba(195, 213, 75, 0.5);
    }
`;

const Placeholder = styled.span`
    color: rgba(255, 255, 255, 0.6);
`;

const Caret = styled.span`
    margin-left: 8px;
    opacity: 0.8;
`;

const DropdownMenu = styled.div`
    position: absolute;
    left: 0;
    right: 0;

    top: ${({$openUp}) => ($openUp ? 'auto' : 'calc(80% + 6px)')};
    bottom: ${({$openUp}) => ($openUp ? 'calc(80% + 6px)' : 'auto')};
    max-height: 120px;
    overflow: auto;
    padding: 6px;
    border-radius: 12px;
    background: rgba(20, 25, 20, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
`;

const DropdownItem = styled.div`
    padding: 10px 12px;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
    }
`;

const EmptyItem = styled.div`
    padding: 12px;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
`;

const ItemName = styled.div`
    font-weight: 600;
    line-height: 1.1;
`;

const ItemMeta = styled.div`
    font-size: 12px;
    opacity: 0.85;
    margin-top: 2px;
    line-height: 1.1;
`;