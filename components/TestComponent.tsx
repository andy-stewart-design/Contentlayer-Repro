import { useState } from "react";

const TestComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount((c) => (c += 1))}>
        Clicked {count} times
      </button>
    </>
  );
};

export default TestComponent;
