import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { LocalDirection, Waypoint } from "../../model";
import { useState } from "react";
import TargetArrivalTimeChoice from "../TargetArrivalTimeChoice/TargetArrivalTimeChoice";
import useTimeCandidates from "../../hooks/useTimeCandidates";
import { requiredGlobalPlaceArrivalTimes } from "../../model/requiredGlobalPlaceArrivalTimes";
import { generateDate } from "../../model/date";

interface TransitSearchProps {
  direction: LocalDirection;
}

const targetArrivalTimeCandidates = [
  { name: "1限目", time: generateDate(17, 0) },
  { name: "2限目", time: generateDate(19, 0) },
  { name: "3限目", time: generateDate(20, 0) },
];

export function TransitSearch({ direction }: TransitSearchProps) {
  const [depaturePlace, setDepaturePlace] = useState("");
  const [destination, setDestination] = useState<Waypoint>(
    direction.waypoints[0]
  );

  const onDestinationChange = (e: SelectChangeEvent) => {
    const destination = direction.waypoints.find(
      (waypoint) => waypoint.uuid == e.target.value
    );
    if (destination) setDestination(destination);
  };

  const { selected, goToPrevious, goToNext } = useTimeCandidates(
    targetArrivalTimeCandidates
  );

  const arrivalTimes = destination
    ? requiredGlobalPlaceArrivalTimes(
        {
          destination: destination,
          targetArrivalTime: selected.time,
        },
        direction
      )
    : [];
  console.log(arrivalTimes);

  return (
    <Stack alignItems="stretch" spacing={2}>
      <TextField
        label="いまどこにいる？"
        onChange={(e) => setDepaturePlace(e.currentTarget.value)}
        placeholder="札幌"
        value={depaturePlace}
        size="small"
      />
      <FormControl>
        <InputLabel id="destination-label">どの停留所に行く？</InputLabel>
        <Select
          onChange={onDestinationChange}
          value={destination.uuid}
          label="どの停留所に行く？"
          labelId="destination-label"
        >
          {direction.waypoints.map((waypoint) => (
            <MenuItem key={waypoint.uuid} value={waypoint.uuid}>
              {waypoint.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TargetArrivalTimeChoice
        onPrevious={goToPrevious}
        onNext={goToNext}
        content={selected}
      />
    </Stack>
  );
}
