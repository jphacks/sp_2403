import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TripSchedule, Waypoint } from "../../model";
import { updatedArray } from "../../utils/updatedArray";
import { TripScheduleRowEditor } from "../TripScheduleRowEditor";

interface TripSchedulesEditorProps {
  schedules: TripSchedule[];
  waypoints: Waypoint[];
  onChange: (schedules: TripSchedule[]) => void;
}

export function TripSchedulesEditor({
  schedules,
  waypoints,
  onChange,
}: TripSchedulesEditorProps) {
  const onScheduleChange = (schedule: TripSchedule) => {
    const updatedSchedules = updatedArray(
      schedules,
      schedule,
      (elm) => elm.uuid == schedule.uuid
    );
    onChange(updatedSchedules);
  };

  const addSchedule = () => {
    onChange([
      ...schedules,
      {
        uuid: crypto.randomUUID(),
        timing: {},
      },
    ]);
  };

  const onScheduleDelete = (schedule: TripSchedule) => {
    onChange(schedules.filter((s) => s.uuid != schedule.uuid));
  };

  return (
    <Stack spacing={3} alignItems="flex-start">
      <Typography variant="h6">時刻表</Typography>
      <Table>
        <TableHead>
          <TableRow>
            {waypoints.map((waypoint, i) => (
              <TableCell key={waypoint.uuid}>
                {waypoint.name}
                {i == 0 && "（接続駅）"}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {schedules.map((schedule) => (
            <TripScheduleRowEditor
              key={schedule.uuid}
              schedule={schedule}
              waypoints={waypoints}
              onChange={onScheduleChange}
              onDelete={onScheduleDelete}
            />
          ))}
        </TableBody>
      </Table>
      <Button onClick={addSchedule} variant="outlined">
        便を追加する
      </Button>
    </Stack>
  );
}
