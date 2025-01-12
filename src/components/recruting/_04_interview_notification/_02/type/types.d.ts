declare interface ScheduleData {
  interviewer: number[];
  time: string;
  applicants: { id: number; name: string }[]; // 내부 로직용
}
declare interface GroupScheduleMap {
  [groupId: string]: {
    [date: string]: ScheduleData[];
  };
}

declare interface GroupSelectionsMap {
  [groupId: string]: {
    [date: string]: {
      [timeSlot: string]: number[];
    };
  };
}

//폼 데이터
declare interface ScheduleFormData {
  groups: {
    [groupId: string]: {
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
