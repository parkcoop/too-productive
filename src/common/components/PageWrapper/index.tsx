import { Layout } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface Props {}

const PageWrapper: React.FC<Props> = ({ children }) => {
    return (
        <Layout style={{ padding: 15, flex: 1 }}>
            <SafeAreaView>
                <ScrollView
                    style={{ flexGrow: 1, height: "100%", paddingTop: 10 }}
                >
                    {children}
                </ScrollView>
            </SafeAreaView>
        </Layout>
    );
};

export default PageWrapper;
