import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface DoubleProps {
    doubleValue: () => void;
}

interface HalveProps {
    halveValue: () => void;
}

function Doubler({ doubleValue }: DoubleProps): React.JSX.Element {
    return <Button onClick={doubleValue}>Double</Button>;
}

function Halver({ halveValue }: HalveProps): React.JSX.Element {
    return <Button onClick={halveValue}>Halve</Button>;
}

export function DoubleHalf(): React.JSX.Element {
    const [dhValue, setDhValue] = useState<number>(10);
    const DoubleValue = () => {
        setDhValue(dhValue * 2);
    };
    const HalveValue = () => {
        setDhValue(dhValue * 0.5);
    };
    return (
        <div>
            <h3>Double Half</h3>
            <div>
                The current value is: <span>{dhValue}</span>
            </div>
            <Doubler doubleValue={DoubleValue}></Doubler>
            <Halver halveValue={HalveValue}></Halver>
        </div>
    );
}
