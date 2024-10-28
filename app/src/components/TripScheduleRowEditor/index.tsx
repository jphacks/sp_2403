import React from "react";
import { formatDateToHM, TripSchedule, Waypoint } from "../../model";
import { generateDate } from "../../model/date";
import { Button, TableCell, TableRow } from "@mui/material";
import styles from "./index.module.css";

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
      <TableCell key={waypoint.uuid}>
        <input
          type="time"
          value={timing ? formatDateToHM(timing) : ""}
          onChange={makeChangeHandler(waypoint)}
          required
          className={styles.time}
        />
      </TableCell>
    );
  };

  return (
    <TableRow>
      {waypoints.map(displayTiming)}
      <TableCell>
        <Button
          variant="outlined"
          onClick={() => onDelete(schedule)}
          size="small"
        >
          削除する
        </Button>
      </TableCell>
    </TableRow>
  );
}
