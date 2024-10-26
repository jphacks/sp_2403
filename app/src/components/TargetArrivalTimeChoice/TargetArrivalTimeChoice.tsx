export type TargetArrivalTimeCandidate = {
  name: string;
  time: Date;
};

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
      <button onClick={onPrevious}>&lt;</button>
      <div style={{ margin: "0 10px", textAlign: "center" }}>
        <p>{content.name}</p>
        <p>
          {content.time.getHours().toString().padStart(2, "0")}:
          {content.time.getMinutes().toString().padStart(2, "0")}
        </p>
      </div>
      <button onClick={onNext}>&gt;</button>
    </div>
  );
}
