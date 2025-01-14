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

  //면접 기간
  const {
    interviewStartTime,
    interviewEndTime,
    interviewStartDate,
    interviewEndDate,
    interviewer
  } = useInterviewStore();
  const { group } = useGroupStore();

  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(interviewStartDate)
  );

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
    { id: "babo1", name: "바보1" },
    { id: "babo2", name: "바보2" },
    { id: "babo3", name: "바보3" }
  ]);

  //드래그 앤 드랍 초기 설정
  const onDragEnd = (result: DropResult) => {
    //요상한 곳으로 드래그하면 return(초기 상태로)
    if (!result?.destination) return;

    console.log(result);

    const sourceIndex = result.source.index; //드래그를 해 온 요소
    const destinationIndex = result.destination.index; //드래그앤드롭한 목적지

    const newList = [...admins]; //초기 리스트 상태 복사한 후 저장
    const pickedBabo = newList[sourceIndex]; //복사한 리스트에서 sourceIndex부분을 삭제한 뒤 붙여넣기 -> 위치 바뀜
    newList.splice(sourceIndex, 1);
    newList.splice(destinationIndex, 0, pickedBabo);
    setAdmins(newList);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="ml-8 w-full mt-[34px]">
        <div>
          <div className="mt-[16px] h-auto pt-[29px] px-[30px] pb-[40px] bg-white-100 rounded-[12px]">
            <p className="text-main-100 text-caption3 text-left">
              면접에 들어갈 {interviewer}명을 선택해 주세요. {interviewer}명이
              가능한 시간을 이후에 지원자들이 선택할 수 있습니다.
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
              <div className="pt-2 pb-[10px] pl-[11px]">
                <input
                  type="hidden"
                  {...register("scheduleData", {
                    validate: validateScheduleData
                  })}
                />
                {timeSlots.map((timeSlot) => (
                  <div
                    key={timeSlot}
                    className="flex items-center space-x-[7px] mb-[13px] "
                  >
                    {/*시간*/}
                    <button
                      className={`flex-center w-[77px] h-7 
                          ${getSelectedAdminCount(timeSlot) >= interviewer ? "border-main-800 text-main-100" : "border-[#E5E5EA] text-gray-1100"}  text-caption2`}
                    >
                      {timeSlot}
                    </button>
                    {/*운영진들 */}
                    {admins.map((admin) => (
                      <button
                        key={`${timeSlot}-${admin}`}
                        type="button"
                        onClick={() => handleAdminSelect(timeSlot, admin.name)}
                        disabled={
                          getSelectedAdminCount(timeSlot) >= interviewer &&
                          !isAdminSelectedForTimeSlot(timeSlot, admin.name)
                        }
                        className={`flex-center w-[77.85px] h-7 bg-[#FBFBFF] rounded-[6px] cursor-pointer border hover:bg-main-100 hover:border-main-100 hover:text-white-100
                            ${isAdminSelectedForTimeSlot(timeSlot, admin.name) ? "border-main-100 bg-main-100 text-white-100" : "border-[#E5E5EA] text-gray-1100"} text-caption2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover-not-allowed`}
                      >
                        {admin.name}
                      </button>
                    ))}
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
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="01" key="01" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-center"
              >
                {admins.map((babo, index) => (
                  <Draggable key={babo.id} draggableId={babo.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className="flex-center w-[77.85px] h-7 bg-[#FBFBFF] rounded-[6px] cursor-pointer border hover:bg-main-100 hover:border-main-100 hover:text-white-100
                          border-[#E5E5EA] text-gray-1100 text-caption2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover-not-allowed"
                      >
                        {babo.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </form>
  );
}
