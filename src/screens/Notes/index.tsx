import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Button,
    Layout,
    Text,
    MenuItem,
    OverflowMenu,
} from "@ui-kitten/components";
import ModalMenu from "../../common/components/ModalMenu";
import NoteToSelf from "./components/NoteToSelf";
import { SessionContext } from "../../context";
import { getNotes } from "../../api/Notes";

type IndexPath = {
    row: number;
    section?: number;
};

const Notes = () => {
    const [existingNotes, setExistingNotes] = useState<[]>([]);
    const [newNoteVisible, setNewNoteVisible] = useState<boolean>(false);
    const [newNoteType, setNewNoteType] = useState<string | null>();
    const [newNoteMenuVisible, setNewNoteMenuVisible] = React.useState<boolean>(
        false,
    );
    const { session } = useContext(SessionContext);

    const onItemSelect = (index: IndexPath) => {
        console.log(index);
        setNewNoteVisible(true);
        setNewNoteType("NOTE_TO_SELF");
        setNewNoteMenuVisible(false);
    };

    const renderToggleButton = () => (
        <Button
            style={{ width: "50%" }}
            onPress={() => setNewNoteMenuVisible(true)}
        >
            NEW NOTE
        </Button>
    );

    const getUserNotes = async () => {
        let notes = await getNotes(session.user._id);
        console.log(notes.data);
        setExistingNotes(notes.data);
    };
    useEffect(() => {
        getUserNotes();
    }, []);

    return (
        <Layout style={{ flex: 1, padding: 15 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={{ fontSize: 23 }}>Notes</Text>
                <OverflowMenu
                    anchor={renderToggleButton}
                    backdropStyle={{
                        backgroundColor: "rgba(0,0,0,0.4)",
                    }}
                    visible={newNoteMenuVisible}
                    fullWidth
                    // selectedIndex={selectedIndex}
                    style={{ width: "100%" }}
                    onSelect={onItemSelect}
                    onBackdropPress={() => setNewNoteMenuVisible(false)}
                >
                    <MenuItem title="Note to self" />
                    {/* <MenuItem title="Workout log" /> */}
                </OverflowMenu>
                {existingNotes &&
                    existingNotes.map((note) => {
                        return (
                            <Layout
                                style={{
                                    borderWidth: 1,
                                    backgroundColor: "grey",
                                }}
                            >
                                <Text>{note.type}</Text>
                                <Text>{note.body}</Text>
                            </Layout>
                        );
                    })}
                <ModalMenu
                    visible={newNoteVisible}
                    setVisible={setNewNoteVisible}
                >
                    {(() => {
                        switch (newNoteType) {
                            case "WORKOUT_LOG":
                                return <Layout />;
                            default:
                            case "NOTE_TO_SELF":
                                return <NoteToSelf />;
                        }
                    })()}
                </ModalMenu>
            </SafeAreaView>
        </Layout>
    );
};

export default Notes;
