import styled from "styled-components";
import React from "react";

export function ColorInfo({isJobMaster}) {
    return <HeaderLegend>
        {isJobMaster ? (
            <>
                <LegendItem>
                    <LegendColorBox color="brown"/>
                    <span>Not Assigned</span>
                </LegendItem>
                <LegendItem>
                    <LegendColorBox color="green"/>
                    <span>Assigned</span>
                </LegendItem>
                <LegendItem>
                    <LegendColorBox color="#cc6600"/>
                    <span>With Constraint</span>
                </LegendItem>
            </>
        ) : (
            <>
                <LegendItem>
                    <LegendColorBox color="green"/>
                    <span>Assigned to You</span>
                </LegendItem>
                <LegendItem>
                    <LegendColorBox/>
                    <span>Available</span>
                </LegendItem>
                <LegendItem>
                    <LegendColorBox color="#cc6600"/>
                    <span>Constraint</span>
                </LegendItem>
            </>
        )}
    </HeaderLegend>;
}

const HeaderLegend = styled.div`
    position: absolute;
    bottom: 1.8vh;
    scale: 120%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    font-size: 11px;
    pointer-events: none; /* so it doesn’t block clicks on buttons */
`;
const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--sand);
`;
const LegendColorBox = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background-color: ${props => props.color};
    border: 1px solid var(--army-green-dark);
`;