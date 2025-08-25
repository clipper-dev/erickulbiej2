import React from "react";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import styles from './FancyButton.module.css'

function FancyButton({ children, clicked, type }: any) {
  return (
    <div
      className={[
        styles.buttonWrapper,
        "flex justify-center px-5 py-2 cursor-pointer transition-all rounded-lg lg:text-lg",
      ].join(" ")}
    >
      <div className="flex flex-row justify-center items-center gap-1">
        {type === "right" && (
          <>
            <FaArrowRight className={styles.arrowLeft} />
            <span
              className={[
                styles.label,
                " text-sm lg:text-lg font-bold flex",
              ].join(" ")}
            >
              {children}
            </span>
            <FaArrowRight className={styles.arrowRight} />
          </>
        )}
        {type === "up" && (
          <>
            <FaArrowDown className={styles.arrowLeft} />
            <span
              className={[
                styles.label,
                "text-sm lg:text-lg font-bold flex",
              ].join(" ")}
            >
              {children}
            </span>
            <FaArrowDown className={styles.arrowRight} />
          </>
        )}
      </div>
    </div>
  );
}

export default FancyButton;
