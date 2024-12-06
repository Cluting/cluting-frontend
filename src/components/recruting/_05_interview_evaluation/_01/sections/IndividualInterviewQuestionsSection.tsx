import { useState } from "react";
import Dropdown from "./dropdown/Dropdown";
import Headline from "./headline/Headline";

export default function IndividualInterviewQuestionsSection() {
  const [filter, setFilter] = useState("전체");
  return (
    <div className="flex flex-col gap-2">
      <Headline
        essential={true}
        title="개별 면접 질문 만들기"
        hint="지원자 개인에게 하고 싶은 질문을 추가해 주세요. 지원자의 지원서류를 기반으로 작성할 수 있습니다."
      >
        {/* 기획 확정 안나서 추후 수정 예정 */}
        <button>권한자 보기</button>
      </Headline>
      <div className="flex flex-col gap-2 p-4 bg-white-100 border border-[#D9D4E7] rounded-2xl">
        <Dropdown
          label="필터 : "
          defaultValue="전체"
          options={["전체", "기획", "디자인", "개발"]}
          onSelect={(value) => setFilter(value)}
        />
      </div>
    </div>
  );
}
