import React, { useState } from 'react';

const useRecord = (init) => {
  const [current, setCurrent] = useState(init);
  const [actions, setActions] = useState([init]);
  const [count, setCount] = useState(0);

  const undo = () => {
    if (count <= 0) return;
    setActions((prevActions) => {
      const arr = [prevActions[prevActions.length - 1], ...prevActions];
      arr.pop();
      setCurrent(arr[arr.length - 1]);
      setCount((oldCount) => oldCount - 1);
      return arr;
    });
  };

  const redo = () => {
    if (count >= actions.length - 1) return;
    setActions((prevActions) => {
      const arr = [...prevActions, prevActions[0]];
      arr.shift();
      setCurrent(arr[arr.length - 1]);
      setCount((oldCount) => oldCount + 1);
      return arr;
    });
  };

  const record = (color) => {
    setActions((prevActions) => [...prevActions, color]);
    setCurrent(color);
    setCount((oldCount) => oldCount + 1);
  };

  return {
    current,
    undo,
    redo,
    record,
  };
};

function App() {
  const { current, undo, redo, record } = useRecord('#FF0000');

  return (
    <>
      <button role="undo" onClick={undo}>
        undo
      </button>
      <button role="redo" onClick={redo}>
        redo
      </button>
      <input
        type="color"
        role="input"
        value={current}
        onChange={({ target }) => record(target.value)}
      />
      <div
        style={{ backgroundColor: current, width: '250px', height: '250px' }}
      ></div>
    </>
  );
}

export default App;
