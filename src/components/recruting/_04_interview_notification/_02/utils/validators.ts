// validators.ts
export interface ValidationError {
  type: "INCOMPLETE_DATE" | "INCOMPLETE_APPLICANTS";
  message: string;
  affectedApplicants?: number[]; // 미확정 지원자 ID 저장
}

export const validateScheduleCompletion = (
  dates: ScheduleFormData["dates"]
): true | ValidationError => {
  const hasIncompleteSchedules = Object.values(dates).some((date) =>
    date.schedules.some((schedule) => schedule.applicants.length === 0)
  );

  if (hasIncompleteSchedules) {
    return {
      type: "INCOMPLETE_DATE",
      message: "모든 날짜를 완료해 주세요."
    };
  }
  return true;
};

export const validateApplicantAssignment = (
  dates: ScheduleFormData["dates"],
  requiredCount: number
): true | ValidationError => {
  const incompleteApplicants: number[] = [];

  Object.values(dates).forEach((date) => {
    date.schedules.forEach((schedule) => {
      if (schedule.applicants.length !== requiredCount) {
        schedule.applicants.forEach((applicant) => {
          if (!incompleteApplicants.includes(Number(applicant))) {
            incompleteApplicants.push(Number(applicant));
          }
        });
      }
    });
  });

  if (incompleteApplicants.length > 0) {
    return {
      type: "INCOMPLETE_APPLICANTS",
      message:
        "아직 면접 일정이 확정되지 않은 지원자가 있습니다. 해당 지원자를 포함해 면접 일정을 조정해 주세요.",
      affectedApplicants: incompleteApplicants
    };
  }
  return true;
};
