import TargetArrivalTimeChoice from "./components/TargetArrivalTimeChoice/TargetArrivalTimeChoice";
import useTimeCandidates from "./hooks/useTimeCandidates";
import { useEffect, useState } from "react";

// type Position = {
//   latitude: number;
//   longitude: number;
// };

type Waypoint = {
  name: string;
};

type WaypointTiming = {
  waypoint: Waypoint;
  // 停車時刻
  stop_time: Date;
};

type Schedule = WaypointTiming[];

type Timetable = {
  title: string;
  schedule: Schedule;
  waypoints: Waypoint[];
};

const targetArrivalTimeCandidates = [
  { name: "1限目", time: new Date(2024, 10, 26, 17, 0) },
  { name: "2限目", time: new Date(2024, 10, 26, 19, 0) },
  { name: "3限目", time: new Date(2024, 10, 26, 20, 0) },
];

const timetable: Timetable = {
  title: "My Timetable",
  schedule: [
    {
      stop_time: new Date(2023, 9, 26, 8, 0),
      waypoint: {
        name: "シャトルバス千歳",
      },
    },
  ],
};

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
          rawResp.json().then(setResp);
        }
      })
      .catch(console.error);
  }, [selected]);

  return (
    <>
      <TargetArrivalTimeChoice
        onPrevious={goToPrevious}
        onNext={goToNext}
        content={selected}
      />
      {resp && resp.toString()}
    </>
  );
}

export default App;
