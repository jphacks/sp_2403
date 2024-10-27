import React from "react";
import { formatDateToHM, TripSchedule, Waypoint } from "../../model";

interface TripScheduleRowEditor {
  schedule: TripSchedule;
  waypoints: Waypoint[];
  onChange: (schedule: TripSchedule) => void;
  onDelete: (schedule: TripSchedule) => void;
}

export function TripScheduleRowEditor({
  schedule,
  waypoints,
  onChange,
  onDelete,
}: TripScheduleRowEditor) {
  const makeChangeHandler =
    (waypoint: Waypoint) => (e: React.FormEvent<HTMLInputElement>) => {
      const date = e.currentTarget?.valueAsDate;
      if (!date) return;

      const updatedSchedules: TripSchedule = {
        ...schedule,
        timing: {
          ...schedule.timing,
          [waypoint.uuid]: date,
        },
      };

      onChange(updatedSchedules);
    };

  const displayTiming = (waypoint: Waypoint) => {
    const timing = schedule.timing[waypoint.uuid];

    return (
      <td key={waypoint.uuid}>
        <input
          type="time"
          value={timing ? formatDateToHM(timing) : ""}
          onChange={makeChangeHandler(waypoint)}
          required
        />
      </td>
    );
  };

  return (
    <tr>
      {waypoints.map(displayTiming)}
      <td>
        <input
          type="button"
          onClick={() => onDelete(schedule)}
          value="削除する"
        />
      </td>
    </tr>
  );
}
