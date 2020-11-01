import { Input, Layout, Text, Button } from "@ui-kitten/components";
import React, { useContext, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { SessionContext } from "../../../../context";
import { saveNote } from "../../../../api/Notes";

interface Props {}

const NoteToSelf: React.FC<Props> = () => {
    const [note, setNote] = useState<string>("");
    const { session } = useContext(SessionContext);
    return (
        <KeyboardAvoidingView>
            <Layout style={{ marginBottom: 15 }}>
                <Text style={{ fontSize: 25, marginBottom: 15 }}>
                    Note to self
                </Text>
                <Input
                    placeholder="Write something, expands as far as you need"
                    multiline
                    onChangeText={setNote}
                    autoFocus
                    textStyle={{ minHeight: 64 }}
                />
                <Button
                    onPress={() => {
                        saveNote({
                            userId: session.user._id,
                            body: note,
                            type: "NOTE_TO_SELF",
                        });
                    }}
                >
                    SAVE
                </Button>
            </Layout>
        </KeyboardAvoidingView>
    );
};

export default NoteToSelf;
