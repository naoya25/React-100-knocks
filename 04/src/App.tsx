import React, { useState, useEffect } from "react";
import "./App.css";
import ProgressBar from "./ProgressBar";

const TimerApp: React.FC = () => {
  const [seconds, setSeconds] = useState<string>("0");
  const [initialSeconds, setinItialSeconds] = useState<string>("60");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && +seconds > 0) {
      timer = setInterval(() => {
        const currentSeconds = +seconds;
        if (currentSeconds === 0) {
          clearInterval(timer);
          setIsRunning(false);
          alert("タイマーが終了しました");
        } else {
          setSeconds((currentSeconds - 1).toString());
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const handleStartToggle = () => {
    if (!isRunning && isValidTime()) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
    setinItialSeconds(seconds);
    setIsPaused(false);
  };
  const handleReStartToggle = () => {
    if (!isRunning && isValidTime()) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
    setIsPaused(false);
  };
  const handlePauseToggle = () => {
    if (!isRunning && isValidTime()) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
    setIsPaused(true);
  };

  const handleReset = () => {
    setSeconds(initialSeconds);
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleChangeSeconds = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(+value)) {
      setSeconds(value);
      setErrorMessage("数字を入力してください");
    } else {
      setSeconds(value);
      setErrorMessage("");
    }
  };

  const isValidTime = () => {
    if (+seconds <= 0 || 60 * 60 <= +seconds || isNaN(+seconds)) {
      setErrorMessage("無効な時間です");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  return (
    <div
      className="timer-body"
      style={{
        height: 400,
        width: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 200,
          height: 200,
          margin: "auto",
        }}
      >
        <ProgressBar
          percentage={(+seconds / +initialSeconds) * 100}
          radius={100}
          strokeWidth={10}
        />
        <input
          type="text"
          value={seconds}
          onChange={handleChangeSeconds}
          disabled={isRunning}
          style={{
            background: "none",
            border: "none",
            outline: "none",
            display: "flex",
            textAlign: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            borderRadius: "50%",
            fontSize: "2.5em",
          }}
        />
      </div>
      <div
        className="buttons"
        style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
      >
        {isPaused ? (
          <button onClick={handleReStartToggle} disabled={isRunning}>
            リスタート
          </button>
        ) : (
          <button onClick={handleStartToggle} disabled={isRunning}>
            スタート
          </button>
        )}
        <button onClick={handlePauseToggle} disabled={!isRunning}>
          一時停止
        </button>
        <button onClick={handleReset} disabled={!isRunning}>
          リセット
        </button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default TimerApp;
