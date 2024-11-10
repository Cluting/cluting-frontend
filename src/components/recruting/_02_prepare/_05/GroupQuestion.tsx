//2-5 그룹별 질문
import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useGroupStore } from "../../../../store/useStore";

export default function GroupQuestion() {
  const { group } = useGroupStore();
  const [selectedGroup, setSelectedGroup] = useState<string>(group[0] || ""); // 첫 번째 그룹을 기본값으로

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateApplicationForm>({
    mode: "onBlur"
  });

  const handleGroupClick = (groupName: string) => {
    setSelectedGroup(groupName);
  };

  const [questions, setQuestions] = useState([
    { id: uuidv4(), type: "서술형 질문" as QuestionType }
  ]);

  const handleSelectChange =
    (id: string) => (e: ChangeEvent<HTMLSelectElement>) => {
      const newQuestions = questions.map((question) =>
        question.id === id
          ? { ...question, type: e.target.value as QuestionType }
          : question
      );
      setQuestions(newQuestions);
    };

  const addNewQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      type: "서술형 질문" as QuestionType
    };
    setQuestions([...questions, newQuestion]);
    // console.log(newQuestion.id);
  };

  return (
    <div className="ml-8 w-full mt-[58px]">
      <div className="flex">
        <p className="section-title">
          <span className="mr-[0.25em] text-main-100">*</span>그룹별 질문
        </p>
        <div className="tooltip">각 그룹별 질문을 작성해 주세요.</div>
      </div>

      <div className="mt-[12px] h-auto pt-[32px] pl-[31px] pr-[42px] pb-[32px] bg-white-100 rounded-[12px]">
        <p className="text-title3 text-[#3B3D46] text-left ">지원 그룹</p>
        <div className="flex items-left mt-[11px] gap-[11px]">
          {group.map((groupName) => (
            <button
              key={groupName}
              type="button"
              className={`w-[225px] h-[50px] border rounded-[11px] flex-center text-callout ${selectedGroup === groupName ? "bg-main-100 text-white-100 border-main-100" : "bg-white-100 text-[#43454F] border-gray-300 hover:bg-main-100 hover:text-white-100"}`}
              onClick={() => handleGroupClick(groupName)}
            >
              {groupName}
            </button>
          ))}
        </div>
        <div className="flex-center my-[42px] border border-gray-200 "></div>

        <p className="mb-[15px] text-title3 text-[#3B3D46] text-left text-title3">
          '{selectedGroup}' 그룹 질문 관련 주의 사항
        </p>

        <input
          className="flex items-center text-left w-full h-[42px] pl-[21px] rounded-[8px] border border-gray-500 text-subheadline outline-none hover:border-main-100"
          placeholder="ex) 글자 수를 지키지 않으면 불이익이 있을 수 있습니다. 글자 수를
            유의해 주세요!"
        />
        <div className="flex-center my-[42px] border border-gray-200 "></div>
        <p className="mb-[15px] text-title3 text-[#3B3D46] text-left">
          공통 질문 추가하기
        </p>

        {questions.map((question) => (
          <div
            key={question.id}
            className="w-full h-auto mb-[34px] px-[21px] pt-[20px] pb-[13px] bg-gray-100 rounded-[12px] border border-gray-300"
          >
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="질문을 작성해 주세요."
                className="w-[541px] h-[42px] py-[11px] pl-[19px] rounded-[8px] border border-gray-400 outline-none hover:border-main-100"
              />
              <select
                className="flex-center w-[247px] h-[42px] pl-[19px] py-[11px] bg-white-100 rounded-[8px] border border-gray-400 outline-none"
                onChange={handleSelectChange(question.id)}
                value={question.type}
              >
                <option value="서술형 질문">서술형 질문</option>
                <option value="객관형 질문">객관형 질문</option>
              </select>
            </div>
            {question.type === "서술형 질문" ? (
              <div>
                <textarea
                  placeholder="지원자의 답변 작성란 입니다."
                  className="w-full min-h-[91px] mt-[18px] py-[15px] pl-[20px] rounded-[8px] border border-gray-400 outline-none hover:border-main-100"
                />
                <div className="flex-center justify-end mt-[10px]">
                  <input
                    type="checkbox"
                    className="w-[18px] h-[18px] mr-2 cursor-pointer 
                        appearance-none
                        checked:bg-main-100 
                        border border-gray-300 rounded"
                    {...register("commonQuestionCaution")}
                  />
                  <p>글자 수 제한</p>

                  <input
                    type="text"
                    placeholder="500"
                    className="flex-center w-[66px] h-[26px] ml-[7px] px-[9px] py-[5px] rounded-[6px] border border-gray-400 outline-none text-caption2 hover:border-main-100"
                  />
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="선택지 추가"
                  className="flex w-[584px] h-[36px] mt-[18px] pl-[13px] py-[10px] border border-gray-500 rounded-[6px] outline-none hover:border-main-100"
                  {...register("multipleChoice")}
                />
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          className="flex-center w-full h-[54px] bg-gray-200 border border-gray-400 rounded-[8px]"
          onClick={addNewQuestion}
        >
          <img
            alt="질문 추가 버튼"
            src="/assets/ic-plus.svg"
            className="mr-2"
          />
          질문 추가
        </button>
      </div>
    </div>
  );
}
