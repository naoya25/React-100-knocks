import React, { useState } from 'react';
import './Counter.css';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <div className="card">
        <h3 className="display-text">React Counter</h3>
        <h1 className="count-display">{count}</h1>
        <div className="button-container">
          <button className="increment-button" onClick={() => setCount(count + 1)}>+</button>
          <button className="decrement-button" onClick={() => setCount(count - 1)}>-</button>
        </div>
      </div>
    </div>
  );
}

export default Counter;
