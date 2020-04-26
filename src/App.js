import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const START_TIME = 2;
  const [text, setText] = useState("");
  const [timereremain, settimereremain] = useState(START_TIME);
  const [isplay, setisplay] = useState(false);
  const [wordcount, setWordcount] = useState(0);
  const TextRef = useRef(null);

  function startGame() {
    setisplay(true);
    settimereremain(START_TIME);
    setText("");
    TextRef.current.disabled = false;
    TextRef.current.focus();
  }

  function endGame() {
    setisplay(false);
    setWordcount(textcount(text));
  }

  function handleChange(event) {
    const { value } = event.target;
    setText(value);
  }

  function textcount(text) {
    const number = text.split(" ");
    return number.filter((num) => num !== "").length;
  }

  useEffect(() => {
    if (isplay && timereremain > 0) {
      setTimeout(() => {
        settimereremain((time) => time - 1);
      }, 1000);
    } else if (timereremain === 0) {
      endGame();
    }
  }, [timereremain, isplay]);

  return (
    <div>
      <h1>How fast do you Type?</h1>
      <textarea
        ref={TextRef}
        disabled={!isplay}
        value={text}
        onChange={handleChange}
      />
      <h2>Time remaining : {timereremain} </h2>
      <button onClick={startGame} disabled={isplay}>
        Start
      </button>
      <h1>Word count : {wordcount} </h1>
    </div>
  );
}
