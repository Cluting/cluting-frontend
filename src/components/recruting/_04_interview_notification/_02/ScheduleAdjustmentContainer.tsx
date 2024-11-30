// 4-2 면접 일정 조절 (컨테이너)
import { useGroupStore, useInterviewStore } from "../../../../store/useStore";
import { useState } from "react";

export default function ScheduleAdjustmentContainer() {
  const { group } = useGroupStore();
  const { interviewer, interviewee } = useInterviewStore();
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);

  return (
    <div className="mt-3">
      <div className="flex justify-between">
        <div className="flex-center gap-4">
          {/*요고 날짜 수정 부탁드립니다! */}
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
            className="mr-2 "
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
                className={`flex-center w-[162px] min-h-[43px] rounded-t-[11px]  border border-b-0 text-callout 
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
          <div className="flex bg-gray-100 border-b border-gray-200">
            <p>면접관</p>
            <p>시간</p>
            <p>지원자</p>
          </div>
          a asdgasdg sdag sdagsdga sdag
        </div>
      </div>
    </div>
  );
}
