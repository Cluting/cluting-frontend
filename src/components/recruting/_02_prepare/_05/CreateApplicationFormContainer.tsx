import { ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  useGroupStore,
  useRecruitmentStepStore,
  useStepTwoStore
} from "../../../../store/useStore";
import { BUTTON_TEXT } from "../../../../constants/recruting";
import ApplicantProfile from "./ApplicantProfile";
import StepCompleteModal from "../../common/StepCompleteModal";
import QuestionItem from "./QuestionItem";
import InterviewTimeSelector from "./InterviewTimeSelector";
import { ReactComponent as IdealIcon } from "../../../../assets/ic-plus.svg";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postPrepare5, getPrepare5, patchPrepare5 } from "./service/Step5";

export default function CreateApplicationFormContainer(): ReactElement {
  const { group } = useGroupStore();
  const { setStepCompleted, steps } = useStepTwoStore();
  const { completedSteps, completeStep } = useRecruitmentStepStore();

  // 공고 올리기 팝업
  const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  //GET
  const recruitId = 1;
  const { data: formData, isLoading } = useQuery(
    ["applicationForm", recruitId],
    () => getPrepare5(recruitId),
    {
      onSuccess: (data) => {
        if (data) {
          if (data) {
            setStepCompleted(4, true);
          }
          // Update form with fetched data
          const fetchedQuestions = data.partQuestions || [];

          // 받아온 데이터에서 Back을 공통으로 변환
          const transformedQuestions = fetchedQuestions.map(
            (question: PartQuestion) => ({
              ...question,
              partName:
                question.partName === "Back" ? "공통" : question.partName
            })
          );

          // 공통 파트가 없으면 새로 생성
          const updatedQuestions = [
            {
              partName: "공통",
              caution: "",
              questions: [createInitialQuestion()]
            },
            ...transformedQuestions.filter(
              (question: PartQuestion) => question.partName !== "공통"
            )
          ];

          setQuestions(updatedQuestions);

          // form 값들 설정
          setValue("title", data.title || "");
          setValue("multiApply", data.multiApply ?? true);
          setValue("isPortfolioRequired", data.isPortfolioRequired ?? true);
          setValue("partQuestions", updatedQuestions);
          console.log("2-5 조회 성공!");
        }
      },
      onError: (error) => {
        console.error("폼 데이터 조회 실패:", error);
      }
    }
  );

  // 불러온 2-5 데이터 있을 경우 2-5 완료 처리
  useEffect(() => {
    if (formData) {
      setStepCompleted(4, true);
    }
  }, [setStepCompleted]);

  const queryClient = useQueryClient();

  //POST
  const createFormMutation = useMutation(
    (data: { formData: CreateApplicationForm; recruitId: number }) =>
      postPrepare5(data.formData, data.recruitId),
    {
      onSuccess: (data) => {
        console.log("폼 생성 성공:", data);
        // POST 성공 후 GET 쿼리 무효화 -> 새로운 데이터 자동 불러오기
        queryClient.invalidateQueries(["applicationForm", recruitId]);
        handleStepTwoSubmit();
      },
      onError: (error) => {
        console.error("폼 생성 실패:", error);
      }
    }
  );

  //PATCH
  const patchMutation = useMutation(
    (data: { formData: CreateApplicationForm; recruitId: number }) =>
      patchPrepare5(data.formData, data.recruitId),
    {
      onSuccess: (data) => {
        console.log("모집하기5 PATCH 성공", data);
        // PATCH 성공 후 GET 쿼리 무효화 -> 새로운 데이터 자동 불러오기
        queryClient.invalidateQueries(["applicationForm", recruitId]);
      },
      onError: (error: any) => {
        console.error(`모집하기5 PATCH 실패`, error);
        // 에러가 나도 UI는 업데이트
        setStepCompleted(4, true);
        setIsEditMode(false);
      }
    }
  );

  // 선택된 그룹 상태 관리
  const [selectedGroup, setSelectedGroup] = useState<string>(
    group[0]?.name || ""
  );
  const [isStepCompleteModalOpen, setStepCompleteModalOpen] = useState(false);

  // 초기 질문 생성 함수
  const createInitialQuestion = (
    type: "SUBJECT" | "OBJECT" = "OBJECT"
  ): Question => ({
    id: uuidv4(),
    content: "",
    questionType: type,
    hasWordLimit: true,
    wordLimit: 500,
    objects: [],
    multiSelect: true
  });

  const [questions, setQuestions] = useState<PartQuestion[]>([
    // 공통 질문 초기값
    {
      partName: "공통",
      caution: "",
      questions: [createInitialQuestion()]
    },
    // 그룹별 질문 초기값
    ...group.map((g) => ({
      partName: g.name,
      caution: "",
      questions: [createInitialQuestion()]
    }))
  ]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitted },
    setError
  } = useForm<CreateApplicationForm>({
    defaultValues: {
      title: "",
      partQuestions: questions,
      multiApply: true,
      isPortfolioRequired: true
    }
  });

  const handleStepTwoSubmit = () => {
    if (!completedSteps[0]) {
      setStepCompleteModalOpen(true);
    }
  };

  const handleButtonClick = () => {
    if (steps[4].completed && !isEditMode) {
      setIsEditMode(true);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  const handleCloseStepCompleteModal = () => setStepCompleteModalOpen(false);

  const handleConfirmStepComplete = () => {
    completeStep(1, true);
    setStepCompleted(4, true);
    setStepCompleteModalOpen(false);
  };

  const handleGroupClick = (partName: string) => setSelectedGroup(partName);

  const addQuestion = (partName: string) => {
    console.log("Adding question to:", partName); // 디버깅용
    console.log("Current questions:", questions); // 디버깅용
    setQuestions((prev) =>
      prev.map((part) => {
        if (part.partName !== partName) return part;

        return {
          ...part,
          questions: [...part.questions, createInitialQuestion()]
        };
      })
    );
  };

  const deleteQuestion = (partName: string, questionId: string) => {
    setQuestions((prev) =>
      prev.map((part) => {
        if (part.partName !== partName) return part;
        if (part.questions.length <= 1) return part;

        return {
          ...part,
          questions: part.questions.filter((q) => q.id !== questionId)
        };
      })
    );
  };

  const handleQuestionTypeChange = (
    partName: string,
    questionId: string,
    newType: "OBJECT" | "SUBJECT"
  ) => {
    setQuestions((prev) =>
      prev.map((part) => {
        if (part.partName !== partName) return part;

        return {
          ...part,
          questions: part.questions.map((q) => {
            if (q.id !== questionId) return q;

            return {
              ...q,
              questionType: newType,
              hasWordLimit: true,
              wordLimit: 0,
              objects: [],
              multiSelect: true
            };
          })
        };
      })
    );
  };

  const handleAddOption = (
    partName: string,
    questionId: string,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((part) => {
        if (part.partName !== partName) return part;

        return {
          ...part,
          questions: part.questions.map((q) => {
            if (q.id !== questionId) return q;
            if (q.questionType !== "OBJECT") return q;

            return {
              ...q,
              objects: [...(q.objects || []), value]
            };
          })
        };
      })
    );
  };

  const handleRemoveOption = (
    partName: string,
    questionId: string,
    optionIndex: number
  ) => {
    setQuestions((prev) =>
      prev.map((part) => {
        if (part.partName !== partName) return part;

        return {
          ...part,
          questions: part.questions.map((q) => {
            if (q.id !== questionId) return q;
            if (q.questionType !== "OBJECT") return q;

            return {
              ...q,
              objects: q.objects?.filter((_, index) => index !== optionIndex)
            };
          })
        };
      })
    );
  };

  const onSubmit = async (data: CreateApplicationForm) => {
    try {
      const commonPart = data.partQuestions.find((p) => p.partName === "공통");
      if (!commonPart || commonPart.questions.length === 0) {
        setError("partQuestions", {
          type: "manual",
          message: "최소 한 개의 공통 질문이 필요합니다."
        });
        return;
      }

      // API 제출용 데이터 준비
      const submitData = {
        title: data.title,
        multiApply: data.multiApply,
        isPortfolioRequired: data.isPortfolioRequired,
        partQuestions: data.partQuestions.map((part) => ({
          ...part,
          partName: part.partName === "공통" ? "공통" : part.partName,
          caution: part.caution,
          questions: part.questions.map((question) => {
            const baseQuestion = {
              content: question.content,
              questionType: question.questionType,
              hasWordLimit: true,
              wordLimit: 0
            };

            if (question.questionType === "OBJECT") {
              return {
                ...baseQuestion,
                objects: question.objects || [], // 빈 배열이라도 반드시 포함
                multiSelect: question.multiSelect || false
              };
            }

            return {
              ...baseQuestion,
              objects: [],
              multiSelect: false
            };
          })
        }))
      };
      console.log(submitData);
      const recruitId = 1; //todo: 일단 임시로
      if (steps[4].completed) {
        //수정하기 버튼인 경우 -> PATCH 요청
        await patchMutation.mutateAsync({ formData: submitData, recruitId });
        setStepCompleted(4, false); // PATCH 성공 후 완료하기
      } else {
        //완료하기 버튼인 경우 -> POST 요청
        await createFormMutation.mutateAsync({
          formData: submitData,
          recruitId
        });
        setStepCompleted(4, true); // POST 성공 후 수정하기
      }
    } catch (error) {
      console.error("제출 중 에러 발생:", error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (uploadPopupOpen) {
      timer = setTimeout(() => {
        setUploadPopupOpen(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [uploadPopupOpen]);

  // //제출한 데이터 있을 경우 해당 단계 완료 처리
  useEffect(() => {
    if (formData) {
      setStepCompleted(4, true);
    }
  }, [formData, setStepCompleted]);

  return (
    <form
      className="ml-8 mt-[25px] mb-[147px] w-[1016px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={`${steps[4].completed && !isEditMode ? "pointer-events-none" : ""}`}
      >
        {/* 지원서 제목 */}
        <div className="w-full ">
          <p className="section-title">
            <span className="mr-[0.25em] text-main-100">*</span>지원서 제목
          </p>
          <div className="mt-3 h-auto py-[29px] px-[30px] bg-white-100 rounded-[12px]">
            <input
              type="text"
              alt="지원서 제목 입력"
              placeholder="ex) OO 동아리 5기 지원"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              className={`w-full h-[42px] pl-[21px] rounded-[8px] border outline-none focus:border-main-100 text-subheadline ${
                errors.title ? "border-red-100" : "border-gray-500"
              }`}
              {...register("title", {
                required: "필수 입력 사항입니다."
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
          <div className="w-full mt-[34px]">
            <div className="flex">
              <p className="section-title">지원 그룹</p>
              <div className="tooltip">
                미리 설정한 그룹에 따라 지원자들이 지원할 그룹을 선택합니다.
              </div>
            </div>
            <div className="mt-[12px] h-auto px-[31px] pt-[25px] pb-[29px] bg-white-100 rounded-[12px]">
              <div className="flex items-left gap-[11px]">
                {group.map((partName, index) => (
                  <div
                    key={`group-${partName.name}-${index}`}
                    className="flex-center w-[225px] h-[50px] border rounded-[11px] bg-gray-100 text-callout"
                  >
                    {partName.name}
                  </div>
                ))}
              </div>

              <label className="relative flex items-center mt-[14px] text-subheadline text-gray-900">
                <input
                  type="checkbox"
                  className=" peer w-[18px] h-[18px] mr-2 cursor-pointer appearance-none checked:bg-main-100 border border-gray-300 rounded"
                  {...register("multiApply", {
                    value: true // 초기값
                  })}
                  onChange={(e) => {
                    setValue("multiApply", e.target.checked);
                    console.log("체크박스 변경:", e.target.checked);
                  }}
                />
                <img
                  src="/assets/ic-check.svg"
                  alt=""
                  className="absolute left-[3px] top-[5px] w-[11px] h-[11px] pointer-events-none opacity-0 peer-checked:opacity-100"
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
        <div className=" w-full mt-[58px]">
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              placeholder="ex) 글자 수를 지키지 않으면 불이익이 있을 수 있습니다. 글자 수를 유의해 주세요!"
              className="w-full h-[42px] p-[11px] rounded-[8px] border border-gray-500 text-subheadline resize-none focus:border-main-100 outline-none"
              {...register(
                `partQuestions.${questions.findIndex((p) => p.partName === "공통")}.caution`
              )}
            />

            <hr className="flex-center my-[42px]" />

            {/* 공통 질문 목록 */}
            <p className="mb-[15px] text-title3 text-gray-1100 text-left">
              공통 질문 추가하기
            </p>
            <div className="space-y-4">
              {questions
                .find((p) => p.partName === "공통")
                ?.questions.map((question, index) => (
                  <QuestionItem
                    key={question.id}
                    question={question}
                    partName="공통"
                    questionIndex={index}
                    partIndex={questions.findIndex(
                      (p) => p.partName === "공통"
                    )}
                    onTypeChange={handleQuestionTypeChange}
                    onDelete={deleteQuestion}
                    onAddOption={handleAddOption}
                    onRemoveOption={handleRemoveOption}
                    register={register}
                    errors={errors}
                    isSubmitted={isSubmitted}
                    setValue={setValue}
                    watch={watch}
                  />
                ))}
            </div>

            <button
              type="button"
              onClick={() => addQuestion("공통")}
              className="flex-center w-full h-[54px] mt-[34px] bg-main-300 border border-main-400 rounded-[8px] text-callout text-main-100 hover:bg-main-100 hover:text-white-100"
            >
              <IdealIcon className="mr-2" />
              질문 추가하기
            </button>
          </div>
        </div>

        {/* 그룹별 질문 섹션 */}
        {group.length > 0 && (
          <div className="w-full mt-[58px]">
            <div className="flex">
              <p className="section-title">
                <span className="mr-[0.25em] text-main-100">*</span>그룹별 질문
              </p>
              <div className="tooltip">각 그룹별 질문을 작성해 주세요.</div>
            </div>

            {/* 그룹 선택 탭 */}
            <div className="flex">
              {group.map((partName, index) => (
                <button
                  key={`${partName.name}-${index}`}
                  type="button"
                  onClick={() => handleGroupClick(partName.name)}
                  className={`flex-center mt-3 w-[162px] min-h-[43px] rounded-t-[11px] border border-b-0 text-callout ${
                    selectedGroup === partName.name
                      ? "bg-main-100 text-white-100 border-main-100"
                      : "bg-gray-100 text-[#43454F] border-gray-200 hover:bg-main-100 hover:text-white-100"
                  }`}
                >
                  {partName.name}
                </button>
              ))}
            </div>

            {/* 선택된 그룹의 질문 섹션 */}
            <div className="h-auto px-9 py-[28px] bg-white-100 rounded-[12px]">
              <p className="mb-[15px] text-title3 text-gray-1100 text-left">
                '{selectedGroup}' 그룹 질문 관련 주의 사항
              </p>

              <input
                key={`${selectedGroup}-caution`}
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                placeholder="ex) 글자 수를 지키지 않으면 불이익이 있을 수 있습니다. 글자 수를 유의해 주세요!"
                className="w-full h-[42px] p-[11px] rounded-[8px] border border-gray-500 text-subheadline resize-none focus:border-main-100 outline-none"
                {...register(
                  `partQuestions.${questions.findIndex((p) => p.partName === selectedGroup)}.caution`
                )}
              />
              <hr className="flex-center my-[42px]" />

              <p className="mb-[20px] text-title3 text-gray-1100 text-left">
                그룹별 질문 추가하기
              </p>
              <div className="space-y-4">
                {questions
                  .find((p) => p.partName === selectedGroup)
                  ?.questions.map((question, index) => (
                    <QuestionItem
                      key={question.id}
                      question={question}
                      partName={selectedGroup}
                      questionIndex={index}
                      partIndex={questions.findIndex(
                        (p) => p.partName === selectedGroup
                      )}
                      onTypeChange={handleQuestionTypeChange}
                      onDelete={deleteQuestion}
                      onAddOption={handleAddOption}
                      onRemoveOption={handleRemoveOption}
                      register={register}
                      errors={errors}
                      isSubmitted={isSubmitted}
                      setValue={setValue}
                      watch={watch}
                    />
                  ))}
              </div>
              <button
                type="button"
                onClick={() => addQuestion(selectedGroup)}
                className="flex-center w-full h-[54px] mt-[34px] bg-main-300 border border-main-400 rounded-[8px] text-callout text-main-100 hover:bg-main-100 hover:text-white-100"
              >
                <IdealIcon className="mr-2" />
                질문 추가하기
              </button>
            </div>
          </div>
        )}

        {/* 포트폴리오 섹션 */}
        <div className="w-full mt-[58px]">
          <div className="flex items-center">
            <p className="section-title">포트폴리오</p>
            <label className="relative flex-center text-subheadline text-gray-900">
              <input
                type="checkbox"
                className="peer w-[18px] h-[18px] mr-2 cursor-pointer appearance-none checked:bg-main-100 border border-gray-300 rounded"
                {...register("isPortfolioRequired")}
              />
              <img
                src="/assets/ic-check.svg"
                alt=""
                className="absolute left-[2.5px] top-[4px] w-[12px] h-[12px] pointer-events-none opacity-0 peer-checked:opacity-100"
              />
              포트폴리오 받기
            </label>
          </div>
          <div className="flex-center w-full min-h-[207px] mt-[12px] bg-white-100 rounded-[12px]">
            {watch("isPortfolioRequired") && (
              <div className="tooltip">
                이후 지원자의 저장된 포트폴리오를 불러옵니다.
              </div>
            )}
          </div>
        </div>

        {/*면접 시간 선택 */}
        <InterviewTimeSelector />
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleButtonClick}
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
            steps[4].completed && !isEditMode
              ? "bg-main-400 border border-main-100 text-main-100"
              : "bg-main-100 text-white-100"
          } text-body flex-center hover:bg-main-500`}
        >
          {steps[4].completed && !isEditMode
            ? BUTTON_TEXT.EDIT
            : BUTTON_TEXT.COMPLETE}
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
          <div className="relative custom-shadow w-[1016px] h-[79px] bg-main-300 border border-main-400 rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800">
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
          <div className="relative custom-shadow w-[1016px] h-[79px] bg-main-300 border border-main-400 rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800">
            모든 준비 단계가 완료되었습니다. 최종적으로 모집 공고를 업로드해
            주세요.
            <button
              type="button"
              onClick={() => setUploadPopupOpen(true)}
              className="absolute right-[15px] bg-main-100 hover:bg-main-500 text-white-100 py-[13px] px-[25px] rounded-[10px]"
            >
              공고 올리기
            </button>
          </div>
        </div>
      )}

      {/* 공고 올리기 팝업 */}
      {uploadPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-animation bg-white-100 px-10 py-4 rounded-[11px] border border-gray-200 text-center text-body ">
            전송이 완료되었습니다. 메인 홈에서 동아리 공고를 확인해 주세요.
          </div>
        </div>
      )}
    </form>
  );
}
