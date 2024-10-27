import React from "react";
import { GlobalRoute } from "../../model";
import { Input, Typography } from "@mui/material";

interface GlobalRouteInputProps {
  route: GlobalRoute;
  onChange: (value: GlobalRoute) => void;
}

export function GlobalRouteInput({ route, onChange }: GlobalRouteInputProps) {
  const handleChange: React.FormEventHandler<HTMLInputElement> = (e) => {
    onChange({ ...route, depaturePlaceName: e.currentTarget.value });
  };

  return (
    <div>
      <label htmlFor="departureStation">
        <Typography>出発地</Typography>
      </label>
      <Input
        type="text"
        id="departureStation"
        value={route.depaturePlaceName}
        onChange={handleChange}
        placeholder="駅名を入力してください"
      />
    </div>
  );
}
