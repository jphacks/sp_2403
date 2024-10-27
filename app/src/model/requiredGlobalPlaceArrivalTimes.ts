import { LocalDirection, Waypoint } from ".";
import dayjs from "dayjs";

type UserInput = {
  destination: Waypoint;
  targetArrivalTime: Date;
};

function minutesAgo(date: Date, minute: number) {
  return dayjs(date).subtract(minute, "minute").toDate();
}

function isBefore(date: Date, compareTo: Date) {
  return date.getTime() < compareTo.getTime();
}

export function requiredGlobalPlaceArrivalTimes(
  input: UserInput,
  direction: LocalDirection
) {
  if (!direction.waypoints.length) return [];

  const schedulesHasDestination = direction.schedules.filter(
    (schedule) => schedule.timing[input.destination.uuid]
  );
  console.log(schedulesHasDestination);

  const connectionWaypoint = direction.waypoints[0];

  const schedulesConnectableGlobal = schedulesHasDestination.filter(
    (schedule) => schedule.timing[connectionWaypoint.uuid]
  );
  console.log(schedulesConnectableGlobal);
  console.log(input.targetArrivalTime);

  const schedulesArrivalInTimeDestination = schedulesConnectableGlobal.filter(
    (schedule) =>
      isBefore(schedule.timing[input.destination.uuid], input.targetArrivalTime)
  );
  console.log(schedulesArrivalInTimeDestination);

  const lastWaypointTimes = schedulesArrivalInTimeDestination.map(
    (schedule) => schedule.timing[connectionWaypoint.uuid]
  );

  const globalPlaceArrivalTimes = lastWaypointTimes.map((time) =>
    minutesAgo(time, direction.connection.delayMinutes)
  );

  return globalPlaceArrivalTimes;
}
