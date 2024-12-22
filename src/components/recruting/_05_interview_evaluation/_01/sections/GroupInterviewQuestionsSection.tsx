import React, { useState } from "react";
import { useQuestionStore } from "../../../../../store/recruiting/_05_interview_evaluation/questionStore";
import Headline from "./headline/Headline";
import QuestionInput from "./input/QuestionInput";
import TabBar from "./tabBar/TabBar";
import AddButton from "./button/AddButton";

const GroupInterviewQuestionsSection: React.FC = () => {
  const { questionCounts, setCheckedCount } = useQuestionStore();
  const [currentTab, setCurrentTab] = useState<"기획" | "디자인" | "개발">(
    "기획"
  );
  const [questions, setQuestions] = useState<{
    [key in "기획" | "디자인" | "개발"]: { value: string; checked: boolean }[];
  }>({
    기획: [{ value: "", checked: false }],
    디자인: [{ value: "", checked: false }],
    개발: [{ value: "", checked: false }]
  });

  const handleAddQuestion = () => {
    setQuestions((prev) => ({
      ...prev,
      [currentTab]: [...prev[currentTab], { value: "", checked: false }]
    }));
  };

  const handleQuestionChange = (index: number, value: string) => {
    setQuestions((prev) => ({
      ...prev,
      [currentTab]: prev[currentTab].map((q, i) =>
        i === index ? { ...q, value } : q
      )
    }));
  };

  const handleCheckChange = (index: number, checked: boolean) => {
    setQuestions((prev) => ({
      ...prev,
      [currentTab]: prev[currentTab].map((q, i) =>
        i === index ? { ...q, checked } : q
      )
    }));

    const checkedCount = questions[currentTab].filter((q, i) =>
      i === index ? checked : q.checked
    ).length;
    setCheckedCount(checkedCount);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions((prev) => ({
      ...prev,
      [currentTab]: prev[currentTab].filter((_, i) => i !== index)
    }));
  };

  return (
    <section className="flex flex-col gap-3">
      <Headline
        essential={true}
        title="그룹별 면접 질문 만들기"
        hint="각 그룹별 질문을 작성한 뒤, 2개를 선택해 주세요."
      />
      <div className="flex flex-col">
        <TabBar
          tabs={["기획", "디자인", "개발"]}
          currentTab={currentTab}
          onTabClick={(tab) => setCurrentTab(tab as "기획" | "디자인" | "개발")}
        />

        <div className="flex flex-col border gap-5 border-[#D0D4E7] bg-white-100 rounded-b-xl rounded-r-xl p-8">
          <div className="flex flex-col gap-6">
            {questions[currentTab].map((q, index) => (
              <QuestionInput
                key={index}
                number={index + 1}
                value={q.value}
                checked={q.checked}
                isError={
                  questions[currentTab].filter((q) => q.checked).length !==
                  questionCounts.group
                }
                onChange={(value: string) => handleQuestionChange(index, value)}
                onCheck={(checked: boolean) =>
                  handleCheckChange(index, checked)
                }
                onRemove={() => handleRemoveQuestion(index)} // 빼기 버튼 핸들러
              />
            ))}
            <AddButton onClick={handleAddQuestion} label="면접 질문 추가하기" />
          </div>

          {/* 에러케이스 처리 */}
          {questions[currentTab].filter((q) => q.checked).length !==
            questionCounts.group && (
            <span className="font-Pretendard font-medium text-xs text-left text-[#FF3B3B]">
              앞에서 정한 그룹별 질문 개수만큼 선택해 주세요.
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default GroupInterviewQuestionsSection;
