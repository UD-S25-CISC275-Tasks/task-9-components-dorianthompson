import React, { useState } from "react";
import { Button } from "react-bootstrap";
//Birthday, Christmas, Thanksgiving, New year, Halloween

const AlphaHoliday: Record<string, string> = {
    Thanksgiving: "Birthday",
    Birthday: "Christmas",
    Christmas: "Halloween",
    Halloween: "NewYear",
    NewYear: "Thanksgiving"
};

const ChronoHoliday: Record<string, string> = {
    Christmas: "NewYear",
    NewYear: "Birthday",
    Birthday: "Halloween",
    Halloween: "Thanksgiving",
    Thanksgiving: "Christmas"
};

const HolidayEmoji: Record<string, string> = {
    Christmas: "🎄",
    NewYear: "🎆",
    Birthday: "🎂",
    Halloween: "🎃",
    Thanksgiving: "🦃"
};

export function CycleHoliday(): React.JSX.Element {
    const [Holiday, setHoliday] = useState<string>("Birthday");
    return (
        <div>
            Holiday: {HolidayEmoji[Holiday]}
            <Button
                onClick={() => {
                    setHoliday(AlphaHoliday[Holiday]);
                }}
            >
                Alphabet
            </Button>
            <Button
                onClick={() => {
                    setHoliday(ChronoHoliday[Holiday]);
                }}
            >
                Year
            </Button>
        </div>
    );
}
