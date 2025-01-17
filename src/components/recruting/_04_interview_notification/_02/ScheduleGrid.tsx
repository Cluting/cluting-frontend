//스케줄 그리드 표시 컴포넌트

import { memo, useCallback } from "react";
import { TimeSlot } from "./TimeSlot";
import { ApplicantButton } from "./ApplicantButton";
import { INTERVIEWER_NAMES } from "./constants/interview";

interface ScheduleGridProps {
  scheduleData: ScheduleData[];
  dateSelectionsMap: GroupSelectionsMap;
  selectedGroupId: number;
  currentDate: Date;
  interviewee: number;
  onApplicantSelect: (time: string, applicantId: number) => void;
  error?: ValidationError;
  getDateKey: (date: Date) => string;
}

export const ScheduleGrid = memo(
  ({
    scheduleData,
    dateSelectionsMap,
    selectedGroupId,
    currentDate,
    interviewee,
    onApplicantSelect,
    error,
    getDateKey
  }: ScheduleGridProps) => {
    const isTimeSlotComplete = useCallback(
      (time: string) => {
        const dateKey = getDateKey(currentDate);
        return (
          (dateSelectionsMap[`group${selectedGroupId}`]?.[dateKey]?.[time]
            ?.length || 0) === interviewee
        );
      },
      [currentDate, dateSelectionsMap, selectedGroupId, interviewee, getDateKey]
    );

    const isApplicantSelected = useCallback(
      (time: string, applicantId: number) => {
        const dateKey = getDateKey(currentDate);
        return (
          dateSelectionsMap[`group${selectedGroupId}`]?.[dateKey]?.[
            time
          ]?.includes(applicantId) || false
        );
      },
      [currentDate, dateSelectionsMap, selectedGroupId, getDateKey]
    );

    const getInterviewerNames = useCallback((interviewerIds: number[]) => {
      return interviewerIds.map(
        (id) =>
          INTERVIEWER_NAMES.find((interviewer) => interviewer.id === id)
            ?.name || ""
      );
    }, []);

    return (
      <div>
        <div
          className={
            "w-full h-auto bg-gray-50 border rounded-[6.65px] border-gray-200"
          }
        >
          <div className="grid grid-cols-[235px_60px_1fr] bg-gray-100 border-b border-gray-200 font-semibold text-gray-800">
            <div className="py-3">면접관</div>
            <div className="py-3">시간</div>
            <div className="py-3">지원자</div>
          </div>

          <div className="p-4">
            {scheduleData.map((schedule) => (
              <div
                key={schedule.time}
                className="grid grid-cols-[320px_1fr] items-start mb-4"
              >
                <TimeSlot
                  time={schedule.time}
                  interviewer={getInterviewerNames(schedule.interviewer)}
                  isComplete={isTimeSlotComplete(schedule.time)}
                />
                <div className="flex flex-wrap gap-2">
                  {schedule.applicants.map((applicant) => {
                    const isSelected = isApplicantSelected(
                      schedule.time,
                      applicant.id
                    );
                    const isDisabled =
                      !isSelected &&
                      (dateSelectionsMap[`group${selectedGroupId}`]?.[
                        getDateKey(currentDate)
                      ]?.[schedule.time]?.length || 0) >= interviewee;

                    return (
                      <ApplicantButton
                        key={`${schedule.time}-${applicant.id}`}
                        applicant={applicant}
                        isSelected={isSelected}
                        isDisabled={isDisabled}
                        onClick={() =>
                          onApplicantSelect(schedule.time, applicant.id)
                        }
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        {error?.type === "INCOMPLETE_APPLICANTS" && (
          <div className="text-state-error">{error.message}</div>
        )}
      </div>
    );
  }
);

ScheduleGrid.displayName = "ScheduleGrid";
