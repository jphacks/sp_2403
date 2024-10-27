export function updatedArray<T>(arr: T[], to: T, condition: (x: T) => boolean) {
  return arr.map((elm) => (!condition(elm) ? elm : to));
}
