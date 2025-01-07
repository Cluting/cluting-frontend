export interface PrepStage {
  stageName: string;
  stageOrder: number;
  clubUserIds: number[];
}

// 캘린더 이벤트 - 리크루팅 홈, 계획하기
export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  backgroundColor?: string; // 색상 속성 추가
}

export interface RecruitSchedule {
  stage1Start: string;
  stage1End: string;
  stage2Start: string;
  stage2End: string;
  stage3Start: string;
  stage3End: string;
  stage4Start: string;
  stage4End: string;
  stage5Start: string;
  stage5End: string;
  stage6Start: string;
  stage6End: string;
  stage7Start: string;
  stage7End: string;
  stage8Start: string;
  stage8End: string;
}

export interface PrepareStepRolesFormValues {
  prepStages: PrepStage[];
  recruitSchedules: RecruitSchedule;
  applicantGroups: string[];
}

// 계획하기 불러오기
export interface PrepareStepRolesFormValues {
  prepStages: PrepStage[];
  recruitSchedules: RecruitSchedule;
  applicantGroups: string[];
}

export interface RecruitmentPlanningData {
  schedule: RecruitSchedule;
  prepStages: Array<{
    stageName: string;
    adminNames: string[];
  }>;
  groups: string[];
  admins: string[];
}
