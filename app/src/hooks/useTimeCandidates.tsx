import { useState } from "react";
import { TargetArrivalTimeCandidate } from "../model";

function useTimeCandidates(targetArrivalTimes: TargetArrivalTimeCandidate[]) {
  const [index, setIndex] = useState(0);

  const selected = targetArrivalTimes[index];

  const goToPrevious = () => {
    setIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : targetArrivalTimes.length - 1
    );
  };

  const goToNext = () => {
    setIndex((prevIndex) =>
      prevIndex < targetArrivalTimes.length - 1 ? prevIndex + 1 : 0
    );
  };

  return {
    selected,
    goToPrevious,
    goToNext,
  };
}

export default useTimeCandidates;
