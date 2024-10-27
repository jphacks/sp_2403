import { TextField } from "@mui/material";
import { LocalGlobalConnection } from "../../model";

interface LocalGlobalConnectionInputProps {
  connection: LocalGlobalConnection;
  onChange: (updatedConnection: LocalGlobalConnection) => void;
}

export function LocalGlobalConnectionInput({
  connection,
  onChange,
}: LocalGlobalConnectionInputProps) {
  const handleGlobalPlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...connection, globalPlace: e.target.value });
  };

  const handleDelayMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...connection, delayMinutes: Number(e.target.value) });
  };

  return (
    <TextField
      label=" 最寄り駅から接続バス停まで"
      type="number"
      value={connection.delayMinutes}
      onChange={handleDelayMinutesChange}
      placeholder="15"
    />
  );
}
