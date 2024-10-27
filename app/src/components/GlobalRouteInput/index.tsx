import React from "react";
import { GlobalRoute } from "../../model";

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
      <label htmlFor="departureStation">出発地: </label>
      <input
        type="text"
        id="departureStation"
        value={route.depaturePlaceName}
        onChange={handleChange}
        placeholder="駅名を入力してください"
      />
    </div>
  );
}
