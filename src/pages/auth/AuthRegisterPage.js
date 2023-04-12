import React, { useState, useCallback } from "react";

const AuthRegisterPage = () => {
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);
  const incrementNumber = useCallback(() => {
    setNumber(number + 1);
  }, [number]);
  const incrementCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <Show label="s 1" val={number} />
      <Button label="b 1" action={incrementNumber} />
      <Show label="s 2" val={count} />
      <Button label="b 2" action={incrementCount} />
    </div>
  );
};

const Show = React.memo(({ label, val }) => {
  console.log(`${label} inside show render`);
  return (
    <div>
      <div>
        {label} {val}
      </div>
    </div>
  );
});

const Button = React.memo(({ label, action }) => {
  console.log(`${label} inside button render`);
  return (
    <div>
      <button onClick={action}>add {label}</button>
    </div>
  );
});

export default AuthRegisterPage;
