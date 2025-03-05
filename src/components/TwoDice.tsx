import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): React.JSX.Element {
    const [diceOne, setDiceOne] = useState<number>(3);
    const [diceTwo, setDiceTwo] = useState<number>(5);
    const handleDiceOneRoll = () => {
        setDiceOne(d6());
    };
    const handleDiceTwoRoll = () => {
        setDiceTwo(d6());
    };
    return (
        <div>
            <span data-testid="left-die">{diceOne}</span>
            <Button onClick={handleDiceOneRoll} value="Roll Left">
                Roll Left
            </Button>
            <span data-testid="right-die">{diceTwo}</span>
            <Button onClick={handleDiceTwoRoll} value="Roll Right">
                Roll Right
            </Button>
            {diceOne === diceTwo && diceOne === 1 && "Lose"}
            {diceOne === diceTwo && diceOne !== 1 && "Win"}
        </div>
    );
}
