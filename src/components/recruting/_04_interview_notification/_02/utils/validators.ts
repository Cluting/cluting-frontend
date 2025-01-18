import { getDateKey } from "./date";

export interface ValidationError {
  type: "INCOMPLETE_DATE" | "INCOMPLETE_APPLICANTS";
  message: string;
  affectedApplicants?: number[];
}

export interface ValidateScheduleProps {
  interviewStartDate: Date | string;
  interviewEndDate: Date | string;
  getAllDatesInRange: (startDate: Date, endDate: Date) => Date[];
}

export const validateScheduleCompletion = (
  formData: ScheduleFormData,
  {
    interviewStartDate,
    interviewEndDate,
    getAllDatesInRange
  }: ValidateScheduleProps
): true | ValidationError => {
  // 제출된 날짜가 있는지 확인
  const submittedDates = Object.values(formData.groups).flatMap((group) =>
    Object.keys(group.dates)
  );

  if (submittedDates.length === 0) {
    return {
      type: "INCOMPLETE_DATE",
      message: "최소 하나의 날짜를 완료해 주세요."
    };
  }

  // 제출된 날짜들에 대해서만 검사
  for (const groupId in formData.groups) {
    const group = formData.groups[groupId];

    // 각 그룹의 제출된 날짜들만 검사
    for (const dateKey of Object.keys(group.dates)) {
      const dateData = group.dates[dateKey];

      // 날짜 데이터가 없거나 스케줄이 비어있는 경우
      if (!dateData || !dateData.schedules || dateData.schedules.length === 0) {
        return {
          type: "INCOMPLETE_DATE",
          message: "선택한 날짜의 스케줄을 모두 완료해 주세요."
        };
      }

      // 각 스케줄의 지원자가 비어있는지 확인
      const hasEmptySchedule = dateData.schedules.some(
        (schedule) => !schedule.applicants || schedule.applicants.length === 0
      );

      if (hasEmptySchedule) {
        return {
          type: "INCOMPLETE_DATE",
          message: "선택한 날짜의 스케줄을 모두 완료해 주세요."
        };
      }
    }
  }

  return true;
};

export const validateApplicantAssignment = (
  formData: ScheduleFormData,
  requiredCount: number
): true | ValidationError => {
  const incompleteApplicants: number[] = [];

  // 모든 그룹 순회
  Object.values(formData.groups).forEach((group) => {
    // 각 그룹의 모든 날짜를 순회
    Object.values(group.dates).forEach((date) => {
      date.schedules.forEach((schedule) => {
        if (schedule.applicants.length !== requiredCount) {
          schedule.applicants.forEach((applicant) => {
            const applicantId = Number(applicant);
            if (!incompleteApplicants.includes(applicantId)) {
              incompleteApplicants.push(applicantId);
            }
          });
        }
      });
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
