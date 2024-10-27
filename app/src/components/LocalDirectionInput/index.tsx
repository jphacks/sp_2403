import React from "react";
import { TripSchedulesEditor } from "../TripSchedulesEditor";
import { WaypointsEditor } from "../WaypointsEditor";
import { LocalGlobalConnectionInput } from "../LocalGlobalConnectionInput";
import {
  LocalDirection,
  LocalGlobalConnection,
  TripSchedule,
  Waypoint,
} from "../../model";
import { Stack } from "@mui/material";

interface LocalDirectionInputProps {
  direction: LocalDirection;
  onChange: (direction: LocalDirection) => void;
}

const LocalDirectionInput = ({
  direction,
  onChange,
}: LocalDirectionInputProps) => {
  const handleNameChange: React.FormEventHandler<HTMLInputElement> = (e) => {
    onChange({ ...direction, name: e.currentTarget.value });
  };

  const handleSchedulesChange = (updatedSchedules: TripSchedule[]) => {
    onChange({ ...direction, schedules: updatedSchedules });
  };

  const handleWaypointsChange = (updatedWaypoints: Waypoint[]) => {
    onChange({ ...direction, waypoints: updatedWaypoints });
  };

  const handleConnectionChange = (updatedConnection: LocalGlobalConnection) => {
    onChange({ ...direction, connection: updatedConnection });
  };

  return (
    <Stack spacing={5}>
      <WaypointsEditor
        waypoints={direction.waypoints}
        onChange={handleWaypointsChange}
      />

      <TripSchedulesEditor
        waypoints={direction.waypoints}
        schedules={direction.schedules}
        onChange={handleSchedulesChange}
      />

      <LocalGlobalConnectionInput
        connection={direction.connection}
        onChange={handleConnectionChange}
      />
    </Stack>
  );
};

export default LocalDirectionInput;
