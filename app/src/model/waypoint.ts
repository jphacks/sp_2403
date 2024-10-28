import { Waypoint } from ".";

export function generateWaypoint(name: string): Waypoint {
  return {
    name,
    uuid: crypto.randomUUID(),
  };
}
