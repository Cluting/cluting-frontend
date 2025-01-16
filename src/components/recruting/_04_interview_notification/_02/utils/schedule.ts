import { generateScheduleDataUtil } from "./generateScheduleData";
import { getDateKey } from "./date";

export const createScheduleData = (
  dateScheduleMap: GroupScheduleMap,
  groupId: number,
  date: Date,
  generateTimeSlots: () => string[],
  interviewerCount: number
) => {
  const dateKey = getDateKey(date);
  if (!dateScheduleMap[groupId]?.[dateKey]) {
    return generateScheduleDataUtil(generateTimeSlots(), interviewerCount);
  }
  return dateScheduleMap[groupId][dateKey];
};
