import React from "react";

interface ProgressBarProps {
  percentage: number;
  radius: number;
  strokeWidth: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  radius,
  strokeWidth,
}) => {
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      style={{ transform: `rotate(-90deg)` }}
    >
      <circle
        stroke="#d2d3d4"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#0000ff"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default ProgressBar;
