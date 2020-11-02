import { Layout, useTheme } from "@ui-kitten/components";
import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Rect } from "react-native-svg";

interface Props {
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
    selectedColor: string;
}

const ColorPicker: React.FC<Props> = ({ selectedColor, setSelectedColor }) => {
    const theme = useTheme();
    const colors = [
        "color-success-default",
        "color-danger-default",
        "color-info-default",
        "color-warning-default",
    ];
    return (
        <Layout
            style={{
                flexDirection: "row",
                justifyContent: "space-around",
                margin: 15,
            }}
        >
            {colors.map((color) => (
                <TouchableOpacity
                    onPress={() => setSelectedColor(color)}
                    style={{
                        ...(selectedColor === color
                            ? {
                                  backgroundColor: "rgba(255,255,255,0.1)",
                                  borderRadius: 50,
                                  width: 60,
                                  height: 60,
                                  alignItems: "center",
                                  justifyContent: "center",
                              }
                            : {
                                  backgroundColor: "transparent",
                                  borderRadius: 50,
                                  width: 60,
                                  height: 60,
                                  alignItems: "center",
                                  justifyContent: "center",
                              }),
                    }}
                >
                    <Svg
                        // style={{ margin: 2.5 }}
                        height="30px"
                        width="30px"
                        viewBox="0 0 30 30"
                    >
                        <Rect
                            x="0"
                            y="0"
                            width="30"
                            height="30"
                            fill={theme[color]}
                        />
                    </Svg>
                </TouchableOpacity>
            ))}
        </Layout>
    );
};

export default ColorPicker;
