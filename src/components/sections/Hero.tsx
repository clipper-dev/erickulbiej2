"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import FancyButton from "../buttons/FancyButton";

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
    <div className="w-full flex flex-col pt-16 pb-2 items-center">
      {/* desktop */}
      <div className=" hidden w-full lg:flex flex-row gap-4 items-center justify-center">
        <div className="flex flex-[2]">
          <div className=" rounded-full rounded-tl-none rounded-bl-none overflow-hidden relative w-full aspect-square">
            <Image
              src="/res/eric.jpg"
              fill
              objectFit="cover"
              alt="eric kulbiej profile picture"
            />
          </div>
        </div>
        <div className="flex flex-col items-start lg:p-0 lg:items-start gap-4 items-left flex-[3] text-2xl lg:text-6xl font-bold">
          <div className="flex flex-col">
            <span className="">Hi, it&apos;s Eric 👋</span>
            <span>
              I&apos;m a{" "}
              <span className="text-indigo-600">{displayedText}</span>
            </span>
          </div>
          <span className="font-normal text-neutral-500 text-sm lg:text-lg max-w-[50ch]">
            If you want to learn about my projects or read my blog on
            productivity, you have come to the right place.
          </span>
          <div className="flex flex-row gap-4">
            <FancyButton type="up">
              <Link href="#projects">See projects</Link>
            </FancyButton>
            <FancyButton type="right">
              <Link href="/blog">Read Blog</Link>
            </FancyButton>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className=" lg:hidden w-full flex flex-col gap-4">
        {/* divide into two equal parts using grid */}
        <div className="grid grid-cols-6 gap-2">
          <div className="rounded-full rounded-tl-none rounded-bl-none overflow-hidden relative w-full aspect-square col-span-2">
            <Image
              src="/res/eric.jpg"
              fill
              style={{ objectFit: "cover" }}
              alt="eric kulbiej profile picture"
            />
          </div>
          <div className="flex flex-col items-start justify-center lg:p-0 lg:items-start items-left flex-[3] text-3xl lg:text-6xl font-bold col-span-4">
            <span className="">Hi, it&apos;s Eric 👋</span>
            <span>
              I&apos;m a{" "}
              <span className="text-indigo-600">{displayedText}</span>
            </span>
          </div>
        </div>
        <span className="mx-2 font-normal text-neutral-500 text-sm lg:text-lg max-w-[50ch]">
          If you want to learn about my projects or read my blog on
          productivity, you have come to the right place.
        </span>
        <div className="flex flex-row gap-4 mx-2">
          <FancyButton type="up">
            <Link href="#projects">See projects</Link>
          </FancyButton>
          <FancyButton type="right">
            <Link href="/blog">Read Blog</Link>
          </FancyButton>
        </div>
      </div>
    </div>
  );
}

export default Hero;
