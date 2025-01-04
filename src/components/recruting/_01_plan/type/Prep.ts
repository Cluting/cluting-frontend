export interface PrepStage {
  stageName: string;
  stageOrder: number;
  clubUserIds: number[];
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
