import { Waypoint } from "../../model";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

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
    <div>

      <h3>Waypoints</h3>
      {waypoints.map((waypoint, index) => (
        <tr>
        <td>
        <div key={waypoint.uuid}>

          
    
          <input
            type="text"
            value={waypoint.name}
            onChange={(e) => handleNameChange(index, e.target.value)}
            placeholder="Waypoint name"
          />

          
          <IconButton
          onClick={() => handleRemoveWaypoint(index)}><DeleteIcon /></IconButton>
        </div>
      </td>
      </tr>
        
      ))}
      <button onClick={handleAddWaypoint}>Add Waypoint</button>
    </div>
  );
}
