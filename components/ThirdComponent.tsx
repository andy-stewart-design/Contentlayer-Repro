import { useState } from "react";
import SecondComponent from "./SecondComponent";

const TestComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <SecondComponent />
      <button onClick={() => setCount((c) => (c += 1))}>
        Clicked {count} times
      </button>
    </>
  );
};

export default TestComponent;
