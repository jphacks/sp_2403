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
    <div>
      <label>
        Global Place:
        <input
          type="text"
          value={connection.globalPlace}
          onChange={handleGlobalPlaceChange}
          placeholder="Enter global place"
        />
      </label>
      <label>
        Delay Minutes:
        <input
          type="number"
          value={connection.delayMinutes}
          onChange={handleDelayMinutesChange}
          placeholder="Enter delay in minutes"
        />
      </label>
    </div>
  );
}
