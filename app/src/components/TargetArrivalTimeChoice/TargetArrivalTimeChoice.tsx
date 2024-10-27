import { Button } from "@mui/material";
import { formatDateToHM, TargetArrivalTimeCandidate } from "../../model";

interface TargetArrivalTimeChoiceProps {
  content: TargetArrivalTimeCandidate;
  onPrevious: () => void;
  onNext: () => void;
}

export default function TargetArrivalTimeChoice({
  content,
  onPrevious,
  onNext,
}: TargetArrivalTimeChoiceProps) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button onClick={onPrevious} variant="contained">
        &lt;
      </Button>
      <div style={{ margin: "0 10px", textAlign: "center" }}>
        <p>{content.name}</p>
        <p>{formatDateToHM(content.time)}</p>
      </div>
      <Button onClick={onNext} variant="contained">
        &gt;
      </Button>
    </div>
  );
}
