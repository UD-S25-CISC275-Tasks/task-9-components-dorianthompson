import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function RevealAnswer(): React.JSX.Element {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const handleClick = () => {
        setIsVisible(!isVisible);
    };
    return (
        <div>
            <Button onClick={handleClick}>Reveal Answer</Button>
            {isVisible && 42}
        </div>
    );
}
