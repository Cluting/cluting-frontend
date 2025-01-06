import { generateScheduleDataUtil } from "./generateScheduleData";
import { getDateKey } from "./date";

export const createScheduleData = (
  dateScheduleMap: GroupScheduleMap,
  groupId: number,
  date: Date,
  generateTimeSlots: () => string[]
) => {
  const dateKey = getDateKey(date);
  if (!dateScheduleMap[groupId]?.[dateKey]) {
    return generateScheduleDataUtil(generateTimeSlots());
  }
  return dateScheduleMap[groupId][dateKey];
};
