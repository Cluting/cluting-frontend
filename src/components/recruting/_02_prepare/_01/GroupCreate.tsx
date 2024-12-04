import { useEffect, useRef, useState } from "react";
import { useRecruitmentStepStore } from "../../../../store/useStore";
import { useGroupStore } from "../../../../store/useGroupStore";

// 1 - 계획하기 : 지원자 그룹 짓기
export default function GroupCreate() {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null); // input 참조
  const [showInput, setShowInput] = useState(false); // input 표시 상태 - 그룹 추가 버튼을 클릭하면 input이 보이도록
  //useGroupStore 전역 상태 가져오기
  const addGroup = useGroupStore((state) => state.addGroup);
  const groupList = useGroupStore((state) => state.group);
  const removeGroup = useGroupStore((state) => state.removeGroup);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddGroup = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
      alert("그룹명을 입력해주세요.");
      return;
    } else {
      addGroup(inputValue.trim());
      setInputValue(""); // 입력창 초기화
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddGroup();
    }
  };

  const handleShowInput = () => {
    setShowInput(true); //그룹 추가 클릭 후 input 표시
  };

  // 외부 클릭 감지하여 input 숨기기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowInput(false); // input 외부 클릭 시 숨기기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //1단계 완료 여부
  const { completedSteps } = useRecruitmentStepStore();

  return (
    <div
      className={`${
        completedSteps[0] ? "pointer-events-none" : ""
      }  w-full h-auto bg-white-100 pt-6 pb-[60px] mt-[34px] px-[13px] rounded-[12px]`}
    >
      <div className="flex items-center ml-8 my-4">
        <h1 className="text-callout">지원자 그룹 짓기</h1>
        <div className="ml-3 tooltip ">
          동아리가 파트로 구분된다면 ex) 기획/디자인/홍보팀 등으로 그룹화해
          주세요
        </div>
      </div>
      <div className="w-full flex items-start overflow-scroll oveflow-x-hidden flex-wrap ">
        <button
          onClick={handleShowInput}
          className=" button-main-light flex-center ml-8 mr-4 py-[14px] px-[38px] text-callout rounded-[10px]"
        >
          <img
            src="/assets/ic-addMain.svg"
            alt="그룹 추가"
            className="w-[10px] h-[10px] mr-2 "
          />
          그룹 추가
        </button>

        {showInput && (
          <input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="그룹명"
            className="w-[158px] h-[50px] rounded-[8px] mr-4 py-[11px] px-[20px] text-center input-background"
          />
        )}

        <ul className="grid grid-cols-3 h-full flex gap-[16px] text-callout text-gray-900">
          {groupList.map((group, index) => (
            <li
              key={index}
              className="w-[158px] h-[50px] relative flex-center w-[158px] rounded-[8px]  py-[11px]  text-center border border-gray-400 "
            >
              {group.name}
              <img
                onClick={() => removeGroup(group.name)}
                src="/assets/ic-minusCircle.svg"
                alt="그룹 삭제"
                className="absolute w-[16px] h-[16px] right-4"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
