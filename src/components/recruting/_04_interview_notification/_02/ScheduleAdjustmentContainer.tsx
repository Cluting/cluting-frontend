import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useGroupStore,
  useInterviewStore,
  useStepFourStore
} from "../../../../store/useStore";
import { BUTTON_TEXT } from "../../../../constants/recruting";
import { DEFAULT_TIME_SLOTS } from "./constants/interview";
import { getDateKey } from "./utils/date";
import { DateNavigator } from "./DateNavigator";
import { GroupTabs } from "./GroupTabs";
import { ScheduleGrid } from "./ScheduleGrid";
import {
  validateScheduleCompletion,
  validateApplicantAssignment,
  ValidationError
} from "./utils/validators";
import { createScheduleData } from "./utils/schedule";

export default function ScheduleAdjustmentContainer() {
  const { group } = useGroupStore();
  const {
    interviewer,
    interviewee,
    interviewStartTime,
    interviewEndTime,
    interviewStartDate,
    interviewEndDate,
    isTimeSet
  } = useInterviewStore();
  const { steps } = useStepFourStore();

  const [selectedGroupId, setSelectedGroupId] = useState<number>(
    group[0]?.index || 0
  );
  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(interviewStartDate)
  );
  const [dateScheduleMap, setDateScheduleMap] = useState<GroupScheduleMap>({});
  const [dateSelectionsMap, setDateSelectionsMap] =
    useState<GroupSelectionsMap>({});
  const [validationError, setValidationError] =
    useState<ValidationError | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    trigger
  } = useForm<ScheduleFormData>({
    defaultValues: {
      groups: group.length
        ? group.reduce(
            (acc, g) => ({
              ...acc,
              [g.index]: {
                groupName: g.name,
                dates: {}
              }
            }),
            {}
          )
        : {
            0: {
              groupName: "공통",
              dates: {}
            }
          }
    }
  });

  const generateTimeSlots = useCallback(() => {
    if (!isTimeSet) return DEFAULT_TIME_SLOTS;

    const startTime = new Date(interviewStartTime);
    const endTime = new Date(interviewEndTime);
    const slots: string[] = [];

    while (startTime <= endTime) {
      slots.push(
        startTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        })
      );
      startTime.setHours(startTime.getHours() + 1);
    }

    return slots.length > 0 ? slots : DEFAULT_TIME_SLOTS;
  }, [interviewStartTime, interviewEndTime, isTimeSet]);

  const getAllDatesInRange = useCallback((startDate: Date, endDate: Date) => {
    const dates: Date[] = [];
    const endDateTime = new Date(endDate).getTime();
    const startDateTime = new Date(startDate).getTime();

    for (let time = startDateTime; time <= endDateTime; time += 86400000) {
      // 86400000ms = 1일
      dates.push(new Date(time));
    }

    return dates;
  }, []);

  useEffect(() => {
    const dateKey = getDateKey(currentDate);
    const currentSchedules = dateScheduleMap[selectedGroupId]?.[dateKey] || [];
    const currentSelections =
      dateSelectionsMap[selectedGroupId]?.[dateKey] || {};

    const schedules = currentSchedules.map((schedule) => ({
      time: schedule.time,
      interviewers: schedule.interviewer,
      applicants: schedule.applicants
        .filter((applicant) =>
          currentSelections[schedule.time]?.includes(applicant.id)
        )
        .map((applicant) => applicant.name)
    }));

    setValue(`groups.${selectedGroupId}.dates.${dateKey}`, { schedules });
    trigger();
  }, [
    currentDate,
    selectedGroupId,
    dateScheduleMap,
    dateSelectionsMap,
    group,
    generateTimeSlots,
    setValue,
    trigger
  ]);

  const getOrCreateScheduleData = useCallback(
    (date: Date, groupId: number) => {
      return createScheduleData(
        dateScheduleMap,
        groupId,
        date,
        generateTimeSlots
      );
    },
    [dateScheduleMap, generateTimeSlots]
  );

  const validateSchedules = useCallback(
    (dates: ScheduleFormData["dates"]) => {
      const completionValidation = validateScheduleCompletion(dates);
      const applicantValidation = validateApplicantAssignment(
        dates,
        interviewee
      );

      if (completionValidation !== true) {
        setValidationError(completionValidation);
        return completionValidation.message;
      }

      if (applicantValidation !== true) {
        setValidationError(applicantValidation);
        return applicantValidation.message;
      }

      setValidationError(null);
      return true;
    },
    [interviewee]
  );

  const handleApplicantSelect = useCallback(
    (time: string, applicantId: number) => {
      const dateKey = getDateKey(currentDate);
      const currentSelections =
        dateSelectionsMap[selectedGroupId]?.[dateKey]?.[time] || [];

      setDateSelectionsMap((prev) => ({
        ...prev,
        [selectedGroupId]: {
          ...prev[selectedGroupId],
          [dateKey]: {
            ...prev[selectedGroupId]?.[dateKey],
            [time]: currentSelections.includes(applicantId)
              ? currentSelections.filter((id) => id !== applicantId)
              : currentSelections.length < interviewee
                ? [...currentSelections, applicantId]
                : currentSelections
          }
        }
      }));
    },
    [currentDate, dateSelectionsMap, selectedGroupId, interviewee]
  );

  const handleReset = useCallback(() => {
    const dateKey = getDateKey(currentDate);
    setDateSelectionsMap((prev) => ({
      ...prev,
      [selectedGroupId]: {
        ...prev[selectedGroupId],
        [dateKey]: {}
      }
    }));
    setValidationError(null);
  }, [currentDate, selectedGroupId]);

  const onSubmit = handleSubmit((data: ScheduleFormData) => {
    const allDates = getAllDatesInRange(
      new Date(interviewStartDate),
      new Date(interviewEndDate)
    );

    const completeFormData: ScheduleFormData = {
      groups: group.length
        ? group.reduce((acc, g) => {
            const groupId = g.index;
            return {
              ...acc,
              [groupId]: {
                groupName: g.name,
                dates: allDates.reduce((datesAcc, date) => {
                  const dateKey = getDateKey(date);
                  const scheduleData = dateScheduleMap[groupId]?.[dateKey];
                  const selections =
                    dateSelectionsMap[groupId]?.[dateKey] || {};

                  if (scheduleData) {
                    datesAcc[dateKey] = {
                      schedules: scheduleData.map((schedule) => ({
                        time: schedule.time,
                        interviewers: schedule.interviewer,
                        applicants: schedule.applicants
                          .filter((applicant) =>
                            selections[schedule.time]?.includes(applicant.id)
                          )
                          .map((applicant) => applicant.name)
                      }))
                    };
                  }
                  return datesAcc;
                }, {})
              }
            };
          }, {})
        : {
            0: {
              groupName: "공통",
              dates: allDates.reduce((datesAcc, date) => {
                const dateKey = getDateKey(date);
                const scheduleData = dateScheduleMap[0]?.[dateKey];
                const selections = dateSelectionsMap[0]?.[dateKey] || {};

                if (scheduleData) {
                  datesAcc[dateKey] = {
                    schedules: scheduleData.map((schedule) => ({
                      time: schedule.time,
                      interviewers: schedule.interviewer,
                      applicants: schedule.applicants
                        .filter((applicant) =>
                          selections[schedule.time]?.includes(applicant.id)
                        )
                        .map((applicant) => applicant.name)
                    }))
                  };
                }
                return datesAcc;
              }, {})
            }
          }
    };

    const validation = validateSchedules(completeFormData);
    if (validation !== true) {
      return;
    }

    console.log(completeFormData);
  });

  const changeDate = useCallback(
    (direction: DateDirection) => {
      setCurrentDate((prevDate) => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));

        if (
          newDate >= new Date(interviewStartDate) &&
          newDate <= new Date(interviewEndDate)
        ) {
          const dateKey = getDateKey(newDate);
          if (!dateScheduleMap[selectedGroupId]?.[dateKey]) {
            setDateScheduleMap((prev) => ({
              ...prev,
              [selectedGroupId]: {
                ...prev[selectedGroupId],
                [dateKey]: getOrCreateScheduleData(newDate, selectedGroupId)
              }
            }));
          }
          return newDate;
        }
        return prevDate;
      });
    },
    [
      interviewStartDate,
      interviewEndDate,
      selectedGroupId,
      dateScheduleMap,
      getOrCreateScheduleData
    ]
  );

  return (
    <form onSubmit={onSubmit} className="mt-3">
      <div className="flex justify-between">
        <div className="flex-center gap-4">
          <DateNavigator
            currentDate={currentDate}
            interviewStartDate={new Date(interviewStartDate)}
            interviewEndDate={new Date(interviewEndDate)}
            onChangeDate={changeDate}
            error={
              validationError?.type === "INCOMPLETE_DATE"
                ? validationError
                : undefined
            }
          />
          <div className="tooltip text-main-100">
            구성은 면접관 {interviewer}:지원자 {interviewee}입니다. 지원자
            {interviewee}명을 확정해 주세요.
          </div>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex-center w-auto h-[36px] px-[11px] bg-main-300 border border-main-400 rounded-[6px] text-main-100"
        >
          <img
            src="/assets/ic-reset.svg"
            alt="기존 배치로 돌아가기"
            className="mr-2"
          />
          기존 배치로 돌아가기
        </button>
      </div>

      <GroupTabs
        group={group}
        selectedGroupId={selectedGroupId}
        onSelectGroup={setSelectedGroupId}
      />

      <input
        type="hidden"
        {...register("dates", {
          validate: validateSchedules
        })}
      />

      <ScheduleGrid
        scheduleData={
          dateScheduleMap[selectedGroupId]?.[getDateKey(currentDate)] || []
        }
        dateSelectionsMap={dateSelectionsMap}
        selectedGroupId={selectedGroupId}
        currentDate={currentDate}
        interviewee={interviewee}
        onApplicantSelect={handleApplicantSelect}
        error={
          validationError?.type === "INCOMPLETE_APPLICANTS"
            ? validationError
            : undefined
        }
        getDateKey={getDateKey}
      />

      <div className="flex justify-center">
        <button
          type="submit"
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
            steps[1].completed
              ? "bg-main-400 border border-main-100 text-main-100"
              : "bg-main-100 text-white-100"
          } text-body flex-center hover:bg-main-500`}
        >
          {steps[1].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
        </button>
      </div>
    </form>
  );
}
