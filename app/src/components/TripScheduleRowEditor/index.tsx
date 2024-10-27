import React from "react";
import { formatDateToHM, TripSchedule, Waypoint } from "../../model";
import { generateDate } from "../../model/date";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


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
      const hourAndMinute = e.currentTarget?.valueAsDate;
      if (!hourAndMinute) return;

      const date = generateDate(
        hourAndMinute.getHours(),
        hourAndMinute.getMinutes()
      );

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
      <div>  
          <IconButton
          onClick={() => onDelete(schedule)}><DeleteIcon /></IconButton>
        </div>
      </td>
    </tr>
  );
}
