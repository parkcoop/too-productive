import axios from "axios";
import { showMessage } from "react-native-flash-message";

type NoteBody = {
    userId: string;
    type: string;
    body: string;
};

const getNotes: (arg0: string) => Promise<{ data: [] }> = (
    userId: string,
) => {
    return axios
        .get("http://10.0.0.177:5000/notes", {
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
                message: "Error logging in",
                description: err.response?.data?.msg,
            });
        });
};

const saveNote: (arg0: NoteBody) => Promise<{}> = ({ userId, type, body }) => {
    return axios
        .post("http://127.0.0.1:5000/notes", {
            userId,
            type,
            body,
        })
        .then((res) => Promise.resolve(res.data))
        .catch((err) =>
            showMessage({
                type: "danger",
                color: "white",
                backgroundColor: "red",
                message: "Error logging in",
                description: err.response?.data?.msg,
            }),
        );
};

export { getNotes, saveNote };
