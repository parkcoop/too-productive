export const WebViewHTML = `<!DOCTYPE html>
<html>
  <head>
    <meta
      name="viewport"
      content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"
    />
    <style>
      * {
        outline: 0px solid transparent;
        -webkit-tap-highlight-color: #000000;
        -webkit-touch-callout: none;
        -webkit-overflow-scrolling: touch;
      }
      html,
      body {
        flex: 1;
        outline: 0;
        padding: 0;
        margin: 0;
        font-family: '-apple-system', 'HelveticaNeue', Helvetica, Roboto, Arial,
          sans-serif;
        font-size: 1em;
        color: #000000;
        height: 100%;
        min-height: 100%;
        overflow: hidden;
      }
      .editor,
      .content {
        outline: 0;
        padding: 0;
        margin: 0;
        height: 100%;
        min-height: 100%;
      }
      .content {
        padding: 1em;
      }
      [placeholder]:empty:before,
      [placeholder]:empty:focus:before {
        content: attr(placeholder);
        color: #d1d1d1;
      }
      [contenteditable] {
        -webkit-user-select: text;
        user-select: text;
      }
    </style>
  </head>
  <body>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is your notepad</p>
  <p id="LOL">WTF DID YOUI SAY TO ME</p>
  <button onclick="lol("LOL")">LOLOLOL</button>
  <script>

    <div id="editor" class="editor"></div>
    <script>
    window.ReactNativeWebView.postMessage(JSON.stringify({LOL:"OMG"}));
      function lol(message) {
      }
      lol("NICE")
    </script>
  </body>
</html>
`;
