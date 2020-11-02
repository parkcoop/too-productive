import { Input, Layout, Text, Button, useTheme } from "@ui-kitten/components";
import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import Svg, { Rect } from "react-native-svg";
import ColorPicker from "../../../../common/components/ColorPicker";

interface Props {
    saveUserHabit: (arg0: { label: string; color: string }) => void;
}

const NewHabit: React.FC<Props> = ({ saveUserHabit }) => {
    const [label, setLabel] = useState<string>("");
    const [color, setColor] = useState<string>("");
    return (
        <KeyboardAvoidingView>
            <Layout style={{ marginBottom: 15 }}>
                <Text style={{ fontSize: 25, marginBottom: 15 }}>
                    New Habit
                </Text>
                <Layout>
                    <Text>Label</Text>
                    <Input value={label} onChangeText={setLabel} />
                </Layout>
                <Layout style={{ marginTop: 25, marginBottom: 25 }}>
                    <Text>Squares Color</Text>
                    <ColorPicker
                        selectedColor={color}
                        setSelectedColor={setColor}
                    />
                </Layout>
                <Button onPress={() => saveUserHabit({ label, color })}>
                    SAVE
                </Button>
            </Layout>
        </KeyboardAvoidingView>
    );
};

export default NewHabit;
