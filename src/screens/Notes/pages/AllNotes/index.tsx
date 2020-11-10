import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Layout,
    Text,
    useTheme,
} from "@ui-kitten/components";
import { NavigationParams, NavigationScreenProp } from "react-navigation";
import { NavigationState } from "@react-navigation/native";
import ModalMenu from "../../../../common/components/ModalMenu";
import NoteToSelf from "../../components/NoteToSelf";
import { SessionContext, ThemeContext } from "../../../../context";
import { getNotes, saveNote } from "../../../../api/Notes";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

type Note = {
    _id: string,
    type: string,
    body: string
}

const AllNotes: React.FC<Props> = ({ route, navigation }) => {
    const [existingNotes, setExistingNotes] = useState<[]>([]);
    const [newNoteVisible, setNewNoteVisible] = useState<boolean>(false);
    const { session } = useContext(SessionContext);
    const theme = useTheme();
    const { theme: brightnessTheme } = useContext(ThemeContext);


    const saveUserNote = async (note: string) => {
        console.log("saving");
        let lol = await saveNote({
            userId: session.user._id,
            body: note,
            type: "NOTE_TO_SELF",
        });
        console.log(lol);
        setNewNoteVisible(false);
    };

    const getUserNotes = async () => {
        let notes = await getNotes(session.user._id);
        console.log(notes.data);
        setExistingNotes(notes.data);
    };
    useEffect(() => {
        getUserNotes();
    }, []);

    useEffect(() => {
        if (route.params?.new) {
            setNewNoteVisible(true);
        }
    }, [route.params]);

    return (
        <Layout style={{ flex: 1, padding: 15 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={{ fontSize: 23 }}>Notes</Text>
                <ScrollView>
                    {existingNotes &&
                        existingNotes.map((note: Note) => {
                            return (
                                <TouchableOpacity 
                                    key={note._id}
                                    onPress={() => {
                                        navigation.navigate(
                                            "EditNote",
                                            { note },
                                        );
                                    }}
                                >
                                    <Layout
                                        
                                        style={{
                                            backgroundColor:
                                                brightnessTheme === "dark"
                                                    ? theme["color-basic-700"]
                                                    : theme["color-basic-200"],
                                            padding: 10,
                                            margin: 10,
                                            borderRadius: 7.5,
                                        }}
                                    >
                                        <Text>{note.body}</Text>
                                    </Layout>
                                </TouchableOpacity>
                            );
                        })}
                        </ScrollView>
                <ModalMenu
                    visible={newNoteVisible}
                    setVisible={setNewNoteVisible}
                >
                    <NoteToSelf saveUserNote={saveUserNote} />
                    {/* {(() => {
                        switch (newNoteType) {
                            case "WORKOUT_LOG":
                                return <Layout />;
                            default:
                            case "NOTE_TO_SELF":
                            // return <NoteToSelf />;
                        }
                    })()} */}
                </ModalMenu>
            </SafeAreaView>
        </Layout>
    );
};

export default AllNotes;
