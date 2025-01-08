import { useForm } from "react-hook-form";
import { useEffect } from "react";
import GroupPassCount from "./GroupPassCount";
import NumberSpinner from "./NumberSpinner";
import { BUTTON_TEXT } from "../../../../constants/recruting";
import { useStepTwoStore } from "../../../../store/useStore";

export default function SetAcceptanceCountContainer() {
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, touchedFields }
  } = useForm<SetAcceptanceCountFormData>({
    defaultValues: {
      documentPassTotal: undefined,
      finalPassTotal: undefined,
      groups: [
        { documentPass: undefined, finalPass: undefined },
        { documentPass: undefined, finalPass: undefined },
        { documentPass: undefined, finalPass: undefined }
      ]
    },
    mode: "all",
    reValidateMode: "onChange"
  });

  const documentPassTotal = watch("documentPassTotal");
  const finalPassTotal = watch("finalPassTotal");
  const groups = watch("groups");

  useEffect(() => {
    if (touchedFields.groups && Array.isArray(groups)) {
      const touchedGroupFields = touchedFields.groups as {
        documentPass?: boolean;
        finalPass?: boolean;
      }[];

      groups.forEach((_, index) => {
        if (touchedGroupFields[index]?.documentPass) {
          trigger(`groups.${index}.documentPass`);
        }
        if (touchedGroupFields[index]?.finalPass) {
          trigger(`groups.${index}.finalPass`);
        }
      });

      if (touchedFields.documentPassTotal) {
        trigger("documentPassTotal");
      }

      if (finalPassTotal > 0) {
        groups.forEach((_, index) => {
          trigger(`groups.${index}.finalPass`);
        });
      }

      if (documentPassTotal > 0) {
        groups.forEach((_, index) => {
          trigger(`groups.${index}.documentPass`);
        });
      }
    }
  }, [
    documentPassTotal,
    finalPassTotal,
    touchedFields.groups,
    groups,
    trigger,
    touchedFields.documentPassTotal,
    groups.reduce((sum, group) => sum + (group.documentPass || 0), 0),
    groups.reduce((sum, group) => sum + (group.finalPass || 0), 0)
  ]);

  const validateForm = {
    required: "필수 입력 사항입니다.",
    documentPassCheck: (value: number) => {
      if (!touchedFields.documentPassTotal) return true;
      if (!value || value <= 0) return "필수 입력 사항입니다.";
      if (value < finalPassTotal) {
        return "최종 합격 인원보다 적어요. 최종 합격 인원보다 많은 수로 조정해 주세요.";
      }
      return true;
    },
    finalPassCheck: (value: number) => {
      if (!touchedFields.finalPassTotal) return true;
      if (!value || value <= 0) return "필수 입력 사항입니다";
      return true;
    },
    groupDocumentPassCheck: (value: number) => {
      if (!value) return "필수 입력 사항입니다.";
      if (!touchedFields.groups) return true;

      const groupTotalDocumentPass = groups.reduce(
        (sum, group) => sum + (group.documentPass || 0),
        0
      );
      if (groupTotalDocumentPass !== documentPassTotal) {
        return "전체 서류 합격 인원 수에 맞춰 설정해주세요.";
      }
      return true;
    },
    groupFinalPassCheck: (value: number, index: number) => {
      if (!value) return "필수 입력 사항입니다.";
      if (!touchedFields.groups) return true;

      const groupTotalFinalPass = groups.reduce(
        (sum, group) => sum + (group.finalPass || 0),
        0
      );
      if (groupTotalFinalPass !== finalPassTotal) {
        return "전체 최종 합격 인원 수에 맞춰 설정해주세요.";
      }
      return true;
    }
  };

  const { setStepCompleted, steps } = useStepTwoStore();

  const onSubmit = async (data: SetAcceptanceCountFormData) => {
    try {
      // 모든 필드의 validation을 동시에 실행하고 결과를 기다립니다
      const isValid = await trigger(undefined, { shouldFocus: true });

      if (!isValid) {
        return; // validation이 실패하면 여기서 종료
      }

      const groupTotalDocumentPass = data.groups.reduce(
        (sum, group) => sum + (group.documentPass || 0),
        0
      );
      const groupTotalFinalPass = data.groups.reduce(
        (sum, group) => sum + (group.finalPass || 0),
        0
      );

      if (groupTotalDocumentPass !== data.documentPassTotal) {
        return;
      }

      if (groupTotalFinalPass !== data.finalPassTotal) {
        return;
      }

      console.log(data);
      setStepCompleted(0, true);
    } catch (error) {
      console.error("제출 중 에러 발생:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="ml-8 w-full mt-[25px] mb-[147px]"
    >
      <div>
        <div className="flex">
          <p className="section-title">
            <span className="mr-[0.25em] text-main-100">*</span>전체 서류 합격
            인원
          </p>
          <div className="tooltip">서류 합격 인원을 설정해 주세요.</div>
        </div>

        <div
          className={`${
            steps[0].completed ? "pointer-events-none" : ""
          } pt-[16px]`}
        >
          <div className="relative h-[105px] bg-white-100 rounded-[12px]">
            <div className="flex-center absolute left-[32px] top-[27px]">
              <div
                className={`flex-center relative w-[157px] h-[41px] rounded-[7px] bg-white-100 border ${
                  errors.documentPassTotal
                    ? "border-red-100"
                    : "border-gray-400"
                }`}
              >
                <NumberSpinner
                  control={control}
                  name="documentPassTotal"
                  error={errors.documentPassTotal?.message}
                  rules={{
                    required: "필수 입력 사항입니다.",
                    validate: validateForm.documentPassCheck
                  }}
                />
              </div>
              <p className="section-title pl-[11px]">명</p>
            </div>
            {errors.documentPassTotal && (
              <p className="absolute top-[70px] left-[32px] text-red-100 font-medium text-[11px]">
                {errors.documentPassTotal.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${
          steps[0].completed ? "pointer-events-none" : ""
        } mt-[34px]`}
      >
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
                  errors.finalPassTotal ? "border-red-100" : "border-gray-400"
                }`}
              >
                <NumberSpinner
                  control={control}
                  name="finalPassTotal"
                  error={errors.finalPassTotal?.message}
                  rules={{
                    required: "필수 입력 사항입니다.",
                    validate: validateForm.finalPassCheck
                  }}
                />
                {errors.finalPassTotal && (
                  <p className="absolute top-[42px] left-0 text-red-100 font-medium text-[11px]">
                    {errors.finalPassTotal.message}
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
          documentPass: {
            required: "필수 입력 사항입니다",
            validate: validateForm.groupDocumentPassCheck
          },
          finalPass: {
            required: "필수 입력 사항입니다",
            validate: validateForm.groupFinalPassCheck
          }
        }}
      />
      <div className="flex justify-center">
        <button
          type="submit"
          aria-label={
            steps[0].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE
          }
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
            steps[0].completed
              ? "bg-main-400 border border-main-100 text-main-100 "
              : "bg-main-100 text-white-100 "
          }  text-body flex-center hover:bg-main-500`}
        >
          {steps[0].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
        </button>
      </div>
    </form>
  );
}
