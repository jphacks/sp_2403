import dayjs from "dayjs";

export function generateDate(hour: number, minute: number) {
  return dayjs().startOf("date").hour(hour).minute(minute).toDate();
}
