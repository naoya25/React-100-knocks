import React, { useState, useEffect } from "react";

const TimerApp = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let timer;

    if (isRunning && (minutes > 0 || seconds > 0)) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            setIsRunning(false);
            // 通知の処理や効果音再生のコードを追加
            alert("タイマーが終了しました");
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds]);

  const handleStartPauseToggle = () => {
    if (!isRunning && isValidTime()) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
  };

  const handleChangeMinutes = (e) => {
    const value = parseInt(e.target.value, 10);
    setMinutes(isNaN(value) ? 0 : value);
  };

  const handleChangeSeconds = (e) => {
    const value = parseInt(e.target.value, 10);
    setSeconds(isNaN(value) ? 0 : value);
  };

  const isValidTime = () => {
    if (
      minutes < 0 ||
      seconds < 0 ||
      minutes >= 60 ||
      isNaN(minutes) ||
      isNaN(seconds)
    ) {
      setErrorMessage("無効な時間です");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  return (
    <div>
      <div>
        <label>
          分：
          <input type="number" value={minutes} onChange={handleChangeMinutes} />
        </label>
        <label>
          秒：
          <input type="number" value={seconds} onChange={handleChangeSeconds} />
        </label>
      </div>
      <button onClick={handleStartPauseToggle}>
        {isRunning ? "一時停止" : "スタート"}
      </button>
      <button onClick={handleReset}>リセット</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default TimerApp;
