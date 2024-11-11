// 5 - 면접관 일정 확인하기

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInterviewStore } from "../../../../store/useStore";

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

  const { interviewStartTime, interviewEndTime } = useInterviewStore();

  // 1시간 간격의 시간 배열 생성
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    const generateTimeSlots = () => {
      const startTime = new Date(interviewStartTime);
      const endTime = new Date(interviewEndTime);
      const slots: string[] = [];

      // 시작 시간부터 종료 시간까지 1시간 간격으로 timeSlots 배열 생성
      while (startTime < endTime) {
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

    generateTimeSlots();
  }, [interviewStartTime, interviewEndTime]);

  //임원진도 임의로 써놨습니다!
  const admins = ["박시현", "윤다인", "곽서연", "최예은"];

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

    if (currentAdmins.length >= 2) return;

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
      (admins) => admins.length < 2
    );
    return Object.keys(value).length === 0 || hasIncompleteSlot
      ? "필수 선택 사항입니다"
      : true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="ml-8 w-full mt-[34px]">
        <div>
          <div className="mt-[16px] h-auto pt-[29px] px-[30px] pb-[40px] bg-white-100 rounded-[12px]">
            <p className="text-main-100 text-caption3 text-left">
              면접에 들어갈 2명을 선택해 주세요. 2명이 가능한 시간을 이후에
              지원자들이 선택할 수 있습니다.
            </p>
            <div
              className={`mt-3 border  rounded-[12px] bg-[#FBFBFF]
              ${isSubmitted && errors.scheduleData ? "border-red-100" : "border-gray-300"}`}
            >
              <div className="flex-center bg-gray-200 border-b-[#C7C7CC rounded-t-[12px] pt-[15px] pb-[14px] text-headline">
                <img
                  src="/assets/ic-prevDate.svg"
                  alt="이전 날짜"
                  className="mr-[6px]"
                />
                <p>10월 13일 월요일</p> {/*날짜*/}
                <img
                  src="/assets/ic-nextDate.svg"
                  alt="다음 날짜"
                  className="ml-[6px]"
                />
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
                    <div
                      className={`flex-center w-[77.85px] mr-[3.15px] h-7 bg-[#FBFBFF] rounded-[6px] cursor-pointer border 
                          ${getSelectedAdminCount(timeSlot) >= 2 ? "border-gray-800 bg-gray-800 text-[#F2F2F7]" : "border-[#E5E5EA] text-[#3B3D46]"} text-caption2`}
                    >
                      {timeSlot}
                    </div>
                    {/*운영진들 */}
                    {admins.map((admin) => (
                      <button
                        key={`${timeSlot}-${admin}`}
                        type="button"
                        onClick={() => handleAdminSelect(timeSlot, admin)}
                        disabled={
                          getSelectedAdminCount(timeSlot) >= 2 &&
                          !isAdminSelectedForTimeSlot(timeSlot, admin)
                        }
                        className={`flex-center w-[77.85px] h-7 bg-[#FBFBFF] rounded-[6px] cursor-pointer border hover:bg-gray-800 hover:border-gray-800 hover:text-[#F2F2F7]
                            ${isAdminSelectedForTimeSlot(timeSlot, admin) ? "border-gray-800 bg-gray-800 text-[#F2F2F7]" : "border-[#E5E5EA] text-[#3B3D46]"} text-caption2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover-not-allowed`}
                      >
                        {admin}
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
          <button type="submit">임시 제출 버튼</button>
        </div>
      </div>
    </form>
  );
}
