"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { Note } from "@/types/note";

// リッチテキスト関連
import { EditorState } from "draft-js";
import { Editor as WysiwygEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromHTML, convertToHTML } from "draft-convert";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: "sample1", body: "aaaaa" },
    { id: 2, title: "sample2", body: "bbbbb" },
    { id: 3, title: "sample3", body: "ccccc" },
  ]);
  const [activeNote, setActiveNote] = useState<Note | null>(null); // 現在編集中のnote
  const [inputTitle, setInputTitle] = useState<string>("");
  const [editorBodyState, setEditorBodyState] = useState(
    EditorState.createEmpty()
  );

  const addNote = () => {
    const maxId = notes.reduce(
      (max, note) => (note.id > max ? note.id : max),
      0
    );
    setNotes([...notes, { id: maxId + 1, title: "new note", body: "" }]);
  };

  const deleteNote = (id: number) => {
    setNotes((notes) => notes.filter((n) => n.id !== id));
    if (activeNote && id === activeNote.id) {
      setActiveNote(null);
    }
  };

  const updateNote = (id: number, title: string, body: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { id: id, title: title, body: body } : note
      )
    );
  };

  const updateActiveNote = (note: Note) => {
    setActiveNote(note);
    setInputTitle(note.title);
    setEditorBodyState(
      EditorState.createWithContent(convertFromHTML(note.body)) // html形式からeditorの形式に直す
    );
  };

  return (
    <main className="flex">
      {/* 左側のメニュー */}
      <div className="left-menu h-[100vh] w-[300px] mr-4 bg-gray-200">
        <div className="header flex justify-between m-4">
          <p>メモアプリ</p>
          <p>
            <FontAwesomeIcon
              icon={faSquarePlus}
              className="h-[15px] w-[15px]"
              onClick={addNote}
            />
          </p>
        </div>
        <div>
          {notes.length === 0 ? (
            <p>メモが登録されていません</p>
          ) : (
            notes.map((note) => (
              <div
                className="flex justify-between m-4 bg-gray-500 h-[50px] items-center text-white"
                key={note.id}
              >
                <p className="ml-1" onClick={() => updateActiveNote(note)}>
                  {note.title}
                </p>
                <p className="ml-1 mr-1" onClick={() => deleteNote(note.id)}>
                  ×
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 右側のエディター */}
      <div className="right-editor">
        {activeNote ? (
          notes && (
            <div>
              <p>
                <input
                  type="text"
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  placeholder="Edit note title..."
                  className="m-2"
                />
              </p>
              <p>
                <WysiwygEditor
                  editorState={editorBodyState}
                  onEditorStateChange={(newEditorState) =>
                    setEditorBodyState(newEditorState)
                  }
                  placeholder="Edit note body..."
                />
              </p>
              <button
                onClick={() =>
                  updateNote(
                    activeNote.id,
                    inputTitle,
                    convertToHTML(editorBodyState.getCurrentContent())
                  )
                }
                className="fixed bottom-5 right-5"
              >
                <div className="bg-blue-400 h-[50px] w-[50px] flex items-center justify-center rounded-[50%]">
                  <FontAwesomeIcon icon={faFloppyDisk} />
                </div>
              </button>
            </div>
          )
        ) : (
          <div>メモが選択されていません</div>
        )}
      </div>
    </main>
  );
}
