import InterviewAvailableTime from "./InterviewAvailableTime";
import InterviewFormat from "./InterviewFormat";
import InterviewTime from "./InterviewTime";
import TimeSlot from "./TimeSlot";

import AdminsSchedule from "./AdminsSchedule";
import { useInterviewStore } from "../../../../store/useStore";

//2-1 운영진 면접 일정 조정 (컨테이너)
export default function ScheduleInterviewsContainer() {
  const { isTimeSet } = useInterviewStore();
  return (
    <div>
      <div className="flex items-center mx-8 my-4">
        <h1 className="text-title3 text-gray-900 mr-[18px]">
          <span className="text-main-100">* </span>면접 형식 설정하기
        </h1>
        <div className="tooltip ">
          면접 진행 시 면접관과 면접자의 비율을 설정해 주세요.
        </div>
      </div>
      <InterviewFormat />

      <div className="flex items-center mx-8 my-4">
        <h1 className="text-title3 text-gray-900 mr-[18px]">
          <span className="text-main-100 ">* </span>면접 시간 설정하기
        </h1>
        <div className="tooltip">면접 시간을 설정해 주세요. </div>
      </div>
      <InterviewTime />

      <div className="flex items-center mx-8 my-4">
        <h1 className="text-title3 text-gray-900 mr-[18px]">
          <span className="text-main-100">* </span>면접 진행 시간대 선택
        </h1>
        <div className="tooltip">
          하루 중 언제부터 언제까지 면접을 진행하실 건가요?
        </div>
      </div>
      <TimeSlot />

      {/* isTimeSet이 true일 때 다른 컴포넌트 표시 */}
      {isTimeSet && (
        <div className="animate-slide-down ">
          <div className="flex items-center mx-8 my-4 ">
            <h1 className="text-title3 text-gray-900 mr-[18px]">
              <span className="text-main-100">* </span>면접 가능 시간 선택
            </h1>
            <div className="tooltip ">
              본인이 가능한 시간대를 선택해 주세요.
            </div>
          </div>
          <InterviewAvailableTime />
        </div>
      )}

      <div className="flex items-center mx-8 my-4">
        <h1 className="text-title3 text-gray-900 mr-[18px]">
          <span className="text-main-100">* </span>면접관 일정 확인하기
        </h1>
        <div className="tooltip">
          면접에 들어갈 면접관 수에 맞게 클릭해 확정해 주세요.
        </div>
      </div>
      <AdminsSchedule />
    </div>
  );
}
