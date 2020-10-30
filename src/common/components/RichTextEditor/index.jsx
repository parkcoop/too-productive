import PushNotificationIOS from "@react-native-community/push-notification-ios";
import React, { Component, useEffect } from "react";
import { WebView } from "react-native-webview";
import { WebViewHTML } from "./components/WebViewHTML";

const RichTextEditor = ({ style }) => {
  useEffect(() => {
    // PushNotificationIOS.addNotificationRequest({
    //   id: "1233345",
    //   title: "Hey there",
    //   subtitle: "What are you doing...?",
    // });
  }, []);

  return (
    <WebView
      originWhitelist={["*"]}
      source={{
        html: WebViewHTML,
      }}
      injectedJavaScript={`
        document.body.style.backgroundColor = 'red';
        // setTimeout(function() { window.alert('hi') }, 2000);
        true; // note: this is required, or you'll sometimes get silent failures
      `}
      onLoadEnd={() => console.log("LOADED")}
      onMessage={(event) => {
        const lol = event.nativeEvent.data;
        console.log(lol);
      }}
    />
  );
};

export default RichTextEditor;
