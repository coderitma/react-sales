import { useState } from "react";

const useCoreHookHandleInput = (dataProvider) => {
  const [getter, setter] = useState(dataProvider);

  const handler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setter((values) => ({ ...values, [name]: value }));
  };

  return [getter, setter, handler];
};

export default useCoreHookHandleInput;
