"use client";
import React from "react";
import { useState } from "react";

function Hero() {
  const texts = ["developer", "researcher", "seafarer", "creator", "dreamer"];
  const [displayedText, setDisplayedText] = useState("");
  const [currentSubstring, setCurrentSubstring] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [waitBetweenLoops, setWaitBetweenLoops] = useState(3000);
  const [randomTries, setRandomTries] = useState(3);
  function handleType() {
    const i = index % texts.length;
    const fullText = texts[i];
    /* if isDeleting is equal to false then write one more character */
    if (isDeleting) {
      setDisplayedText(fullText.substring(0, displayedText.length - 1));
    } else {
      if (currentSubstring.length === fullText.length) {
        setDisplayedText(fullText);
        setCurrentSubstring("");
      } else {
        const randomTries = Math.floor(Math.random() * 3) + 3;
        if (loopNum < randomTries) {
          /* GET RANDOM LETTER OF THE ALPHABETH */
          const randomLetter = String.fromCharCode(
            Math.floor(Math.random() * 26) + 97
          );
          /* add the randomLetter at the end of the current text */
          setDisplayedText(currentSubstring + randomLetter);
          setLoopNum(loopNum + 1);
        } else {
          /* add the next letter of the current text */
          setCurrentSubstring(
            fullText.substring(0, currentSubstring.length + 1)
          );
          setDisplayedText(fullText.substring(0, currentSubstring.length + 1));
          setLoopNum(0);
        }
      }
    } /* setDisplayedText(
      isDeleting
        ? fullText.substring(0, displayedText.length - 1)
        : fullText.substring(0, displayedText.length + 1)
    ); */
    setTypingSpeed(isDeleting ? 50 : 50);
    if (!isDeleting && displayedText === fullText) {
      setTimeout(() => setIsDeleting(true), waitBetweenLoops);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setIndex(index + 1);
      setLoopNum(loopNum + 1);
    }
  }
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      handleType();
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isDeleting,
    index,
    loopNum,
    typingSpeed,
    waitBetweenLoops,
  ]);

  return (
    <div className="w-full flex flex-col py-20 items-center">
      <div className="max-w-screen-xl w-full flex flex-col items-left gap-4">
        <h1 className="text-6xl font-bold">Hi, it&apos;s Eric 👋</h1>
        <p className="text-6xl font-bold">
          I&apos;m a <span className="text-rose-600">{displayedText}</span>
        </p>
      </div>
    </div>
  );
}

export default Hero;
