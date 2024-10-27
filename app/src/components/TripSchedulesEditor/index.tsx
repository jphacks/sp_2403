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
    <>
      <button onClick={addSchedule}>便を追加する</button>
      <table>
        <thead>
          <tr>
            {waypoints.map((waypoint, i) => (
              <td>
                {waypoint.name}
                {i == 0 && "（接続駅）"}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <TripScheduleRowEditor
              key={schedule.uuid}
              schedule={schedule}
              waypoints={waypoints}
              onChange={onScheduleChange}
              onDelete={onScheduleDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
