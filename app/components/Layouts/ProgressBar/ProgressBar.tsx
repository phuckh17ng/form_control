"use client";

import { LinearProgress, styled } from "@mui/material";
import { useEffect, useState } from "react";

const CustomizedProgressBar = styled(LinearProgress)`
  background: rgb(var(--color-text) / 50%);

  .MuiLinearProgress-barColorPrimary {
    background-color: rgb(var(--color-text));
  }
`;

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 100;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[9999]">
      <CustomizedProgressBar variant="determinate" value={progress} />
    </div>
  );
};

export default ProgressBar;
