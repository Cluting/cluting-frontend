//2-5 지원서 폼 제작 및 공고 올리기 (컨테이너)
import { ReactElement, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  useGroupStore,
  useRecruitmentStepStore,
  useStepTwoStore,
  useInterviewStore
} from "../../../../store/useStore";
import { BUTTON_TEXT } from "../../../../constants/recruting";
import ApplicantProfile from "./ApplicantProfile";
import StepCompleteModal from "../../common/StepCompleteModal";
import QuestionItem from "./QuestionItem"; // 이 부분 추가

export default function CreateApplicationFormContainer(): ReactElement {
  const { group } = useGroupStore();
  const { setStepCompleted, steps } = useStepTwoStore();
  const { completedSteps, completeStep } = useRecruitmentStepStore();

  const { interviewStartTime, interviewEndTime } = useInterviewStore();
  const titleRef = useRef<HTMLInputElement>(null);
  const commonCautionRef = useRef<HTMLTextAreaElement>(null);

  //그룹별 질문 - 지원 그룹 상태 관리
  const [selectedGroup, setSelectedGroup] = useState<string>(
    group[0]?.name || ""
  );
  const [isStepCompleteModalOpen, setStepCompleteModalOpen] = useState(false);

  // 초기 질문
  const createInitialQuestion = (
    type: "서술형 질문" | "객관형 질문" = "서술형 질문"
  ): Question => {
    if (type === "서술형 질문") {
      return {
        id: uuidv4(),
        type: "서술형 질문",
        question: "",
        hasWordLimit: false,
        wordLimit: 500,
        options: []
      };
    } else {
      return {
        id: uuidv4(),
        type: "객관형 질문",
        question: "",
        options: []
      };
    }
  };

  // 질문 상태 관리
  const [commonQuestions, setCommonQuestions] = useState<
    Record<string, Question>
  >(() => {
    const initial = createInitialQuestion();
    return {
      [initial.id]: initial
    };
  });

  const [groupQuestions, setGroupQuestions] = useState<
    Record<string, QuestionSection>
  >(() => {
    return group.reduce((acc, g) => {
      const initial = createInitialQuestion();
      return {
        ...acc,
        [g.name]: {
          caution: "",
          questions: {
            [initial.id]: initial
          }
        }
      };
    }, {});
  });

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitted },
    setValue,
    getValues,
    setError
  } = useForm<CreateApplicationForm>({
    defaultValues: {
      title: "",
      commonSection: {
        caution: "",
        questions: commonQuestions
      },
      groupSections: groupQuestions,
      portfolio: {
        enabled: false
      },
      multipleApplicationAllowed: false
    },
    mode: "onBlur"
  });

  // 핸들러 함수들
  const handleStepTwoSubmit = () => {
    if (!completedSteps[0]) {
      setStepCompleteModalOpen(true);
    }
  };

  const handleCloseStepCompleteModal = () => setStepCompleteModalOpen(false);

  const handleConfirmStepComplete = () => {
    completeStep(1);
    setStepCompleted(4, true);
    setStepCompleteModalOpen(false);
  };

  const handleGroupClick = (groupName: string) => setSelectedGroup(groupName);

  // 질문 관리 함수들
  const addQuestion = (section: "common" | string) => {
    const newQuestion = createInitialQuestion();

    if (section === "common") {
      setCommonQuestions((prev) => ({
        ...prev,
        [newQuestion.id]: newQuestion
      }));
      setValue(`commonSection.questions.${newQuestion.id}`, newQuestion);
    } else {
      setGroupQuestions((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          questions: {
            ...prev[section].questions,
            [newQuestion.id]: newQuestion
          }
        }
      }));
      setValue(
        `groupSections.${section}.questions.${newQuestion.id}`,
        newQuestion
      );
    }
  };

  const deleteQuestion = (section: "common" | string, questionId: string) => {
    if (section === "common") {
      if (Object.keys(commonQuestions).length <= 1) return;
      const newQuestions = { ...commonQuestions };
      delete newQuestions[questionId];
      setCommonQuestions(newQuestions);
      const { [questionId]: _, ...rest } = getValues("commonSection.questions");
      setValue("commonSection.questions", rest);
    } else {
      const sectionQuestions = groupQuestions[section].questions;
      if (Object.keys(sectionQuestions).length <= 1) return;

      setGroupQuestions((prev) => {
        const newQuestions = { ...prev[section].questions };
        delete newQuestions[questionId];
        return {
          ...prev,
          [section]: {
            ...prev[section],
            questions: newQuestions
          }
        };
      });
      const { [questionId]: _, ...rest } = getValues(
        `groupSections.${section}.questions`
      );
      setValue(`groupSections.${section}.questions`, rest);
    }
  };

  const handleQuestionTypeChange = (
    section: "common" | string,
    questionId: string,
    newType: "서술형 질문" | "객관형 질문"
  ) => {
    const createNewQuestion = (oldQuestion: Question): Question => {
      const baseQuestion = {
        id: questionId,
        question: oldQuestion.question
      };

      if (newType === "서술형 질문") {
        return {
          ...baseQuestion,
          type: "서술형 질문",
          hasWordLimit: false,
          wordLimit: 500,
          options: []
        };
      } else {
        return {
          ...baseQuestion,
          type: "객관형 질문",
          options: []
        };
      }
    };

    if (section === "common") {
      setCommonQuestions((prev) => {
        const updatedQuestion = createNewQuestion(prev[questionId]);
        setValue(`commonSection.questions.${questionId}`, updatedQuestion);
        return {
          ...prev,
          [questionId]: updatedQuestion
        };
      });
    } else {
      setGroupQuestions((prev) => {
        const updatedQuestion = createNewQuestion(
          prev[section].questions[questionId]
        );
        setValue(
          `groupSections.${section}.questions.${questionId}`,
          updatedQuestion
        );
        return {
          ...prev,
          [section]: {
            ...prev[section],
            questions: {
              ...prev[section].questions,
              [questionId]: updatedQuestion
            }
          }
        };
      });
    }
  };

  const addOption = (
    section: "common" | string,
    questionId: string,
    value: string
  ) => {
    const newOption = { id: uuidv4(), value };

    if (section === "common") {
      setCommonQuestions((prev) => {
        const question = prev[questionId];
        if (question.type !== "객관형 질문") return prev;

        const updatedQuestion = {
          ...question,
          options: [...question.options, newOption]
        };

        // form 값도 업데이트
        setValue(`commonSection.questions.${questionId}`, updatedQuestion);

        return {
          ...prev,
          [questionId]: updatedQuestion
        };
      });
    } else {
      setGroupQuestions((prev) => {
        const groupQuestions = prev[section];
        const question = groupQuestions.questions[questionId];
        if (question.type !== "객관형 질문") return prev;

        const updatedQuestion = {
          ...question,
          options: [...question.options, newOption]
        };

        // form 값도 업데이트
        setValue(
          `groupSections.${section}.questions.${questionId}`,
          updatedQuestion
        );

        return {
          ...prev,
          [section]: {
            ...groupQuestions,
            questions: {
              ...groupQuestions.questions,
              [questionId]: updatedQuestion
            }
          }
        };
      });
    }
  };

  const removeOption = (
    section: "common" | string,
    questionId: string,
    optionId: string
  ) => {
    if (section === "common") {
      setCommonQuestions((prev) => {
        const question = prev[questionId];
        if (question.type !== "객관형 질문") return prev;

        const updatedQuestion = {
          ...question,
          options: question.options.filter((opt) => opt.id !== optionId)
        };

        // form 값도 업데이트
        setValue(`commonSection.questions.${questionId}`, updatedQuestion);

        return {
          ...prev,
          [questionId]: updatedQuestion
        };
      });
    } else {
      setGroupQuestions((prev) => {
        const groupQuestions = prev[section];
        const question = groupQuestions.questions[questionId];
        if (question.type !== "객관형 질문") return prev;

        const updatedQuestion = {
          ...question,
          options: question.options.filter((opt) => opt.id !== optionId)
        };

        // form 값도 업데이트
        setValue(
          `groupSections.${section}.questions.${questionId}`,
          updatedQuestion
        );

        return {
          ...prev,
          [section]: {
            ...groupQuestions,
            questions: {
              ...groupQuestions.questions,
              [questionId]: updatedQuestion
            }
          }
        };
      });
    }
  };

  // Submit 핸들러
  const onSubmit = async (data: CreateApplicationForm) => {
    try {
      if (Object.keys(data.commonSection.questions).length === 0) {
        setError("commonSection", {
          type: "manual",
          message: "최소 한 개의 공통 질문이 필요합니다."
        });
        return;
      }

      if (group.length > 0) {
        for (const groupName of group.map((g) => g.name)) {
          if (
            Object.keys(data.groupSections[groupName].questions).length === 0
          ) {
            setError(`groupSections.${groupName}`, {
              type: "manual",
              message: "각 그룹별로 최소 한 개의 질문이 필요합니다."
            });
            return;
          }
        }
      }

      console.log(data);
      handleStepTwoSubmit();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form className="mb-[147px] w-[1016px]" onSubmit={handleSubmit(onSubmit)}>
      <div className={`${steps[4].completed ? "pointer-events-none" : ""}`}>
        {/* 지원서 제목 */}
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
                errors.title ? "border-red-100" : "border-gray-500"
              }`}
              {...register("title", {
                required: "필수 입력 사항입니다.",
                onBlur: (e) => {
                  if (!e.target.value) {
                    setError("title", {
                      type: "manual",
                      message: "필수 입력 사항입니다."
                    });
                  }
                }
              })}
            />
            {errors.title?.message && (
              <p className="text-state-error">{String(errors.title.message)}</p>
            )}
          </div>

          <ApplicantProfile />
        </div>

        {/* 지원 그룹 */}
        {group.length > 0 && (
          <div className="ml-8 w-full mt-[34px]">
            <div className="flex">
              <p className="section-title">지원 그룹</p>
              <div className="tooltip">
                미리 설정한 그룹에 따라 지원자들이 지원할 그룹을 선택합니다.
              </div>
            </div>
            <div className="mt-[12px] h-auto px-[31px] pt-[25px] pb-[29px] bg-white-100 rounded-[12px]">
              <div className="flex items-left gap-[11px]">
                {group.map((groupName) => (
                  <div className="flex-center w-[225px] h-[50px] border rounded-[11px] bg-gray-100 text-callout">
                    {groupName.name}
                  </div>
                ))}
              </div>

              <label className="relative flex items-center mt-[14px] text-subheadline text-gray-900">
                <input
                  type="checkbox"
                  className=" peer w-[18px] h-[18px] mr-2 cursor-pointer appearance-none checked:bg-main-100 border border-gray-300 rounded"
                  {...register("multipleApplicationAllowed")}
                />
                <img
                  src="/assets/ic-check.svg" // 흰색 체크표시만 있는 SVG
                  alt=""
                  className="absolute left-[3px] top-[4px] w-[12px] h-[12px] pointer-events-none opacity-0 peer-checked:opacity-100"
                />
                다중 지원 가능
                <span className="ml-[11px] text-main-100 text-caption3">
                  동아리 지원자는 2개 이상의 그룹으로 지원할 수 있습니다.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* 공통 질문 섹션 */}
        <div className="ml-8 w-full mt-[58px]">
          <div className="flex">
            <p className="section-title">
              <span className="mr-[0.25em] text-main-100">*</span>공통 질문
              만들기
            </p>
            <div className="tooltip">공통 질문을 작성해 주세요.</div>
          </div>

          <div className="mt-[12px] h-auto pt-[32px] pl-[31px] pr-[42px] pb-[32px] bg-white-100 rounded-[12px]">
            {/* 공통 질문 주의사항 */}
            <p className="mb-[15px] text-title3 text-gray-1100 text-left">
              공통 질문 관련 주의 사항
            </p>
            <input
              type="text"
              placeholder="ex) 글자 수를 지키지 않으면 불이익이 있을 수 있습니다. 글자 수를 유의해 주세요!"
              className="w-full h-[42px] p-[11px] rounded-[8px] border border-gray-500 text-subheadline resize-none focus:border-main-100 outline-none"
              {...register("commonSection.caution")}
            />

            <div className="flex-center my-[42px] border border-gray-200" />

            {/* 공통 질문 목록 */}
            <p className="mb-[15px] text-title3 text-gray-1100 text-left">
              공통 질문 추가하기
            </p>
            <div className="space-y-4">
              {Object.values(commonQuestions).map((question) => (
                <QuestionItem
                  key={question.id}
                  section="common"
                  question={question}
                  registerPath={`commonSection.questions.${question.id}`}
                  onTypeChange={handleQuestionTypeChange}
                  onDelete={deleteQuestion}
                  onAddOption={addOption}
                  onRemoveOption={removeOption}
                  register={register}
                  errors={errors}
                  isSubmitted={isSubmitted}
                  setError={setError}
                  totalQuestions={Object.keys(commonQuestions).length}
                />
              ))}
            </div>

            {/* 질문 추가 버튼 */}
            <button
              type="button"
              className="flex-center w-full h-[54px] mt-[34px] bg-main-300 border border-main-400 rounded-[8px] text-main-100 hover:bg-main-100 hover:text-white-100 group"
              onClick={() => addQuestion("common")}
            >
              <div className="relative mr-2">
                <img
                  alt="질문 추가 버튼"
                  src="/assets/ic-mainColorPlus.svg"
                  className="group-hover:opacity-0"
                />
                <img
                  alt="질문 추가 버튼"
                  src="/assets/ic-whiteColorPlus.svg"
                  className="absolute top-0 left-0 opacity-0 group-hover:opacity-100"
                />
              </div>
              질문 추가하기
            </button>
          </div>
        </div>

        {/* 그룹별 질문 섹션 */}
        {group.length > 0 && (
          <div className="ml-8 w-full mt-[58px]">
            <div className="flex">
              <p className="section-title">
                <span className="mr-[0.25em] text-main-100">*</span>그룹별 질문
              </p>
              <div className="tooltip">각 그룹별 질문을 작성해 주세요.</div>
            </div>

            <div className="mt-[12px] h-auto pt-[32px] pl-[31px] pr-[42px] pb-[32px] bg-white-100 rounded-[12px]">
              {/* 그룹 선택 */}
              <p className="text-title3 text-gray-1100 text-left">지원 그룹</p>
              <div className="flex items-left mt-[11px] gap-[11px]">
                {group.map((groupName) => (
                  <button
                    key={groupName.name}
                    type="button"
                    className={`w-[225px] h-[50px] border rounded-[11px] flex-center text-callout ${
                      selectedGroup === groupName.name
                        ? "bg-main-100 text-white-100 border-main-100"
                        : "bg-white-100 text-[#43454F] border-gray-300 hover:bg-main-100 hover:text-white-100"
                    }`}
                    onClick={() => handleGroupClick(groupName.name)}
                  >
                    {groupName.name}
                  </button>
                ))}
              </div>

              <div className="flex-center my-[42px] border border-gray-200" />

              {/* 그룹별 주의사항 */}
              <p className="mb-[15px] text-title3 text-gray-1100 text-left">
                '{selectedGroup}' 그룹 질문 관련 주의 사항
              </p>

              <input
                type="text"
                key={selectedGroup}
                className="w-full h-[42px] p-[11px] rounded-[8px] border border-gray-500 text-subheadline resize-none focus:border-main-100 outline-none"
                placeholder="ex) 글자 수를 지키지 않으면 불이익이 있을 수 있습니다. 글자 수를 유의해 주세요!"
                {...register(`groupSections.${selectedGroup}.caution`)}
              />
              <div className="flex-center my-[42px] border border-gray-200" />

              {/* 그룹별 질문 목록 */}
              <p className="mb-[15px] text-title3 text-gray-1100 text-left">
                그룹별 질문 추가하기
              </p>
              <div className="space-y-4">
                {Object.values(groupQuestions[selectedGroup].questions).map(
                  (question) => (
                    <QuestionItem
                      key={question.id}
                      section={selectedGroup}
                      question={question}
                      registerPath={`groupSections.${selectedGroup}.questions.${question.id}`} // 추가
                      onTypeChange={handleQuestionTypeChange}
                      onDelete={deleteQuestion}
                      onAddOption={addOption}
                      onRemoveOption={removeOption}
                      register={register}
                      errors={errors}
                      isSubmitted={isSubmitted}
                      setError={setError}
                      totalQuestions={
                        Object.keys(groupQuestions[selectedGroup].questions)
                          .length
                      }
                    />
                  )
                )}
              </div>

              {/* 질문 추가 버튼 */}
              <button
                type="button"
                className="flex-center w-full h-[54px] mt-[34px] bg-main-300 border border-main-400 rounded-[8px] text-main-100 hover:bg-main-100 hover:text-white-100 group"
                onClick={() => addQuestion(selectedGroup)}
              >
                <div className="relative mr-2">
                  <img
                    alt="질문 추가 버튼"
                    src="/assets/ic-mainColorPlus.svg"
                    className="group-hover:opacity-0"
                  />
                  <img
                    alt="질문 추가 버튼"
                    src="/assets/ic-whiteColorPlus.svg"
                    className="absolute top-0 left-0 opacity-0 group-hover:opacity-100"
                  />
                </div>
                질문 추가하기
              </button>
            </div>
          </div>
        )}

        {/* 포트폴리오 섹션 */}
        <div className="ml-8 w-full mt-[58px]">
          <div className="flex items-center">
            <p className="section-title">포트폴리오</p>
            <label className="relative flex-center text-subheadline text-gray-900">
              <input
                type="checkbox"
                className="peer w-[18px] h-[18px] mr-2 cursor-pointer appearance-none checked:bg-main-100 border border-gray-300 rounded"
                {...register("portfolio.enabled")}
              />
              <img
                src="/assets/ic-check.svg" // 흰색 체크표시만 있는 SVG
                alt=""
                className="absolute left-[3px] top-[4px] w-[12px] h-[12px] pointer-events-none opacity-0 peer-checked:opacity-100"
              />
              포트폴리오 받기
            </label>
          </div>
          <div className="flex-center w-full min-h-[207px] mt-[12px] bg-white-100 rounded-[12px]">
            {watch("portfolio.enabled") && (
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
              앞서 정해진 면접 일정을 바탕으로, 지원자들이 면접 시간을
              선택합니다.
            </div>
          </div>
          <div className="w-full mt-[12px] px-[30px] py-[20.5px] bg-white-100 rounded-[12px]">
            <div className="flex flex-col gap-[12px] py-[28px] px-[26px] bg-[#FBFBFF] rounded-[12px] border border-gray-300 text-caption1 text-gray-1100">
              {/*이렇게 한 묶음 */}
              <div className="flex">
                <div className="flex-center mr-[13px] w-[88px] h-[28px] bg-gray-200 border border-[#E5E5EA] rounded-[6px]">
                  12일 화요일
                </div>
                <div className="flex gap-[7px]">
                  <div className="flex-center w-[78px] h-[28px] bg-white-100 border border-[#E5E5EA] rounded-[6px]">
                    10:00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 하단 버튼 */}
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleStepTwoSubmit}
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
            steps[4].completed
              ? "bg-main-400 border border-main-100 text-main-100"
              : "bg-main-100 text-white-100"
          } text-body flex-center hover:bg-main-500`}
        >
          {steps[4].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
        </button>
      </div>

      {/* 모달 */}
      {isStepCompleteModalOpen && (
        <StepCompleteModal
          onClose={handleCloseStepCompleteModal}
          onConfirm={handleConfirmStepComplete}
          stepIndex={1}
        />
      )}

      {/* 하단 알림 */}
      {!steps[4].completed ? (
        <div className="fixed animate-dropdown bottom-[16px]">
          <div className="relative custom-shadow ml-8 w-[1016px] h-[79px] bg-main-300 border border-main-400 rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800">
            우리 동아리에 지원하는 지원자의 입장으로 보고싶으신가요?
            <button
              type="button"
              className="absolute right-[15px] bg-gray-1100 hover:bg-gray-1300 text-white-100 py-[13px] px-[25px] rounded-[10px]"
            >
              미리보기
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed animate-dropdown bottom-[16px]">
          <div className="relative custom-shadow ml-8 w-[1016px] h-[79px] bg-main-300 border border-main-400 rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800">
            모든 준비 단계가 완료되었습니다. 최종적으로 모집 공고를 업로드해
            주세요.
            <button
              type="button"
              className="absolute right-[15px] bg-main-100 hover:bg-main-500 text-white-100 py-[13px] px-[25px] rounded-[10px]"
            >
              공고 올리기
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
