//2-5 지원서 폼 제작 및 공고 올리기 (컨테이너)
import { ReactElement } from "react";
import { useState, ChangeEvent, useEffect } from "react";
import ApplicantProfile from "./ApplicantProfile";
import ApplicantGroup from "./ApplicationGroup";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import GroupQuestion from "./GroupQuestion";
import { watch } from "fs";

export default function CreateApplicationFormContainer(): ReactElement {
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted }
  } = useForm<CreateApplicationForm>({
    mode: "onBlur",
    defaultValues: {
      commonQuestions: {} //빈 객체로 초기화
    }
  });

  const [commonQuestions, setCommonQuestions] = useState<Question[]>([
    {
      id: uuidv4(),
      type: "서술형 질문",
      question: "",
      hasWordLimit: false,
      wordLimit: 500,
      options: [] //객관식 선택지
    }
  ]);

  const handleSelectChange =
    (id: string) => (e: ChangeEvent<HTMLSelectElement>) => {
      const newQuestions = commonQuestions.map((question) =>
        question.id === id
          ? { ...question, type: e.target.value as QuestionType }
          : question
      );
      setCommonQuestions(newQuestions);
    };

  const addNewQuestion = () => {
    const newQuestion: Question = {
      id: uuidv4(),
      type: "서술형 질문",
      question: "",
      hasWordLimit: false,
      wordLimit: 500,
      options: []
    };
    setCommonQuestions([...commonQuestions, newQuestion]);
  };

  const onSubmit = (data: CreateApplicationForm) => {
    console.log(data);
  };

  // useEffect 수정
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".relative")) {
        setOpenDropdowns({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 드롭다운 토글 함수 추가
  const toggleDropdown = (questionId: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  //질문 삭제 함수
  const deleteQuestion = (id: string) => {
    if (commonQuestions.length > 1) {
      setCommonQuestions(
        commonQuestions.filter((question) => question.id !== id)
      );
    }
  };

  return (
    <form className="w-[1016px]" onSubmit={handleSubmit(onSubmit)}>
      {/*지원서 제목*/}
      <div className="ml-8 w-full mt-[26px]">
        <p className="section-title">
          <span className="mr-[0.25em] text-main-100">*</span>지원서 제목
        </p>

        <div className="mt-[12px] h-auto py-[29px] px-[30px] pb-[40px] bg-white-100 rounded-[12px]">
          <input
            type="text"
            alt="지원서 제목 입력"
            placeholder="ex) OO 동아리 5기 지원"
            className={`w-full h-[42px] pl-[21px] rounded-[8px] border outline-none focus:border-main-100 text-subheadline ${
              isSubmitted && errors.title ? "border-red-100" : "border-gray-500"
            }`}
            {...register("title", {
              required: "필수 입력 사항입니다."
            })}
          />
          {isSubmitted && errors.title?.message && (
            <p className="text-state-error">{String(errors.title.message)}</p>
          )}
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
            className="flex items-center text-left w-full h-[42px] pl-[21px] rounded-[8px] border border-gray-500 text-subheadline outline-none focus:border-main-100"
            placeholder="ex) 글자 수를 지키지 않으면 불이익이 있을 수 있습니다. 글자 수를
            유의해 주세요!"
            {...register("commonQuestionCaution")}
          />

          <div className="flex-center my-[42px] border border-gray-200 "></div>

          <p className="mb-[15px] text-title3 text-[#3B3D46] text-left">
            공통 질문 추가하기
          </p>
          <div className="space-y-[34px]">
            {commonQuestions.map((question) => (
              <div
                key={question.id}
                className={`w-full h-auto px-[21px] pt-[20px] pb-[13px] bg-gray-100 rounded-[12px] border ${
                  isSubmitted && errors?.commonQuestions?.[question.id]
                    ? "border-red-100"
                    : "border-gray-300"
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="질문을 작성해 주세요."
                      className="w-[541px] h-[42px] mr-[12px] py-[11px] pl-[19px] rounded-[8px] border border-gray-400 outline-none focus:border-main-100"
                      {...register(`commonQuestions.${question.id}.question`, {
                        required: "질문을 한 가지 이상 추가해 주세요."
                      })}
                    />

                    {/*드롭다운 */}
                    <div className="relative">
                      <button
                        type="button"
                        className="flex items-center w-[247px] h-[42px] pl-[19px] py-[11px] bg-white-100 rounded-[8px] border border-gray-400 outline-none"
                        onClick={() => toggleDropdown(question.id)}
                      >
                        {question.type === "서술형 질문" ? (
                          <div className="flex items-center">
                            <img
                              src="/assets/ic-descriptive.svg"
                              alt=""
                              className="w-5 h-5 mr-[11px]"
                            />
                            <span>서술형 질문</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <img
                              src="/assets/ic-multiple.svg"
                              alt=""
                              className="w-5 h-5 mr-[11px]"
                            />
                            <span>객관형 질문</span>
                          </div>
                        )}
                      </button>
                      {openDropdowns[question.id] && (
                        <div className="absolute top-[44px] left-0 w-[247px] bg-white-100 border border-gray-400 rounded-[8px] z-10">
                          <button
                            type="button"
                            className="flex items-center w-full px-[19px] py-[11px] rounded-[8px]"
                            onClick={() => {
                              handleSelectChange(question.id)({
                                target: { value: "서술형 질문" }
                              } as ChangeEvent<HTMLSelectElement>);
                              setOpenDropdowns((prev) => ({
                                ...prev,
                                [question.id]: false
                              }));
                            }}
                          >
                            <img
                              src="/assets/ic-descriptive.svg"
                              alt=""
                              className="w-5 h-5 mr-2"
                            />
                            <span>서술형 질문</span>
                          </button>
                          <button
                            type="button"
                            className="flex items-center w-full px-[19px] py-[11px] rounded-[8px]"
                            onClick={() => {
                              handleSelectChange(question.id)({
                                target: { value: "객관형 질문" }
                              } as ChangeEvent<HTMLSelectElement>);
                              setOpenDropdowns((prev) => ({
                                ...prev,
                                [question.id]: false
                              }));
                            }}
                          >
                            <img
                              src="/assets/ic-multiple.svg"
                              alt=""
                              className="w-5 h-5 mr-2"
                            />
                            <span>객관형 질문</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/*삭제 버튼 */}
                  <button
                    type="button"
                    onClick={() => deleteQuestion(question.id)}
                    className={`${commonQuestions.length === 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={commonQuestions.length === 1}
                  >
                    <img src="/assets/ic-questionMinus.svg" alt="질문 삭제" />
                  </button>
                </div>

                {question.type === "서술형 질문" ? (
                  //서술형 질문
                  <div>
                    <textarea
                      placeholder="지원자의 답변 작성란 입니다."
                      className="w-full min-h-[91px] mt-[18px] py-[15px] pl-[20px] rounded-[8px] border border-gray-400 outline-none focus:border-main-100"
                      disabled //미리보기용이니까 disabled
                    />
                    <div className="flex-center justify-end mt-[10px]">
                      <input
                        type="checkbox"
                        className="w-[18px] h-[18px] mr-2 cursor-pointer 
                          appearance-none
                          checked:bg-main-100 
                          border border-gray-300 rounded"
                      />
                      <label className="flex">
                        글자 수 제한
                        <input
                          type="number"
                          placeholder="500"
                          min="0"
                          className="flex-center w-[66px] h-[26px] ml-[7px] px-[9px] py-[5px] rounded-[6px] border border-gray-400 outline-none text-caption2 focus:border-main-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  //객관형 질문
                  <div>
                    <input
                      type="text"
                      placeholder="선택지 추가"
                      className="flex w-[584px] h-[36px] mt-[18px] pl-[13px] py-[10px] border border-gray-500 rounded-[6px] outline-none focus:border-main-100"
                      {...register(`commonQuestions.${question.id}.options`, {
                        required: "질문을 한 가지 이상 추가해 주세요."
                      })}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          {isSubmitted &&
            Object.keys(errors?.commonQuestions || {}).length > 0 && (
              <p className="text-state-error">
                질문을 한 가지 이상 추가해 주세요.
              </p>
            )}

          {/*버튼, 그룹으로 묶어서 색 변환 처리 */}
          <button
            type="button"
            className="flex-center w-full h-[54px] mt-[34px] bg-main-300 border border-main-400 rounded-[8px] text-main-100 hover:bg-main-100 hover:text-white-100 group" // group 추가
            onClick={addNewQuestion}
          >
            <div className="relative mr-2">
              <img
                alt="질문 추가 버튼"
                src="/assets/ic-mainColorPlus.svg"
                className="group-hover:opacity-0 "
              />
              <img
                alt="질문 추가 버튼"
                src="/assets/ic-whiteColorPlus.svg"
                className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 "
              />
            </div>
            질문 추가하기
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
              {...register("hasPortfolio")}
            />
            포트폴리오 받기
          </label>
        </div>
        <div className="flex-center w-full min-h-[207px] mt-[12px] bg-white-100 rounded-[12px]">
          {watch("hasPortfolio") && (
            <div className="tooltip">
              이후 지원자의 저장된 포트폴리오를 불러옵니다.
            </div>
          )}
        </div>
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
