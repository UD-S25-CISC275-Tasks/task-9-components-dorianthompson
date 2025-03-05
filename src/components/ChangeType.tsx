import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

export function ChangeType(): React.JSX.Element {
    const [QType, setQType] = useState<QuestionType>("short_answer_question");
    const handleClick = () => {
        if (QType === "multiple_choice_question") {
            setQType("short_answer_question");
        } else {
            setQType("multiple_choice_question");
        }
    };
    return (
        <div>
            <Button value="Change Type" onClick={handleClick}>
                Change Type
            </Button>
            {QType === "multiple_choice_question"
                ? "Multiple Choice"
                : "Short Answer"}
        </div>
    );
}
