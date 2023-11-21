import React, { useState } from "react";
import Button from "./components/Button";
import "./css/App.css";

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
    setInput("");
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
        {[
          ["7", "8", "9", "+"],
          ["4", "5", "6", "-"],
          ["1", "2", "3", "*"],
          ["0", "/", ".", "="],
        ].map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((buttonLabel) => (
              <Button
                label={buttonLabel}
                onClick={() =>
                  buttonLabel === "="
                    ? handleCalculate()
                    : handleButtonClick(buttonLabel)
                }
                style={{
                  width: 47,
                  height: 33,
                  margin: 6,
                  border: "none",
                  borderRadius: 5,
                }}
              />
            ))}
          </div>
        ))}
        <div className="row">
          <Button
            label={"Clear"}
            onClick={() => handleClear()}
            style={{
              width: 70,
              height: 33,
              margin: 6,
              border: "none",
              borderRadius: 5,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
