import { useGroupStore, useInterviewStore } from "../../../../store/useStore";
import { useState } from "react";

interface Applicant {
  id: number;
  name: string;
}

interface ScheduleData {
  interviewer: string;
  time: string;
  applicants: Applicant[];
}

interface TimeSlotApplicants {
  [timeSlot: string]: number[]; // 지원자 ID 배열
}

export default function ScheduleAdjustmentContainer() {
  const { group } = useGroupStore();
  const { interviewer, interviewee } = useInterviewStore();
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);
  const [selectedTimeSlots, setSelectedTimeSlots] =
    useState<TimeSlotApplicants>({});

  // 임시 데이터
  const scheduleData: ScheduleData[] = [
    {
      interviewer: "박시현 / 최예은",
      time: "18:00 PM",
      applicants: Array(12)
        .fill(null)
        .map((_, index) => ({
          id: index,
          name: "박시현"
        }))
    },
    {
      interviewer: "박시현 / 최예은",
      time: "19:00 PM",
      applicants: [{ id: 12, name: "박시현" }]
    },
    {
      interviewer: "양성원 / 윤다인",
      time: "20:00 PM",
      applicants: [
        { id: 13, name: "박시현" },
        { id: 14, name: "박시현" }
      ]
    }
  ];

  const handleApplicantSelect = (time: string, applicantId: number) => {
    setSelectedTimeSlots((prev) => {
      const currentSelected = prev[time] || [];

      // 이미 선택된 경우 제거
      if (currentSelected.includes(applicantId)) {
        const updated = currentSelected.filter((id) => id !== applicantId);
        return {
          ...prev,
          [time]: updated.length ? updated : []
        };
      }

      // 새로 선택하는 경우
      if (currentSelected.length >= interviewee) return prev;

      return {
        ...prev,
        [time]: [...currentSelected, applicantId]
      };
    });
  };

  // 시간대별 선택 완료 여부 확인
  const isTimeSlotComplete = (time: string) => {
    return (selectedTimeSlots[time]?.length || 0) === interviewee;
  };

  // 지원자가 선택되었는지 확인
  const isApplicantSelected = (time: string, applicantId: number) => {
    return selectedTimeSlots[time]?.includes(applicantId) || false;
  };

  return (
    <div className="mt-3">
      <div className="flex justify-between">
        <div className="flex-center gap-4">
          <div className="flex-center w-[334px] h-[35px] bg-gray-50 border border-[#E9E9E9] text-gray-700">
            10.16.화
          </div>
          <div className="tooltip text-main-100">
            구성은 면접관 {interviewer}:지원자 {interviewee}입니다. 지원자
            {interviewee}명을 확정해 주세요.
          </div>
        </div>
        <button className="flex-center w-auto h-[36px] px-[11px] bg-main-300 border border-main-400 rounded-[6px] text-main-100">
          <img
            src="/assets/ic-reset.svg"
            alt="기존 배치로 돌아가기"
            className="mr-2"
          />
          기존 배치로 돌아가기
        </button>
      </div>

      <div>
        <div className="flex mt-[22px]">
          {group && group.length > 0 ? (
            group.map((groupItem) => (
              <button
                key={groupItem.index}
                type="button"
                className={`flex-center w-[162px] min-h-[43px] rounded-t-[11px] border border-b-0 text-callout 
                  ${
                    selectedGroupId === groupItem.index
                      ? "border-main-100 bg-main-100 text-white-100"
                      : "border-gray-200 bg-gray-100 text-main-100"
                  }`}
                onClick={() => setSelectedGroupId(groupItem.index)}
              >
                {groupItem.name}
              </button>
            ))
          ) : (
            <div className="flex-center w-[162px] min-h-[43px] rounded-t-[11px] border border-b-0 text-callout border-main-100 bg-main-100 text-white-100">
              전체
            </div>
          )}
        </div>

        <div className="w-full h-auto bg-gray-50 border border-gray-200 rounded-tr-[6.65px] rounded-bl-[6.65px] rounded-br-[6.65px]">
          <div className="grid grid-cols-[235px_60px_1fr] bg-gray-100 border-b border-gray-200 font-semibold text-gray-800">
            <div className="py-3">면접관</div>
            <div className="py-3">시간</div>
            <div className="py-3">지원자</div>
          </div>

          <div className="p-4">
            {scheduleData.map((schedule) => (
              <div
                key={schedule.time}
                className="grid grid-cols-[200px_120px_1fr] items-start mb-4"
              >
                <div className="text-gray-800 text-caption1">
                  {schedule.interviewer}
                </div>
                <div>
                  <div
                    className={`flex-center w-[100px] h-[35px] border rounded-[6px] text-caption3 
    ${
      isTimeSlotComplete(schedule.time)
        ? "bg-main-300 border-main-400 text-main-100"
        : "bg-gray-100 border-gray-200 text-gray-500"
    }`}
                  >
                    {schedule.time}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {schedule.applicants.map((applicant) => {
                    const isSelected = isApplicantSelected(
                      schedule.time,
                      applicant.id
                    );
                    const isDisabled =
                      !isSelected &&
                      (selectedTimeSlots[schedule.time]?.length || 0) >=
                        interviewee;

                    return (
                      <button
                        key={`${schedule.time}-${applicant.id}`}
                        onClick={() =>
                          handleApplicantSelect(schedule.time, applicant.id)
                        }
                        disabled={isDisabled}
                        className={`flex-center w-[80px] h-[35px] border rounded-[6px] text-caption3
                        ${
                          isSelected
                            ? "bg-main-300 border-main-400 text-main-100"
                            : "bg-gray-100 border-gray-200 text-gray-500"
                        }
                        ${
                          isDisabled
                            ? "opacity-30 cursor-not-allowed"
                            : "hover:bg-main-300 hover:border-main-400 hover:text-main-100"
                        }`}
                      >
                        {applicant.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
