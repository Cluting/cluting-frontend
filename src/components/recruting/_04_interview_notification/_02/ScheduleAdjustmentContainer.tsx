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
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { postSchedule, getSchedule } from "./service/ScheduleAdjustment";

export default function ScheduleAdjustmentContainer() {
  const queryClient = useQueryClient();
  const recruitId = 1;
  const [isEditMode, setIsEditMode] = useState(false);

  const handleButtonClick = () => {
    if (steps[1].completed && !isEditMode) {
      setIsEditMode(true);
    } else {
      onSubmit();
    }
  };
  //GET
  const { data: clubsData } = useQuery<ScheduleFormData[]>(
    ["mainClubs", recruitId],
    () => getSchedule(recruitId),
    {
      onSuccess: (data) => {
        console.log("4-2 GET 성공: ", data);
      },
      onError: (error) => {
        console.error("4-2 GET 실패:", error);
      }
    }
  );

  //POST
  const createFormMutation = useMutation(
    (data: { formData: ScheduleFormData; recruitId: number }) =>
      postSchedule(data.formData, data.recruitId),
    {
      onSuccess: (data) => {
        console.log("4-2 POST  성공:", data);
        // POST 성공 후 GET 쿼리 무효화 -> 새로운 데이터 자동 불러오기
        queryClient.invalidateQueries(["mainClubs", recruitId]);
        // handleStepTwoSubmit();
      },
      onError: (error) => {
        console.error("4-2 POST 실패:", error);
      }
    }
  );

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
              [`group${g.index + 1}`]: {
                groupName: g.name,
                dates: {}
              }
            }),
            {}
          )
        : {
            group1: {
              groupName: "공통",
              dates: {}
            }
          }
    },
    mode: "onBlur"
  });

  const generateTimeSlots = useCallback(() => {
    if (!isTimeSet) {
      // DEFAULT_TIME_SLOTS도 09:00 AM 형식으로 수정 필요
      return DEFAULT_TIME_SLOTS.map((time) => {
        const [rawTime, period] = time.split(" ");
        const [hours] = rawTime.split(":");
        return `${hours.padStart(2, "0")}:00 ${period}`;
      });
    }

    const startTime = new Date(interviewStartTime);
    const endTime = new Date(interviewEndTime);
    const slots: string[] = [];

    while (startTime <= endTime) {
      const hours = startTime.getHours();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = String(hours % 12 || 12).padStart(2, "0");
      slots.push(`${formattedHours}:00 ${ampm}`);
      startTime.setHours(startTime.getHours() + 1);
    }

    return slots;
  }, [interviewStartTime, interviewEndTime, isTimeSet]);

  const getOrCreateScheduleData = useCallback(
    (date: Date, groupId: number) => {
      return createScheduleData(
        dateScheduleMap,
        groupId,
        date,
        generateTimeSlots,
        interviewer
      );
    },
    [dateScheduleMap, generateTimeSlots, interviewer]
  );

  useEffect(() => {
    // 모든 그룹에 대해 첫 날짜의 데이터 초기화
    const firstDate = new Date(interviewStartDate);
    const dateKey = getDateKey(firstDate);

    group.forEach((g) => {
      if (!dateScheduleMap[`group${g.index}`]?.[dateKey]) {
        setDateScheduleMap((prev) => ({
          ...prev,
          [`group${g.index}`]: {
            ...prev[`group${g.index}`],
            [dateKey]: getOrCreateScheduleData(firstDate, g.index)
          }
        }));
      }
    });

    // 그룹이 없는 경우 default 그룹(0)에 대한 처리
    if (group.length === 0 && !dateScheduleMap["group0"]?.[dateKey]) {
      setDateScheduleMap((prev) => ({
        ...prev,
        group0: {
          ...prev["group0"],
          [dateKey]: getOrCreateScheduleData(firstDate, 0)
        }
      }));
    }
  }, [group, interviewStartDate, getOrCreateScheduleData]);

  useEffect(() => {
    const dateKey = getDateKey(currentDate);
    const currentSchedules = dateScheduleMap[selectedGroupId]?.[dateKey] || [];
    const currentSelections =
      dateSelectionsMap[selectedGroupId]?.[dateKey] || {};

    setValue("groups", {
      ...group.reduce(
        (acc, g) => ({
          ...acc,
          [`group${g.index}`]: {
            groupName: g.name,
            dates: {}
          }
        }),
        {}
      ),
      [`group${selectedGroupId}`]: {
        groupName:
          group.find((g) => g.index === selectedGroupId)?.name || "공통",
        dates: {
          [dateKey]: {
            schedules: currentSchedules.map((schedule) => ({
              time: schedule.time,
              interviewers: schedule.interviewer.map((interviewer) =>
                Number(interviewer)
              ),
              applicants: schedule.applicants
                .filter((applicant) =>
                  currentSelections[schedule.time]?.includes(applicant.id)
                )
                .map((applicant) => applicant.id)
            }))
          }
        }
      }
    });
    trigger();
  }, [
    currentDate,
    selectedGroupId,
    dateScheduleMap,
    dateSelectionsMap,
    group,
    setValue,
    trigger
  ]);

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

  const validateSchedules = useCallback(
    (formData: ScheduleFormData) => {
      // 두 가지 검증을 모두 실행
      const completionValidation = validateScheduleCompletion(formData, {
        interviewStartDate,
        interviewEndDate,
        getAllDatesInRange
      });
      const applicantValidation = validateApplicantAssignment(
        formData,
        interviewee
      );

      // 날짜 미완료 에러가 있을 경우
      if (completionValidation !== true) {
        setValidationError(completionValidation);
        return completionValidation.message;
      }

      // 지원자 배정 에러가 있을 경우
      if (applicantValidation !== true) {
        setValidationError(applicantValidation);
        return applicantValidation.message;
      }

      // 에러가 없는 경우
      setValidationError(null);
      return true;
    },
    [interviewee, interviewStartDate, interviewEndDate, getAllDatesInRange]
  );

  const handleApplicantSelect = useCallback(
    (time: string, applicantId: number) => {
      const dateKey = getDateKey(currentDate);
      const currentSelections =
        dateSelectionsMap[selectedGroupId]?.[dateKey]?.[time] || [];

      setDateSelectionsMap((prev) => {
        const prevSelections =
          prev[`group${selectedGroupId}`]?.[dateKey]?.[time] || [];

        // 이미 선택된 지원자인 경우 제거
        if (prevSelections.includes(applicantId)) {
          return {
            ...prev,
            [`group${selectedGroupId}`]: {
              ...prev[`group${selectedGroupId}`],
              [dateKey]: {
                ...prev[`group${selectedGroupId}`]?.[dateKey],
                [time]: prevSelections.filter((id) => id !== applicantId)
              }
            }
          };
        }

        // 새로운 지원자를 추가하되, interviewee 수를 초과하지 않도록
        if (prevSelections.length < interviewee) {
          return {
            ...prev,
            [`group${selectedGroupId}`]: {
              ...prev[`group${selectedGroupId}`],
              [dateKey]: {
                ...prev[`group${selectedGroupId}`]?.[dateKey],
                [time]: [...prevSelections, applicantId]
              }
            }
          };
        }

        return prev;
      });
    },
    [currentDate, dateSelectionsMap, selectedGroupId, interviewee]
  );

  const handleReset = useCallback(() => {
    const dateKey = getDateKey(currentDate);
    setDateSelectionsMap((prev) => ({
      ...prev,
      [`group${selectedGroupId}`]: {
        ...prev[`group${selectedGroupId}`],
        [dateKey]: {}
      }
    }));
    setValidationError(null);
  }, [currentDate, selectedGroupId]);

  // 먼저 제출 전에 데이터를 확인해보기 위한 로그 추가
  const onSubmit = handleSubmit((data: ScheduleFormData) => {
    const allDates = getAllDatesInRange(
      new Date(interviewStartDate),
      new Date(interviewEndDate)
    );

    const completeFormData: ScheduleFormData = {
      groups: group.length
        ? group.reduce((acc, g) => {
            const groupId = `${g.index + 1}`;
            const groupKeyForMap = `group${g.index + 1}`;

            return {
              ...acc,
              [groupId]: {
                groupName: g.name,
                dates: allDates.reduce<Record<string, any>>(
                  (datesAcc, date) => {
                    const dateKey = getDateKey(date);
                    const scheduleData =
                      dateScheduleMap[groupKeyForMap]?.[dateKey];
                    const selections =
                      dateSelectionsMap[groupKeyForMap]?.[dateKey] || {};

                    if (scheduleData) {
                      datesAcc[dateKey] = {
                        schedules: scheduleData.map((schedule) => ({
                          time: schedule.time.replace(/^(\d):/, "0$1:"),
                          interviewers: schedule.interviewer.map(
                            (interviewer) => Number(interviewer)
                          ),
                          applicants: schedule.applicants
                            .filter((applicant) =>
                              selections[schedule.time]?.includes(applicant.id)
                            )
                            .map((applicant) => applicant.id)
                        }))
                      };
                    }
                    return datesAcc;
                  },
                  {}
                )
              }
            };
          }, {})
        : {
            "1": {
              groupName: "공통",
              dates: allDates.reduce<Record<string, any>>((datesAcc, date) => {
                const dateKey = getDateKey(date);
                const scheduleData = dateScheduleMap["group1"]?.[dateKey];
                const selections = dateSelectionsMap["group1"]?.[dateKey] || {};

                if (scheduleData) {
                  datesAcc[dateKey] = {
                    schedules: scheduleData.map((schedule) => ({
                      time: schedule.time.replace(/^(\d):/, "0$1:"),
                      interviewers: schedule.interviewer.map((interviewer) =>
                        Number(interviewer)
                      ),
                      applicants: schedule.applicants
                        .filter((applicant) =>
                          selections[schedule.time]?.includes(applicant.id)
                        )
                        .map((applicant) => applicant.id)
                    }))
                  };
                }
                return datesAcc;
              }, {})
            }
          }
    };

    // 디버깅을 위한 로그 추가
    console.log("제출 데이터:", JSON.stringify(completeFormData, null, 2));
    console.log(
      "모든 날짜:",
      allDates.map((date) => getDateKey(date))
    );
    console.log(
      "현재 데이터가 있는 날짜들:",
      Object.keys(completeFormData.groups[group.length ? "1" : "1"].dates)
    );

    const validation = validateSchedules(completeFormData);
    if (validation !== true) {
      // 어떤 유효성 검사가 실패했는지 확인
      console.log("유효성 검사 실패:", validation);
      return;
    }

    createFormMutation.mutate({ formData: completeFormData, recruitId });
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
          if (!dateScheduleMap[`group${selectedGroupId}`]?.[dateKey]) {
            setDateScheduleMap((prev) => ({
              ...prev,
              [`group${selectedGroupId}`]: {
                ...prev[`group${selectedGroupId}`],
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
      <div
        className={`flex justify-between ${steps[1].completed && !isEditMode ? "pointer-events-none" : ""}`}
      >
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
      {validationError?.type === "INCOMPLETE_DATE" && (
        <div className="text-state-error">{validationError.message}</div>
      )}

      <GroupTabs
        group={group}
        selectedGroupId={selectedGroupId}
        onSelectGroup={setSelectedGroupId}
      />

      <ScheduleGrid
        scheduleData={
          dateScheduleMap[`group${selectedGroupId}`]?.[
            getDateKey(currentDate)
          ] || []
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
            steps[1].completed && !isEditMode
              ? "bg-main-400 border border-main-100 text-main-100"
              : "bg-main-100 text-white-100"
          } text-body flex-center hover:bg-main-500`}
        >
          {steps[1].completed && !isEditMode
            ? BUTTON_TEXT.EDIT
            : BUTTON_TEXT.COMPLETE}
        </button>
      </div>
    </form>
  );
}
