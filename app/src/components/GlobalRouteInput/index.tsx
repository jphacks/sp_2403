import { ChangeEventHandler } from "react";
import { GlobalRoute } from "../../model";
import { TextField, Typography } from "@mui/material";

interface GlobalRouteInputProps {
  route: GlobalRoute;
  onChange: (value: GlobalRoute) => void;
}

export function GlobalRouteInput({ route, onChange }: GlobalRouteInputProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange({ ...route, depaturePlaceName: e.target.value });
  };

  return (
    <div>
      <label htmlFor="departureStation">
        <Typography>出発地</Typography>
      </label>
      <TextField
        type="text"
        id="departureStation"
        value={route.depaturePlaceName}
        onChange={handleChange}
        placeholder="駅名を入力してください"
      />
    </div>
  );
}
