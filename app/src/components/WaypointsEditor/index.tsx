import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Waypoint } from "../../model";
import { generateWaypoint } from "../../model/waypoint";

interface WaypointsEditorProps {
  waypoints: Waypoint[];
  onChange: (updatedWaypoints: Waypoint[]) => void;
}

export function WaypointsEditor({ waypoints, onChange }: WaypointsEditorProps) {
  // Waypoint名の変更
  const handleNameChange = (index: number, newName: string) => {
    const updatedWaypoints = [...waypoints];
    updatedWaypoints[index] = { ...updatedWaypoints[index], name: newName };
    onChange(updatedWaypoints);
  };

  // Waypointの追加
  const handleAddWaypoint = () => {
    const newWaypoint: Waypoint = generateWaypoint("");
    onChange([...waypoints, newWaypoint]);
  };

  // Waypointの削除
  const handleRemoveWaypoint = (index: number) => () => {
    const updatedWaypoints = waypoints.filter((_, i) => i !== index);
    onChange(updatedWaypoints);
  };

  return (
    <section>
      <Stack spacing={2}>
        <Typography variant="h6" gutterBottom>
          バス停留所
        </Typography>
        {!waypoints.length ? (
          <Typography variant="body1" gutterBottom>
            まだ停留所が登録されていません。
          </Typography>
        ) : null}
        <Stack spacing={1} alignItems="flex-start">
          <Stack spacing={1}>
            {waypoints.map((waypoint, index) => (
              <div key={waypoint.uuid}>
                <TextField
                  type="text"
                  value={waypoint.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder="停留所名"
                  size="small"
                />
                <IconButton onClick={handleRemoveWaypoint(index)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </Stack>
          <Button onClick={handleAddWaypoint} variant="outlined">
            追加する
          </Button>
        </Stack>
      </Stack>
    </section>
  );
}
