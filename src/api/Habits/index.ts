import axios from "axios";
import { showMessage } from "react-native-flash-message";

type HabitBody = {
    userId: string;
    label: string;
    color: string;
};

const getHabits: (arg0: string) => Promise<{ data: [] }> = (
    userId: string,
) => {
    return axios
        .get("http://10.0.0.177:5000/habits", {
            params: {
                userId,
            },
        })
        .then((res) => Promise.resolve(res.data))
        .catch((err) => {
            console.log(err.response);
            showMessage({
                type: "danger",
                color: "white",
                backgroundColor: "red",
                message: "Error getting habits",
                description: err.response?.data?.msg,
            });
        });
};

const saveHabit: (arg0: HabitBody) => Promise<{}> = ({ userId, label, color }) => {
    return axios
        .post("http://10.0.0.177:5000/habits", {
            userId,
            label,
            color,
        })
        .then((res) => Promise.resolve(res.data))
        .catch((err) =>
            showMessage({
                type: "danger",
                color: "white",
                backgroundColor: "red",
                message: "Error saving habit",
                description: err.response?.data?.msg,
            }),
        );
};

export { getHabits, saveHabit };
