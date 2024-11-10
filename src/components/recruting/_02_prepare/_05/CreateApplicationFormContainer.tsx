//2-5 지원서 폼 제작 및 공고 올리기 (컨테이너)
import { useState, ChangeEvent } from "react";
import ApplicantProfile from "./ApplicantProfile";
import ApplicantGroup from "./ApplicationGroup";
import QuestionBox from "./QuestionBox";
import { v4 as uuidv4 } from "uuid";

export default function CreateApplicationFormContainer() {
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
    <div className="w-[1100px]">
      {/*지원서 제목*/}
      <div className="ml-8 w-full mt-[26px]">
        <p className="section-title">
          <span className="mr-[0.25em] text-main-100">*</span>지원서 제목
        </p>

        <div className="mt-[12px] h-auto pt-[29px] px-[30px] pb-[40px] bg-white-100 rounded-[12px]">
          <input
            type="text"
            alt="지원서 제목 입력"
            placeholder="ex) OO 동아리 5기 지원"
            className="w-full h-[42px] pl-[21px] rounded-[8px] border border-gray-500 outline-none hover:border-main-100 text-subheadline"
          />
        </div>
        <ApplicantProfile />
      </div>

      {/*지원 그룹이 있으면 지원 그룹 컴포넌트 들어가야함 */}
      <ApplicantGroup />

      {/*공통 질문 만들기 */}
      <div className="ml-8 w-full mt-[58px]">
        <div className="flex">
          <p className="section-title">
            <span className="mr-[0.25em] text-main-100">*</span>공통 질문 만들기
          </p>
          <div className="tooltip">공통 질문을 작성해 주세요.</div>
        </div>

        <div className="mt-[12px] h-auto pt-[32px] pl-[31px] pr-[42px] pb-[32px] bg-white-100 rounded-[12px]">
          <p className="mb-[15px] text-title3 text-[#3B3D46] text-left text-title3">
            공통 질문 관련 주의 사항
          </p>
          <input
            className="flex items-center text-left w-full h-[42px] pl-[21px] rounded-[8px] border border-gray-500 text-subheadline outline-none hover:border-main-100"
            placeholder="글자 수를 지키지 않으면 불이익이 있을 수 있습니다. 글자 수를
            유의해 주세요!"
          />
          <div className="flex-center my-[42px] border border-gray-200 "></div>
          <p className="mb-[15px] text-title3 text-[#3B3D46] text-left">
            공통 질문 추가하기
          </p>

          {questions.map((question) => (
            <div key={question.id} className="mb-4">
              <QuestionBox
                questionType={question.type}
                onSelectChange={handleSelectChange(question.id)}
              />
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

      {/*포트폴리오 */}
      <div className="ml-8 w-full mt-[58px]">
        <div className="flex items-center">
          <p className="section-title">
            <span className="mr-[0.25em] text-main-100">*</span>포트폴리오
          </p>
          <label className="flex-center text-subheadline text-gray-900">
            <input
              type="checkbox"
              className="w-[18px] h-[18px] mr-2 cursor-pointer 
                appearance-none
                checked:bg-main-100 
                border border-gray-300 rounded"
            />
            포트폴리오 받기
          </label>
        </div>
        <div className="w-full min-h-[207px] mt-[12px] bg-white-100 rounded-[12px]"></div>
      </div>
    </div>
  );
}
