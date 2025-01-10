declare interface ScheduleData {
  interviewer: number[];
  time: string;
  applicants: { id: number; name: string }[]; // 내부 로직용
}
declare interface GroupScheduleMap {
  [groupId: number]: {
    [date: string]: ScheduleData[];
  };
}

declare interface GroupSelectionsMap {
  [groupId: number]: {
    [date: string]: {
      [timeSlot: string]: number[];
    };
  };
}

declare interface ScheduleFormData {
  groups: {
    [groupId: number]: {
      groupName: string;
      dates: {
        [date: string]: {
          schedules: {
            time: string;
            interviewers: number[];
            applicants: number[]; //id로 받기
          }[];
        };
      };
    };
  };
}

declare type DateDirection = "prev" | "next";

declare interface ValidationError {
  type: "INCOMPLETE_DATE" | "INCOMPLETE_APPLICANTS";
  message: string;
  affectedApplicants?: number[]; // 미확정 지원자 ID 저장
}
