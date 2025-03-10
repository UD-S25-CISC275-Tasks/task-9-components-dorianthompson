import React, { useState } from "react";
import { Button } from "react-bootstrap";

export const COLORS = ["red", "blue", "green"];
const DEFAULT_COLOR_INDEX = 0;

interface ChangeColorProps {
    changeColor: () => void;
}

interface PreviewColorProps {
    colorIndex: number;
}

function ChangeColor({ changeColor }: ChangeColorProps): React.JSX.Element {
    return (
        <Button
            onClick={() => {
                changeColor();
            }}
        >
            Next Color
        </Button>
    );
}

function ColorPreview({ colorIndex }: PreviewColorProps): React.JSX.Element {
    return (
        <div
            data-testid="colored-box"
            style={{
                width: "50px",
                height: "50px",
                backgroundColor: COLORS[colorIndex],
                display: "inline-block",
                verticalAlign: "bottom",
                marginLeft: "5px"
            }}
        ></div>
    );
}

export function ColoredBox(): React.JSX.Element {
    const [colorIndex, setColorIndex] = useState<number>(DEFAULT_COLOR_INDEX);
    const changeColor = () => {
        setColorIndex((1 + colorIndex) % COLORS.length);
    };
    return (
        <div>
            <h3>Colored Box</h3>
            <span>The current color is: {COLORS[colorIndex]}</span>
            <div>
                <ChangeColor changeColor={changeColor}></ChangeColor>
                <ColorPreview colorIndex={colorIndex}></ColorPreview>
            </div>
        </div>
    );
}
