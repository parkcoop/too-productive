import { Input, useTheme } from "@ui-kitten/components";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

interface DatePickerProps {
    setFieldValue: React.Dispatch<React.SetStateAction<Date>>;
    fieldValue: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
    setFieldValue,
    fieldValue,
}) => {
    const [visible, setVisible] = useState<boolean>();
    const theme = useTheme();

    return (
        <TouchableOpacity onPress={() => setVisible(true)}>
            <Input
                disabled
                value={moment(fieldValue).format("MM-DD-YYYY h:mma")}
                editable={false}
                textStyle={{ color: theme["text-basic-color"] }}
                onChangeText={(e) => console.log(e)}
            />
            <DateTimePickerModal
                isVisible={visible}
                mode="datetime"
                onConfirm={(date) => {
                    console.log(moment(date).format("MM-DD-YYYY h:mma"));
                    setVisible(false);
                    setFieldValue(date);
                }}
                onCancel={() => setVisible(false)}
            />
        </TouchableOpacity>
    );
};

export default DatePicker;
