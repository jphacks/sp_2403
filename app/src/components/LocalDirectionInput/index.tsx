import { TripSchedulesEditor } from "../TripSchedulesEditor";
import { WaypointsEditor } from "../WaypointsEditor";
import { LocalGlobalConnectionInput } from "../LocalGlobalConnectionInput";
import {
  LocalDirection,
  LocalGlobalConnection,
  TripSchedule,
  Waypoint,
} from "../../model";
import { Button, Stack } from "@mui/material";
import { useState } from "react";

interface LocalDirectionInputProps {
  initialValue: LocalDirection;
  onCommit: (direction: LocalDirection) => void;
}

const LocalDirectionInput = ({
  onCommit,
  initialValue,
}: LocalDirectionInputProps) => {
  const [direction, setDirection] = useState<LocalDirection>(initialValue);

  const handleSchedulesChange = (updatedSchedules: TripSchedule[]) => {
    setDirection({ ...direction, schedules: updatedSchedules });
  };

  const handleWaypointsChange = (updatedWaypoints: Waypoint[]) => {
    setDirection({ ...direction, waypoints: updatedWaypoints });
  };

  const handleConnectionChange = (updatedConnection: LocalGlobalConnection) => {
    setDirection({ ...direction, connection: updatedConnection });
  };

  return (
    <Stack spacing={5}>
      <WaypointsEditor
        waypoints={direction.waypoints}
        onChange={handleWaypointsChange}
      />

      {direction.waypoints.length ? (
        <TripSchedulesEditor
          waypoints={direction.waypoints}
          schedules={direction.schedules}
          onChange={handleSchedulesChange}
        />
      ) : null}

      <LocalGlobalConnectionInput
        connection={direction.connection}
        onChange={handleConnectionChange}
      />

      <Button variant="contained" onClick={() => onCommit(direction)}>
        保存する
      </Button>
    </Stack>
  );
};

export default LocalDirectionInput;
