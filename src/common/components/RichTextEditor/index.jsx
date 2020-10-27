import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { WebViewHTML } from "./components/WebViewHTML";

const RichTextEditor = ({ style }) => {
  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: WebViewHTML }}
      onMessage={(event) => {
        const { data } = event.nativeEvent;
        console.log(data, event);
      }}
    />
  );
};

export default RichTextEditor;
