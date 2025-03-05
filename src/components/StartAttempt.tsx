import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): React.JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const handleStartQuiz = () => {
        setInProgress(true);
        setAttempts(attempts - 1);
    };
    const handleStopQuiz = () => {
        setInProgress(false);
    };
    const handleMulligan = () => {
        setAttempts(attempts + 1);
    };

    return (
        <div>
            <Button
                type="button"
                value="Start Quiz"
                onClick={handleStartQuiz}
                disabled={inProgress === true || attempts === 0}
            >
                Start Quiz
            </Button>

            <Button
                disabled={inProgress === true}
                type="button"
                value="Mulligan"
                onClick={handleMulligan}
            >
                Mulligan
            </Button>

            <Button
                type="button"
                value="Stop Quiz"
                onClick={handleStopQuiz}
                disabled={inProgress === false}
            >
                Stop Quiz
            </Button>

            {attempts}
        </div>
    );
}
