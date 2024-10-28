import { LocalDirection } from ".";

export function transitIsSearchable(direction: LocalDirection) {
  return direction.waypoints.length >= 2;
}
