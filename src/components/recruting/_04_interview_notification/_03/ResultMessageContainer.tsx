import { useState } from "react";

// 4-2 합불 안내 메시지 (컨테이너)
export default function ResultMessageContainer() {
  const [massageType, setMessageType] = useState("합격");
  const [isVisible, setIsVisible] = useState(true); //예시 이미지 여부

  return (
    <div>
      <div className="ml-1 flex gap-0">
        <button
          onClick={() => {
            setMessageType("합격");
          }}
          className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border border-main-400 border-b-0 text-callout ${massageType === "합격" ? "bg-main-100 text-white-100" : "bg-main-300"} `}
        >
          합격
        </button>
        <button
          onClick={() => {
            setMessageType("불합격");
          }}
          className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border border-main-400 border-b-0 text-callout ${massageType === "불합격" ? "bg-main-100 text-white-100" : "bg-main-300"}`}
        >
          불합격
        </button>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-t-[6.65px]">
        <div className="flex items-center bg-white-100 border border-gray-200 rounded-t-[6.65px] py-[13px] px-[17px]">
          <p className="mr-[15px] text-gray-600 text-[12px]">개별 정의</p>
          <div className="flex-center bg-gray-600 text-white-100 rounded-lg mr-[11px] py-[4px] px-[7px]  text-[13px]">
            <img src="/assets/ic-add.svg" className="w-[14px] h-[14px] mr-1" />
            지원자
          </div>

          <div className="flex-center bg-gray-600 text-white-100 rounded-lg mr-[11px] py-[4px] px-[7px]  text-[13px]">
            <img src="/assets/ic-add.svg" className="w-[14px] h-[14px] mr-1" />
            파트
          </div>

          <div className="flex-center bg-gray-600 text-white-100 rounded-lg mr-[21px] py-[4px] px-[7px]  text-[13px]">
            <img src="/assets/ic-add.svg" className="w-[14px] h-[14px] mr-1" />
            면접 시간대 링크
          </div>
          <div className="tooltip">
            모든 지원자에게 해당하는 정의를 클릭해 본문을 추가해 주세요.
          </div>
        </div>
        <div className="relative bg-white-100 h-[690px] rounded-b-[6.65px]">
          {isVisible && (
            <img
              onClick={() => {
                setIsVisible(false);
              }}
              src="/assets/messageExample.png"
              className="absolute top-[40px] left-[50px]"
            />
          )}

          <textarea className="w-full h-full rounded-b-[6.65px] cursor-pointer focus:outline-none  px-[26px] py-[22px] overflow-hidden " />
        </div>
      </div>
    </div>
  );
}
