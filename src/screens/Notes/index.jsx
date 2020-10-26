import { Layout, Text, Button } from "@ui-kitten/components";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RichTextEditor from "../../common/components/RichTextEditor";

const Notes = () => {
  const [newNote, setNewNote] = useState(false);
  return (
    <Layout style={{ flex: 1, padding: 15 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ fontSize: 23 }}>Notes</Text>
        <Button
          onPress={() => setNewNote(!newNote)}
          style={{ width: "50%", alignSelf: "center", margin: 15 }}
        >
          {newNote ? `Hide` : `New note`}
        </Button>
        {newNote && <RichTextEditor />}
      </SafeAreaView>
    </Layout>
  );
};

export default Notes;
