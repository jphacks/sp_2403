import { IconButton, Stack, Typography } from "@mui/material";
import { formatDateToHM, TargetArrivalTimeCandidate } from "../../model";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";

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
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      justifyContent="space-around"
    >
      <IconButton onClick={onPrevious}>
        <ArrowBackIosIcon />
      </IconButton>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body1">{content.name}</Typography>
        <Typography variant="body1">{formatDateToHM(content.time)}</Typography>
        <IconButton size="small">
          <EditIcon />
        </IconButton>
      </Stack>
      <IconButton onClick={onNext}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Stack>
  );
}
