import { FaMaximize, FaMinimize } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdPreview } from "react-icons/md";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import "./App.css";
import { useState } from "react";

function App() {
  const [editor, setEditor] = useState(false);
  const [preview, setPreview] = useState(false);

  function handleChange(e) {
    document.getElementById("preview").innerHTML = marked.parse(e.target.value);
  }

  function handleEditorMinMaxBtn() {
    setEditor((prev) => !prev);
  }

  function handlePreviewMinMaxBtn() {
    setPreview((prev) => !prev);
  }

  return (
    <>
      <div className="container">
        <div
          id="editor-wrapper"
          className={`wrapper ${editor && "maximized"} ${preview && "hidden"}`}
        >
          <div className="toolbar">
            <div>
              <FaEdit />
              Editor
            </div>
            <div className="minmax" onClick={handleEditorMinMaxBtn}>
              {editor ? <FaMinimize /> : <FaMaximize />}
            </div>
          </div>
          <textarea
            name="editor"
            id="editor"
            onChange={(e) => handleChange(e)}
            placeholder="write down here"
          ></textarea>
        </div>
        <div
          id="preview-wrapper"
          className={`wrapper ${preview && "maximized"} ${editor && "hidden"}`}
        >
          <div className="toolbar">
            <div>
              <MdPreview />
              Previewer
            </div>
            <div className="minmax" onClick={handlePreviewMinMaxBtn}>
              {preview ? <FaMinimize /> : <FaMaximize />}
            </div>
          </div>
          <div id="preview"></div>
        </div>
        <div>by hussain</div>
      </div>
    </>
  );
}

export default App;
