import { useState } from "react";
import { LocalDirection } from "./model";
import LocalDirectionInput from "./components/LocalDirectionInput";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Fab,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { TransitSearch } from "./components/TransitSearch";
import { transitIsSearchable } from "./model/transitIsSearchable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { generateWaypoint } from "./model/waypoint";

// type Position = {
//   latitude: number;
//   longitude: number;
// };

function App() {
  // const [requiredDepatureTimes, setRequiredDepatureTimes] = useState<string>();

  // useEffect(() => {
  //   if (destination && direction.waypoints.length && depaturePlace)
  //     Promise.all(
  //       arrivalTimes.map(async (arrivalTime) => {
  //         const resp = await fetch(
  //           `http://localhost:8000/get_route?start=${depaturePlace}&time=${formatDateToHM(
  //             arrivalTime
  //           )}&goal=${direction.waypoints[0].name}`,
  //           { method: "GET", mode: "cors" }
  //         );
  //         const json = await resp.json();
  //         console.log(json);
  //         const depatureTimes = json.routes.map((route) => route[0]);
  //         return depatureTimes;
  //       })
  //     ).then((depatureTimes) => {
  //       console.log(depatureTimes);
  //       setRequiredDepatureTimes(depatureTimes);
  //     });
  // }, [destination, depaturePlace, arrivalTimes, direction]);

  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<LocalDirection>({
    connection: {
      globalPlace: "",
      delayMinutes: 0,
    },
    name: "",
    schedules: [],
    waypoints: [generateWaypoint("停留所1"), generateWaypoint("停留所2")],
  });

  const handleLocalDirectionCommit = (inputtedDirection: LocalDirection) => {
    setOpen(false);
    setDirection(inputtedDirection);
  };

  const requiredDepatureTimes = ["11:10", "20:20"];

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          margin: "0 1rem 1rem 0",
          right: "0",
          bottom: "0",
        }}
      >
        <Fab color="primary" size="large" onClick={() => setOpen(true)}>
          <CalendarMonthIcon />
        </Fab>
      </Box>
      <Modal onClose={() => {}} open={open}>
        <Paper
          elevation={3}
          sx={{
            width: "90%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "1rem",
          }}
        >
          <LocalDirectionInput
            initialValue={direction}
            onCommit={handleLocalDirectionCommit}
          />
        </Paper>
      </Modal>

      <Box sx={{ padding: "1rem" }}>
        <Stack spacing={2}>
          {transitIsSearchable(direction) ? (
            <TransitSearch direction={direction} />
          ) : null}
          <Divider />

          <Stack spacing={1}>
            {requiredDepatureTimes.map((time) => (
              <Card key={time}>
                <CardContent>
                  <Stack alignItems="center">
                    <Typography variant="h5">{time}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default App;
