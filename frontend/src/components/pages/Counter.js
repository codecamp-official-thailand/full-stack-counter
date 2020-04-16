import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

function Counter() {
  const [counter, setCounter] = useState(0);

  const fetchData = async () => {
    const result = await axios.get("/counters");
    setCounter(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickSetCounter = async (counter) => {
    const body = {
      counter,
    };
    await axios.put("/counters", body);
    fetchData();
  };

  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={() => onClickSetCounter(Number(counter) + 1)}>Up</button>
      <button onClick={() => onClickSetCounter(Number(counter) - 1)}>
        Down
      </button>
      <button onClick={() => onClickSetCounter(0)}>Reset</button>
    </div>
  );
}

export default Counter;
