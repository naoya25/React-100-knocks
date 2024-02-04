"use client";

import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor as WysiwygEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Index = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState: any) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <WysiwygEditor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        editorClassName="border border-black"
      />
    </div>
  );
};

export default Index;
