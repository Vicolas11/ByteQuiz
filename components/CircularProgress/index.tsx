import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const CircularProgress = ({
  progress,
  total,
}: {
  progress: number;
  total: number;
}) => {
  const [offset, setOffset] = useState(0);
  const size = 40;
  const strokeWidth = 4;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((total - progress) / total) * circumference;
    setOffset(progressOffset);
  }, [progress, circumference, offset, total]);

  return (
    <svg className={styles.container} width={size} height={size}>
      <circle
        className={styles.circle_1}
        strokeWidth={strokeWidth}
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
      />
      <circle
        className={styles.circle_2}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        className={styles.text}
      >
        {`${progress}`}
      </text>
    </svg>
  );
};

export default CircularProgress;
