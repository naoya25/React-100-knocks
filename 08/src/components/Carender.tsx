"use client";

import React, { useState, useEffect } from "react";
import {
  format,
  addDays,
  subDays,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  getDay,
} from "date-fns";
import { ja } from "date-fns/locale";

const Calendar: React.FC = () => {
  const [calendarDates, setCalendarDates] = useState<Date[][]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<
    Array<{ id: number; name: string; timestamp: Date }>
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    generateCalendarDates(currentMonth);
  }, [currentMonth]);

  const generateCalendarDates = (month: Date) => {
    let startDate = startOfMonth(month);
    startDate = subDays(startDate, getDay(startDate) - 1);
    const endDate = endOfMonth(month);
    const dates: Date[][] = [];
    let week: Date[] = [];

    for (
      let date = new Date(startDate);
      date <= endDate;
      date = addDays(date, 1)
    ) {
      week.push(date);

      if (week.length === 7) {
        dates.push([...week]);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(addDays(week[week.length - 1], 1));
      }
      dates.push([...week]);
    }

    setCalendarDates(dates);
  };

  const getBackgroundColor = (date: Date, currentMonth: Date): string => {
    if (date.toDateString() === new Date().toDateString()) {
      return "skyblue";
    } else if (date.getMonth() !== currentMonth.getMonth()) {
      return "grey";
    } else if (date.getDay() == 0 || date.getDay() === 6) {
      return "orange";
    } else {
      return "transparent";
    }
  };

  const handleAddTask = () => {
    const maxId = tasks.reduce((max, t) => (t.id > max ? t.id : max), 0);
    setTasks([
      ...tasks,
      { id: maxId + 1, name: task, timestamp: selectedDate },
    ]);

    setTask("");
    setShowModal(false);
  };
  const handleDeleteTask = (id: number) => {
    const newTasks = tasks.filter((e) => e.id !== id);
    setTasks(newTasks);
  };

  return (
    <div>
      <div
        style={{
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "blue",
          color: "white",
          borderRadius: 5,
        }}
      >
        <div style={{ backgroundColor: "black", padding: 10, borderRadius: 5 }}>
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            last month
          </button>
        </div>
        <div>{format(currentMonth, "MMMM yyyy")}</div>
        <div style={{ backgroundColor: "black", padding: 10, borderRadius: 5 }}>
          <button onClick={() => setCurrentMonth(new Date())}>
            this month
          </button>
        </div>
        <div style={{ backgroundColor: "black", padding: 10, borderRadius: 5 }}>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            next month
          </button>
        </div>
      </div>

      <table style={{ width: "80%", margin: "auto", marginTop: 20 }}>
        <thead>
          <tr>
            {["月", "火", "水", "木", "金", "土", "日"].map((e) => (
              <th
                style={{
                  padding: 5,
                  border: "1px solid black",
                  textAlign: "center",
                }}
              >
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarDates.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((date, index) => (
                <td
                  key={index}
                  style={{
                    width: "14%",
                    padding: 10,
                    border: "1px solid gray",
                    textAlign: "center",
                    backgroundColor: getBackgroundColor(date, currentMonth),
                  }}
                >
                  <p
                    onClick={() => {
                      setShowModal(true);
                      setSelectedDate(date);
                    }}
                  >
                    {date.getMonth() === currentMonth.getMonth()
                      ? format(date, "d", { locale: ja })
                      : format(date, "M/d", { locale: ja })}
                  </p>
                  {tasks
                    .filter(
                      (task) =>
                        task.timestamp.toDateString() === date.toDateString()
                    )
                    .map((task, index) => (
                      <p key={index} style={{ display: "flex" }}>
                        <div>{task.name}</div>
                        <button onClick={() => handleDeleteTask(task.id)}>
                          &times;
                        </button>
                      </p>
                    ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div
          style={{
            width: "250px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            padding: "20px",
            zIndex: "1000",
          }}
        >
          <p>イベントを追加</p>
          <p>{format(selectedDate, "yyyy-MM-dd")}</p>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="イベント名"
          />{" "}
          <div>
            <button onClick={handleAddTask} style={{ width: "90%" }}>
              保存
            </button>
            <button
              onClick={() => setShowModal(false)}
              style={{ width: "90%" }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "999",
          }}
        ></div>
      )}
    </div>
  );
};

export default Calendar;
