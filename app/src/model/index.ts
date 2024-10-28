export type Waypoint = {
  name: string;
  uuid: string;
};

export type LocalGlobalConnection = {
  globalPlace: string;
  delayMinutes: number;
};

export type TripSchedule = {
  timing: {
    [uuid in string]: Date;
  };
  uuid: string;
};

export type TargetArrivalTimeCandidate = {
  name: string;
  time: Date;
};

export type LocalDirection = {
  name: string;
  schedules: TripSchedule[];
  waypoints: Waypoint[];
  connection: LocalGlobalConnection;
};

export type GlobalRoute = {
  depaturePlaceName: string;
};

export type TransitRequirement = {
  globalRoute: GlobalRoute;
  localDirection: LocalDirection;
  selectedTargetArrivalTime: TargetArrivalTimeCandidate;
};

export function formatDateToHM(date: Date) {
  return `${date.getUTCHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

export function isWaypointsEqual(a: Waypoint, b: Waypoint) {
  return a.name == b.name;
}
