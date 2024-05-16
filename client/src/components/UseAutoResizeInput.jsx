import { useRef, useEffect } from "react";

const UseAutoResizeInput = () => {
  const inputRef = useRef(null);

  const resizeInput = () => {
    if (inputRef.current) {
      inputRef.current.style.width = "auto";
      inputRef.current.style.width = `${inputRef.current.scrollWidth}px`;
    }
  };

  useEffect(() => {
    resizeInput();
  }, []);

  return { inputRef, resizeInput };
};

export default UseAutoResizeInput;
