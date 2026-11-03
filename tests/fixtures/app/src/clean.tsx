import { useState } from "react";

type CounterProps = {
  label: string,
  start?: number
};

export function Counter({ label, start = 0 }: CounterProps) {
  const [count, setCount] = useState(start);

  return (
    <button
      type="button"
      onClick={() => setCount(count + 1)}
    >
      {label}
      {count}
    </button>
  );
}
