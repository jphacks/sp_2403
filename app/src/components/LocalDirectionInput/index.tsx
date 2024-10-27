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
    <div>
      <TripSchedulesEditor
        waypoints={direction.waypoints}
        schedules={direction.schedules}
        onChange={handleSchedulesChange}
      />

      <WaypointsEditor
        waypoints={direction.waypoints}
        onChange={handleWaypointsChange}
      />

      <LocalGlobalConnectionInput
        connection={direction.connection}
        onChange={handleConnectionChange}
      />
    </div>
  );
};

export default LocalDirectionInput;
