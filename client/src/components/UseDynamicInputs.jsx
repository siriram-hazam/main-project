import { useRef } from "react";

const UseDynamicInputs = () => {
  const containerRef = useRef(null);

  const addInput = () => {
    const newInput = document.createElement("input");
    newInput.className =
      "placeholder-gray-500 ml-3 border rounded-md px-3 pl-2 py-0.5 box-border";
    newInput.type = "text";
    newInput.placeholder = "กรอกข้อมูล";
    newInput.style = "minWidth: 200px; maxWidth: 75%; marginBottom: 0.5rem;";
    containerRef.current.appendChild(newInput);
  };

  return { containerRef, addInput };
};

export default UseDynamicInputs;
