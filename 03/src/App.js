import React, { useState } from "react";
import "./App.css"; // Assuming you have a CSS file for styling

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { name: task, completed: false }]);
      setTask("");
      setShowModal(false); // タスク追加後にモーダルを閉じる
      setError(""); // エラーメッセージをクリア
    } else {
      setError("タスクを入力してください");
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleToggleComplete = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <>
      <div className="todo-card">
        <div className="todo-card-header">TODO List</div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(index)}
                style={{ marginRight: "10px" }}
              />
              <div>{task.name}</div>
              <button onClick={() => handleDeleteTask(index)}>X</button>
            </li>
          ))}
        </ul>
        <button onClick={() => setShowModal(true)}>+</button>
      </div>
      {showModal && (
        <div className="modal">
          <h1>新規登録</h1>
          <input
            type="text"
            value={task}
            onChange={handleInputChange}
            placeholder="タスク名"
          />{" "}
          <br />
          {error && <p>{error}</p>} <br />
          <div className="modal-buttons">
            <button onClick={handleAddTask}>保存</button>
            <button onClick={() => setShowModal(false)} className="cancel">キャンセル</button>
          </div>
        </div>
      )}
      {showModal && <div className="overlay"></div>}
    </>
  );
};

export default TodoList;
