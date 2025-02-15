// 5 - 면접관 일정 확인하기

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGroupStore, useInterviewStore } from "../../../../store/useStore";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from "@hello-pangea/dnd";

export default function AdminsSchedule() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setValue,
    trigger
  } = useForm<AdminsScheduleFormData>({
    defaultValues: { scheduleData: {} },
    mode: "onBlur"
  });

  // 각 시간대별 선택된 면접관을 관리하는 상태
  const [timeSlotAdmins, setTimeSlotAdmins] = useState<TimeSlotAdmins>({});
  // 시간대별 admin 상태를 관리
  const [timeSlotAdminsList, setTimeSlotAdminsList] = useState<
    Record<string, typeof admins>
  >({});
  //면접 기간
  const {
    interviewStartTime,
    interviewEndTime,
    interviewStartDate,
    interviewEndDate,
    interviewer
  } = useInterviewStore();

  //전역상태 그룹
  // const { group } = useGroupStore();
  const groupList = useGroupStore((state) => state.group) ?? []; // null/undefined 체크

  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(interviewStartDate)
  );

  useEffect(() => {
    // store의 전체 상태 확인
    const state = useGroupStore.getState();
    console.log("Store state:", state);
  }, []);

  // 1시간 간격의 시간 배열 생성
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const generateTimeSlots = () => {
    const startTime = new Date(interviewStartTime);
    const endTime = new Date(interviewEndTime);
    const slots: string[] = [];

    // 시작 시간부터 종료 시간까지 1시간 간격으로 timeSlots 배열 생성
    while (startTime <= endTime) {
      const timeString = startTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true // 12시간제로 설정
      });
      slots.push(timeString);
      startTime.setHours(startTime.getHours() + 1); // 1시간씩 증가
    }

    setTimeSlots(slots);
  };

  useEffect(() => {
    generateTimeSlots();
  }, [interviewStartTime, interviewEndTime]);

  //todo: 임원진도 임의로 써놨습니다!
  const [admins, setAdmins] = useState([
    { id: "1", name: "최예은" },
    { id: "2", name: "박시현" },
    { id: "3", name: "김동현" },
    { id: "4", name: "윤다인" },
    { id: "5", name: "곽서연" },
    { id: "6", name: "양성원" },
    { id: "7", name: "이은재" },
    { id: "8", name: "김은혜" }
  ]);

  // admin 배열을 면접관 수에 맞게 분할
  const distributeAdmins = () => {
    if (!groupList || groupList.length === 0) {
      console.log("GroupList is empty or invalid:", groupList); // 디버깅용

      return [[...admins]]; // groupList가 없거나 비어있으면 모든 admin을 하나의 그룹으로
    }
    const distributed = [];
    const adminsPerGroup = Math.floor(admins.length / groupList.length); // 그룹당 기본 admin 수
    const remainingAdmins = [...admins];

    // 각 그룹별로 admin 분배
    for (let i = 0; i < groupList.length; i++) {
      const groupAdmins = remainingAdmins.splice(0, adminsPerGroup);
      distributed.push(groupAdmins);
    }

    // 남은 admin이 있다면 추가 그룹으로 배치
    if (remainingAdmins.length > 0) {
      distributed.push(remainingAdmins);
    }

    return distributed;
  };
  const distributedAdmins = distributeAdmins();

  //드래그 앤 드랍 초기 설정
  const onDragEnd = (result: DropResult, timeSlot: string) => {
    const { destination, source } = result;
    if (!destination) return;

    setTimeSlotAdminsList((prev) => {
      const currentTimeSlotAdmins = [...(prev[timeSlot] || [])];

      // 드래그된 admin 찾기
      const draggedAdminId = result.draggableId.split("-")[1]; // timeSlot-id 형식에서 id 추출
      const draggedAdmin = currentTimeSlotAdmins.find(
        (admin) => admin.id === draggedAdminId
      );

      if (!draggedAdmin) return prev;

      // 현재 위치에서 제거
      const newAdmins = currentTimeSlotAdmins.filter(
        (admin) => admin.id !== draggedAdminId
      );

      // 새 위치에 삽입
      newAdmins.splice(destination.index, 0, draggedAdmin);

      return {
        ...prev,
        [timeSlot]: newAdmins
      };
    });
  };

  const handleAdminSelect = async (timeSlot: string, admin: string) => {
    const currentAdmins = timeSlotAdmins[timeSlot] || [];

    if (currentAdmins.includes(admin)) {
      const updatedAdmins = {
        ...timeSlotAdmins,
        [timeSlot]: currentAdmins.filter((a: string) => a !== admin)
      };
      setTimeSlotAdmins(updatedAdmins);
      setValue("scheduleData", updatedAdmins);
      await trigger("scheduleData");
      return;
    }

    if (currentAdmins.length >= interviewer) return;

    const updatedAdmins = {
      ...timeSlotAdmins,
      [timeSlot]: [...currentAdmins, admin]
    };
    setTimeSlotAdmins(updatedAdmins);
    setValue("scheduleData", updatedAdmins);
    await trigger("scheduleData");
  };

  // 특정 시간대에 면접관이 선택되어 있는지 확인
  const isAdminSelectedForTimeSlot = (timeSlot: string, admin: string) => {
    return timeSlotAdmins[timeSlot]?.includes(admin) || false;
  };

  // 특정 시간대에 선택된 면접관 수를 반환
  const getSelectedAdminCount = (timeSlot: string) => {
    return timeSlotAdmins[timeSlot]?.length || 0;
  };

  const onSubmit = (data: AdminsScheduleFormData) => {
    console.log(data);
  };

  const validateScheduleData = (value: TimeSlotAdmins) => {
    // 선택된 모든 시간대에서 면접관이 2명인지 확인
    const hasIncompleteSlot = Object.values(value).some(
      (admins) => admins.length < interviewer
    );
    return Object.keys(value).length === 0 || hasIncompleteSlot
      ? "필수 선택 사항입니다"
      : true;
  };
  // 전체 인덱스 계산 함수
  const getAdminGlobalIndex = (timeSlot: string, admin: any) => {
    return (timeSlotAdminsList[timeSlot] || []).findIndex(
      (a) => a.id === admin.id
    );
  };

  //면접 기간 이전, 다음 화살표 클릭 시 이벤트 핸들러
  //FIX: 날짜가 넘어가는 건 되는데 날짜 별로 가능한 면접 시간이 저장되진 않음
  //TODO: 날짜 바꿔서 가능한 면접 시간 선택한 거 반영되도록
  const goToPreviousDate = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const goToNextDate = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  // useEffect를 사용하여 상태 초기화 확인
  useEffect(() => {
    console.log("Current groupList:", groupList); // 디버깅용
  }, [groupList]);

  // 컴포넌트 마운트 시 각 시간대별로 초기 admin 리스트 생성
  useEffect(() => {
    const initialTimeSlotAdmins = timeSlots.reduce(
      (acc, timeSlot) => {
        acc[timeSlot] = [...admins]; // 각 시간대마다 독립적인 admin 배열 복사
        return acc;
      },
      {} as Record<string, typeof admins>
    );

    setTimeSlotAdminsList(initialTimeSlotAdmins);
  }, [timeSlots, admins]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="ml-8 w-full mt-[34px]">
        <div>
          <div className="mt-[16px] h-auto pt-[29px] px-[30px] pb-[40px] bg-white-100 rounded-[12px]">
            <p className="text-main-100 text-caption3 text-left">
              면접에 들어갈 {interviewer}명을 드래그 앤 드롭으로 선택해 주세요.
              해당 시간을 이후에 지원자들이 선택할 수 있습니다.
            </p>
            <div
              className={`mt-3 border  rounded-[12px] bg-[#FBFBFF]
              ${isSubmitted && errors.scheduleData ? "border-red-100" : "border-gray-300"}`}
            >
              <div className="flex-center bg-gray-200 border-[#C7C7CC] rounded-t-[12px] pt-[15px] pb-[14px] text-headline">
                {currentDate > new Date(interviewStartDate) && (
                  <button type="button" onClick={goToPreviousDate}>
                    <img
                      src="/assets/ic-prevDate.svg"
                      alt="이전 날짜"
                      className="mr-[6px]"
                    />
                  </button>
                )}
                <p>
                  {currentDate.toLocaleDateString("ko-KR", {
                    month: "long", // '11' -> '11월'
                    day: "numeric", // '6'
                    weekday: "long" // '월' -> '월요일'
                  })}
                </p>
                {currentDate < new Date(interviewEndDate) && (
                  <button type="button" onClick={goToNextDate}>
                    <img
                      src="/assets/ic-nextDate.svg"
                      alt="다음 날짜"
                      className="ml-[6px]"
                    />
                  </button>
                )}
              </div>
              <div className="pt-[18px] pb-[10px] pl-[11px]">
                <input
                  type="hidden"
                  {...register("scheduleData", {
                    validate: validateScheduleData
                  })}
                />

                {/* 그룹 헤더 */}
                <div className="flex">
                  <div className="w-[77px] mr-[7px]"></div>
                  {/* 시간 영역 공간 확보 */}
                  <div
                    className={`grid ${
                      distributedAdmins.length === 3
                        ? "grid-cols-3"
                        : distributedAdmins.length === 4
                          ? "grid-cols-4"
                          : distributedAdmins.length === 5
                            ? "grid-cols-5"
                            : "grid-cols-6"
                    } gap-4 w-full mb-7`}
                  >
                    {/* 기존 그룹 이름들 */}
                    {groupList &&
                      groupList.map((group, index) => (
                        <div
                          key={index}
                          className="flex-center text-caption2 font-bold text-main-500"
                        >
                          <p className="flex-center w-[77px] h-[26px] bg-gray-100 rounded-lg">
                            {group.name}
                          </p>
                        </div>
                      ))}
                    {/* 남은 admin이 있는 경우 추가 그룹 헤더 표시 */}
                    {distributedAdmins.length > groupList.length && (
                      <div className="flex-center text-caption2 font-bold text-main-700">
                        <p className="flex-center w-[77px] h-[26px] bg-gray-100 rounded-lg">
                          가능 인원
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {timeSlots.map((timeSlot) => (
                  <div
                    key={timeSlot}
                    className="flex items-center space-x-[7px] mb-[13px] "
                  >
                    {/*시간*/}
                    <div
                      className={`flex-center w-[77px] h-7 
                          ${getSelectedAdminCount(timeSlot) >= interviewer ? "border-main-800 text-main-100" : "border-[#E5E5EA] text-gray-1100"}  text-caption2`}
                    >
                      {timeSlot}
                    </div>

                    {/* 드래그 가능한 운영진 행 */}
                    <DragDropContext
                      onDragEnd={(result) => onDragEnd(result, timeSlot)}
                    >
                      <Droppable
                        droppableId={`droppable-${timeSlot}`}
                        direction="horizontal"
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`grid ${
                              distributedAdmins.length === 3
                                ? "grid-cols-3"
                                : distributedAdmins.length === 4
                                  ? "grid-cols-4"
                                  : distributedAdmins.length === 5
                                    ? "grid-cols-5"
                                    : "grid-cols-6"
                            } gap-4 w-full`}
                          >
                            {distributedAdmins.map(
                              (groupAdmins, groupIndex) => (
                                <div
                                  key={groupIndex}
                                  className="flex justify-center gap-2"
                                >
                                  {timeSlotAdminsList[timeSlot]
                                    ?.filter((admin) =>
                                      groupAdmins
                                        .map((a) => a.id)
                                        .includes(admin.id)
                                    )
                                    .map((admin) => {
                                      const globalIndex = getAdminGlobalIndex(
                                        timeSlot,
                                        admin
                                      );

                                      return (
                                        <Draggable
                                          key={`${timeSlot}-${admin.id}`}
                                          draggableId={`${timeSlot}-${admin.id}`}
                                          index={globalIndex}
                                        >
                                          {(provided) => (
                                            <div
                                              key={`${timeSlot}-${admin.name}`}
                                              onClick={() =>
                                                handleAdminSelect(
                                                  timeSlot,
                                                  admin.name
                                                )
                                              }
                                              ref={provided.innerRef}
                                              {...provided.dragHandleProps}
                                              {...provided.draggableProps}
                                              className={`flex-center text-caption2 w-20 h-7 rounded-md cursor-pointer border transition-colors
                ${
                  isAdminSelectedForTimeSlot(timeSlot, admin.name)
                    ? "bg-main-100 border-main-100 text-white-100"
                    : "bg-gray-100 border-gray-200 text-gray-1100 hover:bg-main-300 hover:border-main-400 hover:text-main-100"
                }`}
                                            >
                                              {admin.name}
                                            </div>
                                          )}
                                        </Draggable>
                                      );
                                    })}
                                </div>
                              )
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                ))}
              </div>
            </div>

            {isSubmitted && errors.scheduleData?.message && (
              <p className="text-state-error">
                {String(errors.scheduleData.message)}
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
