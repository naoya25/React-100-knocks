import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");

  const handleButtonClick = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = eval(input);
      setInput(calculatedResult.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleClear = () => {
    setInput("0");
  };

  return (
    <div
      className="calculator"
      style={{
        background: "rgb(50, 50, 50)",
        width: 300,
        padding: 50,
        textAlign: "center",
      }}
    >
      <div className="display">
        <input
          type="text"
          value={input}
          style={{
            display: "flex",
            width: 209,
            height: 50,
            borderRadius: 5,
            border: "none",
            outline: "none",
            background: "black",
            color: "white",
            fontSize: "2em",
            textAlign: "right",
            margin: "0 auto 5px auto",
          }}
          readOnly
        />
      </div>
      <div className="buttons">
        <div className="row">
          <button onClick={() => handleButtonClick("7")}>7</button>
          <button onClick={() => handleButtonClick("8")}>8</button>
          <button onClick={() => handleButtonClick("9")}>9</button>
          <button onClick={() => handleButtonClick("+")}>+</button>
        </div>
        <div className="row">
          <button onClick={() => handleButtonClick("4")}>4</button>
          <button onClick={() => handleButtonClick("5")}>5</button>
          <button onClick={() => handleButtonClick("6")}>6</button>
          <button onClick={() => handleButtonClick("-")}>-</button>
        </div>
        <div className="row">
          <button onClick={() => handleButtonClick("1")}>1</button>
          <button onClick={() => handleButtonClick("2")}>2</button>
          <button onClick={() => handleButtonClick("3")}>3</button>
          <button onClick={() => handleButtonClick("*")}>*</button>
        </div>
        <div className="row">
          <button onClick={() => handleButtonClick("0")}>0</button>
          <button onClick={() => handleButtonClick("/")}>/</button>
          <button onClick={() => handleButtonClick(".")}>.</button>
          <button onClick={handleCalculate}>=</button>
        </div>
        <div className="row">
          <button style={{ width: 70 }} onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
