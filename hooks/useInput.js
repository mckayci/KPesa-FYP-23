import { useState } from "react";

const useInput = (initialValue) => {
  const [value, SetValue] = useState(initialValue);

  const handleChange = (event) => {
    SetValue(event.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};
export default useInput;
