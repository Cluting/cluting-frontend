import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import GroupPassCount from "./GroupPassCount";
import NumberSpinner from "./NumberSpinner";
import { BUTTON_TEXT } from "../../../../constants/recruting";
import { useStepTwoStore } from "../../../../store/useStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postPrepare1, getPassIdeal, patchPrepare1 } from "./service/Step1";

export default function SetAcceptanceCountContainer() {
  const [isEditMode, setIsEditMode] = useState(false);
  const queryClient = useQueryClient();
  const { setStepCompleted, steps } = useStepTwoStore();

  const recruitId = 1; //todo: 임시로
  //GET
  const { data: passIdeal } = useQuery(
    ["passIdeal", recruitId],
    () => getPassIdeal(recruitId),
    {
      select: (data) => {
        console.log("2-1 조회 성공!");

        return {
          totalDocumentPassCount: data.numDoc,
          totalFinalPassCount: data.numFinal,
          groupInfos: data.groupResponses.map((group) => ({
            groupName: `Group${group.groupId}`, // groupId를 이용해 groupName 생성
            documentPassCount: group.numDoc,
            finalPassCount: group.numFinal
          }))
        } as SetAcceptanceCountFormData;
      },
      onError: (error) => {
        console.error("합격 인원 및 인재상 조회 실패", error);
      }
    }
  );

  //POST
  const mutation = useMutation(
    (data: { formData: SetAcceptanceCountFormData; recruitId: number }) =>
      postPrepare1(data.formData, data.recruitId),
    {
      onSuccess: (data) => {
        console.log("모집하기1 POST 성공", data);
        // POST 성공 후 GET 쿼리 무효화 -> 새로운 데이터 자동 불러오기
        queryClient.invalidateQueries(["passIdeal", recruitId]);
        setStepCompleted(0, true);
      },
      onError: (error: any) => {
        console.error(`모집하기1 POST 에실패`, error);
      }
    }
  );

  //PATCH
  const patchMutation = useMutation(
    (data: { formData: SetAcceptanceCountFormData; recruitId: number }) =>
      patchPrepare1(data.formData, data.recruitId),
    {
      onSuccess: (data) => {
        console.log("모집하기1 PATCH 성공", data);
        // PATCH 성공 후 GET 쿼리 무효화 -> 새로운 데이터 자동 불러오기
        // queryClient.invalidateQueries(["passIdeal", recruitId]);
        setStepCompleted(0, true);
        setIsEditMode(false);
      },
      onError: (error: any) => {
        console.error(`모집하기1 PATCH 실패`, error);
      }
    }
  );

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, touchedFields }
  } = useForm<SetAcceptanceCountFormData>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    values: passIdeal // 서버에서 가져온 데이터로 초기값 설정
  });

  const totalDocumentPassCount = watch("totalDocumentPassCount");
  const totalFinalPassCount = watch("totalFinalPassCount");
  const groupInfos = watch("groupInfos");

  useEffect(() => {
    const validateFields = async () => {
      if (Array.isArray(groupInfos)) {
        await trigger("totalDocumentPassCount");
        await trigger("totalFinalPassCount");

        groupInfos.forEach(async (_, index) => {
          await trigger(`groupInfos.${index}.groupName`);
          await trigger(`groupInfos.${index}.documentPassCount`);
          await trigger(`groupInfos.${index}.finalPassCount`);
        });
      }
    };

    validateFields();
  }, [
    totalDocumentPassCount,
    totalFinalPassCount,
    groupInfos,
    trigger,
    groupInfos?.reduce((sum, group) => sum + (group.documentPassCount || 0), 0),
    groupInfos?.reduce((sum, group) => sum + (group.finalPassCount || 0), 0)
  ]);

  const handleButtonClick = () => {
    if (steps[0].completed && !isEditMode) {
      setIsEditMode(true);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  const validateForm = {
    required: "필수 입력 사항입니다.",
    documentPassCheck: (value: number) => {
      if (!touchedFields.totalDocumentPassCount) return true;
      if (value === undefined || value === null || value === 0)
        return "필수 입력 사항입니다.";
      if (value < totalFinalPassCount) {
        return "최종 합격 인원보다 적어요. 최종 합격 인원보다 많은 수로 조정해 주세요.";
      }
      return true;
    },
    groupNameCheck: (value: string) => {
      if (!touchedFields.groupInfos) return true;
      if (!value?.trim()) return "필수 입력 사항입니다.";
      return true;
    },
    groupDocumentPassCheck: (value: number) => {
      if (!touchedFields.groupInfos) return true;
      if (!groupInfos || groupInfos.length === 0) return true;

      if (value === undefined || value === null || value === 0)
        return "필수 입력 사항입니다.";

      const groupTotalDocumentPass = (groupInfos || []).reduce(
        (sum, group) => sum + (group?.documentPassCount || 0),
        0
      );
      if (groupTotalDocumentPass !== totalDocumentPassCount) {
        return "전체 서류 합격 인원 수에 맞춰 설정해주세요.";
      }
      return true;
    },
    groupFinalPassCheck: (value: number) => {
      if (!touchedFields.groupInfos) return true;
      if (!groupInfos || groupInfos.length === 0) return true;

      if (value === undefined || value === null || value === 0)
        return "필수 입력 사항입니다.";

      const groupTotalFinalPass = (groupInfos || []).reduce(
        (sum, group) => sum + (group?.finalPassCount || 0),
        0
      );
      if (groupTotalFinalPass !== totalFinalPassCount) {
        return "전체 최종 합격 인원 수에 맞춰 설정해주세요.";
      }
      return true;
    }
  };

  const onSubmit = async (data: SetAcceptanceCountFormData) => {
    try {
      await trigger();
      if (Object.keys(errors).length > 0) return;

      if (data.groupInfos && data.groupInfos.length > 0) {
        const groupTotalDocumentPass = data.groupInfos.reduce(
          (sum, group) => sum + (group.documentPassCount || 0),
          0
        );
        const groupTotalFinalPass = data.groupInfos.reduce(
          (sum, group) => sum + (group.finalPassCount || 0),
          0
        );
        if (groupTotalDocumentPass !== data.totalDocumentPassCount) return;
        if (groupTotalFinalPass !== data.totalFinalPassCount) return;
      }

      if (isEditMode) {
        await patchMutation.mutateAsync({ formData: data, recruitId });
      } else {
        await mutation.mutateAsync({ formData: data, recruitId });
      }
    } catch (error) {
      console.error("제출 중 에러 발생:", error);
    }
  };

  useEffect(() => {
    if (passIdeal) {
      setStepCompleted(0, true);
    }
  }, [passIdeal, setStepCompleted]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="ml-8 w-full mt-[25px] mb-[147px]"
    >
      <div
        className={`${steps[0].completed && !isEditMode ? "pointer-events-none" : ""}`}
      >
        <div className="flex">
          <p className="section-title">
            <span className="mr-[0.25em] text-main-100">*</span>전체 서류 합격
            인원
          </p>
          <div className="tooltip">서류 합격 인원을 설정해 주세요.</div>
        </div>

        <div className="pt-[16px]">
          <div className="relative h-[105px] bg-white-100 rounded-[12px]">
            <div className="flex-center absolute left-[32px] top-[27px]">
              <div
                className={`flex-center relative w-[157px] h-[41px] rounded-[7px] bg-white-100 border ${
                  errors.totalDocumentPassCount
                    ? "border-red-100"
                    : "border-gray-400"
                }`}
              >
                <NumberSpinner
                  control={control}
                  name="totalDocumentPassCount"
                  error={errors.totalDocumentPassCount?.message}
                  rules={{
                    required: "필수 입력 사항입니다.",
                    validate: validateForm.documentPassCheck
                  }}
                />
              </div>
              <p className="section-title pl-[11px]">명</p>
            </div>
            {errors.totalDocumentPassCount && (
              <p className="absolute top-[70px] left-[32px] text-red-100 font-medium text-[11px]">
                {errors.totalDocumentPassCount.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-[34px]">
        <div className="flex">
          <p className="section-title">
            <span className="mr-[0.25em] text-main-100">*</span>
            전체 최종 합격 인원
          </p>
          <div className="tooltip">최종 합격 인원을 설정해 주세요.</div>
        </div>
        <div className="pt-[16px]">
          <div className="relative h-[105px] bg-white-100 rounded-[12px]">
            <div className="flex-center absolute left-[32px] top-[27px]">
              <div
                className={`flex-center w-[157px] h-[41px] rounded-[7px] bg-white-100 border ${
                  errors.totalFinalPassCount
                    ? "border-red-100"
                    : "border-gray-400"
                }`}
              >
                <NumberSpinner
                  control={control}
                  name="totalFinalPassCount"
                  error={errors.totalFinalPassCount?.message}
                  rules={{
                    validate: (value: number) => {
                      if (!touchedFields.totalFinalPassCount) return true;
                      if (!value || value <= 0) return "필수 입력 사항입니다";
                      return true;
                    }
                  }}
                />
                {errors.totalFinalPassCount && (
                  <p className="absolute top-[42px] left-0 text-red-100 font-medium text-[11px]">
                    {errors.totalFinalPassCount.message}
                  </p>
                )}
              </div>
              <p className="section-title pl-[11px]">명</p>
            </div>
          </div>
        </div>
      </div>

      <GroupPassCount
        control={control}
        errors={errors}
        rules={{
          groupName: {
            validate: validateForm.groupNameCheck
          },
          documentPassCount: {
            validate: validateForm.groupDocumentPassCheck
          },
          finalPassCount: {
            validate: validateForm.groupFinalPassCheck
          }
        }}
      />

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleButtonClick}
          aria-label={
            steps[0].completed && !isEditMode
              ? BUTTON_TEXT.EDIT
              : BUTTON_TEXT.COMPLETE
          }
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
            steps[0].completed && !isEditMode
              ? "bg-main-400 border border-main-100 text-main-100"
              : "bg-main-100 text-white-100"
          }  text-body flex-center hover:bg-main-500`}
        >
          {steps[0].completed && !isEditMode
            ? BUTTON_TEXT.EDIT
            : BUTTON_TEXT.COMPLETE}
        </button>
      </div>
    </form>
  );
}
