import { useEffect, useState } from "react";
import { useGroupStore } from "../../../store/useStore";

// 1 - 계획하기 : 지원자 그룹 짓기
export default function GroupCreate() {
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false); // input 표시 상태
  //useGroupStore 전역 상태 가져오기
  const addGroup = useGroupStore((state) => state.addGroup);
  const groupList = useGroupStore((state) => state.group);
  const removeGroup = useGroupStore((state) => state.removeGroup);

  //테스트
  const { group } = useGroupStore();
  useEffect(() => {
    console.log(group);
  }, [group]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddGroup = () => {
    if (inputValue.trim() !== "") {
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

  return (
    <div className="custom-shadow w-full h-auto bg-white-100 py-6 mx-8 mt-[34px] px-[13px] rounded-[12px]">
      <div className="flex items-center mx-8 my-4">
        <h1 className="text-callout">지원자 그룹 짓기</h1>
        <div className="ml-3 tooltip ">
          동아리가 파트로 구분된다면 ex) 기획/디자인/홍보팀 등으로 그룹화해
          주세요
        </div>
      </div>
      <div className="flex items-start h-[50px] mb-[62px]">
        <button
          onClick={handleShowInput}
          className="button-main-light flex-center ml-8 mr-4 py-[14px] px-[38px] text-callout rounded-[10px]"
        >
          <img
            src="/assets/ic-addMain.svg"
            alt="그룹 추가"
            className="w-[10px] h-[10px] mr-2 "
          />
          그룹 추가
        </button>

        <ul className="h-full flex gap-[16px] text-callout text-gray-900">
          {groupList.map((group, index) => (
            <li
              key={index}
              className="relative flex-center w-[158px] h-full rounded-[8px]  py-[11px]  text-center border border-gray-400 "
            >
              {group}
              <img
                onClick={() => removeGroup(group)}
                src="/assets/ic-minusCircle.svg"
                alt="그룹 삭제"
                className="absolute w-[16px] h-[16px] right-4"
              />
            </li>
          ))}
        </ul>

        {showInput && (
          <input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="그룹명"
            className="w-[158px] h-full rounded-[8px] ml-[16px] py-[11px] px-[20px] text-center input-background"
          />
        )}
      </div>
    </div>
  );
}
