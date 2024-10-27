import {
  Button,
  Card,
  CardContent,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import { Waypoint } from "../../model";

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
    const newWaypoint: Waypoint = { name: "", uuid: crypto.randomUUID() };
    onChange([...waypoints, newWaypoint]);
  };

  // Waypointの削除
  const handleRemoveWaypoint = (index: number) => {
    const updatedWaypoints = waypoints.filter((_, i) => i !== index);
    onChange(updatedWaypoints);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          バス停留所
        </Typography>
        {!waypoints.length ? (
          <Typography variant="body1" gutterBottom>
            まだ停留所が登録されていません。
          </Typography>
        ) : null}
        <Stack spacing={1}>
          {waypoints.map((waypoint, index) => (
            <div key={waypoint.uuid}>
              <Input
                type="text"
                value={waypoint.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder="停留所名"
              />
              <Button onClick={() => handleRemoveWaypoint(index)}>×</Button>
            </div>
          ))}
        </Stack>
        <Button onClick={handleAddWaypoint} variant="outlined">
          追加する
        </Button>
      </CardContent>
    </Card>
  );
}
