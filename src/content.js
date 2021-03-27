/*global chrome*/

/* src/content.js */
import React from "react";
import ReactDOM from "react-dom";
import "./content.css";

class Main extends React.Component {
  render() {
    return (
      <div className={"extension"}>
        <h1>Clippy</h1>
      </div>
    );
  }
}

const app = document.createElement("div");
app.id = "extension-root";
app.style.display = "none";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {
    toggle();
  }
});

function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
}

document.body.appendChild(app);
ReactDOM.render(<Main />, app);
