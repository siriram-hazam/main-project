// TextScramble.js
import React, { useState, useEffect } from "react";

const TextScramble = ({ text, duration = 50 }) => {
  const [displayText, setText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const scrambleInterval = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (index < currentIndex) return char;
          return "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[
            Math.floor(Math.random() * 36)
          ];
        })
        .join("");

      setText(scrambled);

      if (currentIndex > text.length) {
        clearInterval(scrambleInterval);
        setText(text);
      }
      currentIndex += 1;
    }, duration);

    return () => clearInterval(scrambleInterval);
  }, [text, duration]);

  return <span>{displayText}</span>;
};

export default TextScramble;
