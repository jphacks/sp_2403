import useTimeCandidates from "./hooks/useTimeCandidates";
import React, { useEffect, useState } from "react";
import { LocalDirection, Waypoint } from "./model";
import LocalDirectionInput from "./components/LocalDirectionInput";
import { requiredGlobalPlaceArrivalTimes } from "./model/requiredGlobalPlaceArrivalTimes";
import { generateDate } from "./model/date";
import TargetArrivalTimeChoice from "./components/TargetArrivalTimeChoice/TargetArrivalTimeChoice";

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

  /**
   * API Request And Save to state.
   */
  const [resp, setResp] = useState(null);
  useEffect(() => {
    fetch(
      `http://localhost:5174/api?time=${selected.time}&name=${selected.name}`,
      { method: "GET", mode: "no-cors" }
    )
      .then((rawResp) => {
        if (rawResp.status == 200) {
          // rawResp.json().then(setResp);
        }
      })
      .catch(console.error);
  }, [selected]);

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

  return (
    <>
      <TargetArrivalTimeChoice
        onPrevious={goToPrevious}
        onNext={goToNext}
        content={selected}
      />
      {resp && resp.toString()}
      <LocalDirectionInput direction={direction} onChange={setDirection} />
      <select onChange={onDestinationChange}>
        {direction.waypoints.map((waypoint) => (
          <option key={waypoint.uuid} value={waypoint.uuid}>
            {waypoint.name}
          </option>
        ))}
      </select>
      <ul>
        {arrivalTimes.map((time) => (
          <li key={time.toString()}>{time.toString()}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
