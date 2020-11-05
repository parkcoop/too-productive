import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import AllHabits from "./pages/AllHabits";
import HabitTracker from "./pages/HabitTracker";
interface Props {}

const Habits: React.FC<Props> = ({ navigation, route }) => {
    const RootStack = createStackNavigator();
    const opacityTransition: object = {
        gestureDirection: "horizontal", // we will swipe right if we want to close the screen;
        transitionSpec: {
            open: {
                animation: "default",
            },
            close: {
                animation: "timing",
                config: {
                    duration: 50,
                },
            },
        },
        cardStyleInterpolator: ({
            current,
        }: {
            current: { progress: number };
        }) => ({
            cardStyle: {
                opacity: current.progress,
            }, // updates the opacity depending on the transition progress value of the current screen
        }),
    };

    useEffect(() => {
        if (route.params?.new) {
            navigation.navigate("AllHabits", { new: true });
        }
    }, [route.params]);
    return (
        <RootStack.Navigator
            headerMode="none"
            mode="modal"
            screenOptions={{ ...opacityTransition }}
        >
            <RootStack.Screen name="AllHabits" component={AllHabits} />
            <RootStack.Screen name="HabitTracker" component={HabitTracker} />
        </RootStack.Navigator>
    );
};

export default Habits;
