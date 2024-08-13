"use client";
import { useEffect, useState } from "react";
import { Container, BackgroundProgressBar, ProgressBarContent } from "./styles";

export function ProgressBar() {
  const [progressWidth, setProgressWidth] = useState(0);
  const [passedMinutes, setPassedMinutes] = useState(0);

  const totalHours = 3600000;

  useEffect(() => {
    const calculateProgress = () => {
      setPassedMinutes((prevPassedMinutes) => prevPassedMinutes + 360000);
      const progress = (passedMinutes / totalHours) * 100;
      setProgressWidth(progress);
    };

    const intervalId = setInterval(calculateProgress, 3000);

    return () => clearInterval(intervalId);
  }, [passedMinutes, totalHours]);
  return (
    <Container>
      <BackgroundProgressBar>
        <ProgressBarContent style={{ width: `${progressWidth}%` }} />
      </BackgroundProgressBar>
    </Container>
  );
}
