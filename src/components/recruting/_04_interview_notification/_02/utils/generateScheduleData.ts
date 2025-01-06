import { INTERVIEWER_NAMES } from "../constants/interview";

export const generateScheduleDataUtil = (
  timeSlots: string[]
): ScheduleData[] => {
  return timeSlots.map((time) => ({
    interviewer: [...INTERVIEWER_NAMES]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 2),
    time,
    applicants: Array(Math.floor(Math.random() * 8) + 5)
      .fill(null)
      .map((_, index) => ({
        id: index,
        name: `지원자${index + 1}`
      }))
  }));
};
