import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Button,
    Layout,
    Text,
    MenuItem,
    OverflowMenu,
} from "@ui-kitten/components";
import { SessionContext } from "../../context";

type IndexPath = {
    row: number;
    section?: number;
};

const Habits = ({ route, navigation }) => {
    const { session } = useContext(SessionContext);
    console.log(route.params);

    useEffect(() => {
        console.log("NEW HABIT OPEN....");
    }, [route.params]);
    return (
        <Layout style={{ flex: 1, padding: 15 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={{ fontSize: 23 }}>Habit Tracking</Text>
            </SafeAreaView>
        </Layout>
    );
};

export default Habits;
