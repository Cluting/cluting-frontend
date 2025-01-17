import { INTERVIEWER_NAMES } from "../constants/interview";

export const generateScheduleDataUtil = (
  timeSlots: string[],
  interviewerCount: number
): ScheduleData[] => {
  return timeSlots.map((time) => ({
    interviewer: [...INTERVIEWER_NAMES]
      .sort(() => Math.random() - 0.5)
      .slice(0, interviewerCount)
      .map((interviewer) => interviewer.id), // 이제 interviewer.id를 반환
    time,
    applicants: Array(Math.floor(Math.random() * 8) + 5)
      .fill(null)
      .map((_, index) => ({
        id: index,
        name: `지원자${index + 1}`
      }))
  }));
};
