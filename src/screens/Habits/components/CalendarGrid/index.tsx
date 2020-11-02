import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Button,
    Layout,
    Text,
    MenuItem,
    OverflowMenu,
    useTheme,
} from "@ui-kitten/components";
import Svg, { Rect } from "react-native-svg";
import { ScrollView, StyleSheet } from "react-native";

type IndexPath = {
    row: number;
    section?: number;
};

interface Props {}

const CalendarGrid: React.FC<Props> = ({ habit }) => {
    if (!habit) return null;
    const theme = useTheme();
    const preRenderedCount = new Array(
        new Date(habit?.startDate).getDay() || 7,
    ).fill({});

    let squaresData = [...preRenderedCount];

    let currentDay = habit?.startDate;

    let newData = habit?.trackedDays?.reduce((acc, val) => {
        // console.log(acc);
        let unaccountedDays = Math.floor(
            (Date.parse(val.date) - (Date.parse(currentDay) + 1)) / 86400000,
        );
        if (unaccountedDays >= 1) {
            let greySquares = new Array(unaccountedDays).fill({
                date: null,
                status: false,
                streak: false,
            });
            acc.push(...greySquares);
        } else {
            acc.push(val);
        }
        currentDay = val.date;
        return acc;
    }, []);

    squaresData.push(...newData);
    return (
        <Layout
            style={{
                backgroundColor: "rgba(0,0,0,0)",
                width: "100%",
                minWidth: "100%",
                height: 130,
                display: "flex",
                flexWrap: "wrap",
            }}
        >
            <Text style={styles.cell}></Text>
            <Text style={styles.cell}>M</Text>
            <Text style={styles.cell}></Text>
            <Text style={styles.cell}>W</Text>
            <Text style={styles.cell}></Text>
            <Text style={styles.cell}>F</Text>
            <Text style={styles.cell}></Text>
            {squaresData.map((day, i) => (
                <Svg
                    key={i}
                    style={{ margin: 2.5 }}
                    height="12.5px"
                    width="12.5px"
                    viewBox="0 0 12.5 12.5"
                >
                    <Rect
                        x="0"
                        y="0"
                        width="12.5"
                        height="12.5"
                        fill={((success) => {
                            switch (success) {
                                case true:
                                    if (day.streak) {
                                        return theme[
                                            `color-${habit.color}-focus`
                                        ];
                                    } else {
                                        return theme[
                                            `color-${habit.color}-default`
                                        ];
                                    }
                                // case false:
                                //     return theme["color-danger-default"];
                                default:
                                case null:
                                    return theme["color-info-disabled"];
                            }
                        })(day.status)}
                    />
                </Svg>
            ))}
        </Layout>
    );
};

export default CalendarGrid;
const styles = StyleSheet.create({
    cell: {
        width: 15,
        height: 12.5,
        margin: 2.5,
        // paddingTop: 1,
        borderWidth: 0,
        fontSize: 7,
        textAlign: "center",
    },
});
