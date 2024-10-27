import useTimeCandidates from "./hooks/useTimeCandidates";
import React, { useEffect, useState } from "react";
import { formatDateToHM, LocalDirection, Waypoint } from "./model";
import LocalDirectionInput from "./components/LocalDirectionInput";
import { requiredGlobalPlaceArrivalTimes } from "./model/requiredGlobalPlaceArrivalTimes";
import { generateDate } from "./model/date";
import TargetArrivalTimeChoice from "./components/TargetArrivalTimeChoice/TargetArrivalTimeChoice";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

// type Position = {
//   latitude: number;
//   longitude: number;
// };

const targetArrivalTimeCandidates = [
  { name: "1限目", time: generateDate(17, 0) },
  { name: "2限目", time: generateDate(19, 0) },
  { name: "3限目", time: generateDate(20, 0) },
];

function App() {
  const { selected, goToPrevious, goToNext } = useTimeCandidates(
    targetArrivalTimeCandidates
  );

  const [destination, setDestination] = useState<Waypoint | null>(null);
  const [direction, setDirection] = useState<LocalDirection>({
    connection: {
      globalPlace: "",
      delayMinutes: 0,
    },
    name: "",
    schedules: [],
    waypoints: [],
  });

  const arrivalTimes = destination
    ? requiredGlobalPlaceArrivalTimes(
        {
          destination: destination,
          targetArrivalTime: selected.time,
        },
        direction
      )
    : [];
  console.log(arrivalTimes);

  const onDestinationChange: React.FormEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const destination = direction.waypoints.find(
      (waypoint) => waypoint.uuid == e.currentTarget.value
    );
    if (destination) setDestination(destination);
  };

  const [depaturePlace, setDepaturePlace] = useState("");

  const [requiredDepatureTimes, setRequiredDepatureTimes] = useState<string>(
    []
  );

  useEffect(() => {
    if (destination && direction.waypoints.length && depaturePlace)
      Promise.all(
        arrivalTimes.map(async (arrivalTime) => {
          const resp = await fetch(
            `http://localhost:8000/get_route?start=${depaturePlace}&time=${formatDateToHM(
              arrivalTime
            )}&goal=${direction.waypoints[0].name}`,
            { method: "GET", mode: "cors" }
          );
          const json = await resp.json();
          console.log(json);
          const depatureTimes = json.routes.map((route) => route[0]);
          return depatureTimes;
        })
      ).then((depatureTimes) => {
        console.log(depatureTimes);
        setRequiredDepatureTimes(depatureTimes);
      });
  }, [destination, depaturePlace, arrivalTimes, direction]);

  return (
    <Stack spacing={6}>
      {/* @ts-expect-error 型定義をしていないため */}
      <LocalDirectionInput direction={direction} onChange={setDirection} />

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            検索条件
          </Typography>
          <Stack spacing={3}>
            <TargetArrivalTimeChoice
              onPrevious={goToPrevious}
              onNext={goToNext}
              content={selected}
            />
            {direction.waypoints.length ? (
              <select onChange={onDestinationChange}>
                {direction.waypoints.map((waypoint) => (
                  <option key={waypoint.uuid} value={waypoint.uuid}>
                    {waypoint.name}
                  </option>
                ))}
              </select>
            ) : null}
            <TextField
              onBlur={(e) => setDepaturePlace(e.currentTarget.value)}
              placeholder="現在地の最寄り駅を入力"
            />
          </Stack>
        </CardContent>
      </Card>

      <ul>
        {arrivalTimes.map((time) => (
          <li key={time.toString()}>{time.toString()}</li>
        ))}
      </ul>
      <ul>
        {requiredDepatureTimes.map((time) => (
          <li key={time}>{time}</li>
        ))}
      </ul>
    </Stack>
  );
}

export default App;
