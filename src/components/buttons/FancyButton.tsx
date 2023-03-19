import React from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./FancyButton.module.css";

function FancyButton({ children, clicked }: any) {
  return (
    <div
      className={[
        styles.buttonWrapper,
        "flex justify-center px-5 py-2 cursor-pointer transition-all rounded-lg",
      ].join(" ")}
    >
      <div className="flex flex-row justify-center items-center gap-1">
        <FaArrowRight className={styles.arrowLeft} />
        <span className={[styles.label, "text-lg font-bold flex"].join(" ")}>
          {children}
        </span>
        <FaArrowRight className={styles.arrowRight} />
      </div>
    </div>
  );
}

export default FancyButton;
