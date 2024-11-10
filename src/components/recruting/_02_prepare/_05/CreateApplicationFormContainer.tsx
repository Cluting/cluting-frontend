//2-5 지원서 폼 제작 및 공고 올리기 (컨테이너)
import { useState, ChangeEvent } from "react";
import ApplicantProfile from "./ApplicantProfile";
import ApplicantGroup from "./ApplicationGroup";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import GroupQuestion from "./GroupQuestion";

export default function CreateApplicationFormContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateApplicationForm>({
    mode: "onBlur"
  });

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
    <form className="w-[1016px]">
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
            {...register("title")}
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
            placeholder="ex) 글자 수를 지키지 않으면 불이익이 있을 수 있습니다. 글자 수를
            유의해 주세요!"
            {...register("commonQuestionCaution")}
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

      {/*그룹별 질문도.. 그룹 있을 때 들어감 */}
      <GroupQuestion />

      {/*포트폴리오 */}
      <div className="ml-8 w-full mt-[58px]">
        <div className="flex items-center">
          <p className="section-title">포트폴리오</p>
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

      {/*면접 시간 선택 */}
      <div className="ml-8 w-full mt-[58px] mb-[50px]">
        <div className="flex items-center">
          <p className="section-title">면접 시간 선택</p>
          <div className="tooltip">
            앞서 정해진 면접 일정을 바탕으로, 지원자들이 면접 시간을 선택합니다.
          </div>
        </div>
        <div className="w-full mt-[12px] px-[30px] py-[20.5px] bg-white-100 rounded-[12px]">
          <div className="py-[28px] px-[26px] bg-[#FBFBFF] rounded-[12px] border border-gray-300">
            이제 여기에 날짜가 와요
          </div>
        </div>
      </div>
      <button type="submit">임시 제출 버튼</button>
    </form>
  );
}
