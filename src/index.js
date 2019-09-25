import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import BpmnJS from "bpmn-js/lib/Modeler";

import "./styles.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";

/**
 * Open diagram in our viewer instance.
 *
 * @param {String} bpmnXML diagram to display
 */
function openDiagram(bpmnModeler) {
  const diagramUrl =
    "https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn";
  // import diagram
  return fetch(diagramUrl)
    .then(response => response.text())
    .then(bpmnXML => {
      // import diagram
      bpmnModeler.importXML(bpmnXML, function(err) {
        if (err) {
          return console.error("could not import BPMN 2.0 diagram", err);
        }
        // access modeler components
        var canvas = bpmnModeler.get("canvas");
        var overlays = bpmnModeler.get("overlays");
        // zoom to fit full viewport
        canvas.zoom("fit-viewport");
        // attach an overlay to a node
        overlays.add("SCAN_OK", "note", {
          position: {
            bottom: 0,
            right: 0
          },
          html: '<div class="diagram-note">Mixed up the labels?</div>'
        });
        // add marker
        canvas.addMarker("SCAN_OK", "needs-discussion");
      });
    });
}

function App() {
  const viewer = new BpmnJS({
    keyboard: {
      bindTo: window
    }
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // attach it to some element
    viewer.attachTo("#root");

    openDiagram(viewer);

    return () => {
      // detach the panel
      viewer.detach();
    };
  });

  return <div id="container" className="App" />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
