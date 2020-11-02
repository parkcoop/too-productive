import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import CalendarGrid from "../CalendarGrid";

interface Props {
    habit: Habit;
}

interface Habit {
    label: string;
    color: string;
    trackedDays: string[];
    startDate: string;
}

const HabitTracker: React.FC<Props> = ({ habit }) => {
    return (
        <Layout>
            <Text>{habit.label}</Text>
            <CalendarGrid habit={habit} />
        </Layout>
    );
};

export default HabitTracker;
