import React from "react";

interface ProgressBarCircleProps {
  progress: number;
}

const ProgressBarCircle: React.FC<ProgressBarCircleProps> = ({ progress }) => {
  const circumference = 2 * Math.PI * 45; // Assuming the radius of the circle is 45

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative mx-6">
      <svg
        className="w-full -rotate-90"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <circle
          className="text-primary-foreground opacity-20"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="6"
          fill="transparent"
        />
        <circle
          className="text-primary"
          cx="50"
          cy="50"
          r="45"
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-lg font-bold">
        {progress}%
      </span>
    </div>
  );
};

export { ProgressBarCircle };
