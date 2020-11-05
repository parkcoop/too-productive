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

const CalendarGrid: React.FC<Props> = ({ habit, squareWidth, container }) => {
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
                display: "flex",
                flexDirection: "row",
                backgroundColor: "transparent",
            }}
        >
            <Layout
                style={{
                    backgroundColor: "transparent",

                    width: 25,
                    minWidth: 25,
                    height: 150,
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
            </Layout>
            <ScrollView horizontal>
                <Layout
                    style={{
                        backgroundColor: "transparent",

                        width: "100%",
                        minWidth: "100%",
                        height: 150,
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    {squaresData.map((day, i) => (
                        <Svg
                            key={i}
                            style={{ margin: 2.5 }}
                            height="15px"
                            width="15px"
                            viewBox="0 0 15 15"
                        >
                            <Rect
                                x="0"
                                y="0"
                                width="15"
                                height="15"
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
            </ScrollView>
        </Layout>
    );
};

export default CalendarGrid;
const styles = StyleSheet.create({
    cell: {
        width: 15,
        height: 15,
        margin: 2.5,
        // paddingTop: 1,
        borderWidth: 0,
        fontSize: 15,
        textAlign: "center",
    },
});
