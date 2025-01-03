import { useForm, FormProvider } from "react-hook-form";
import { BUTTON_TEXT } from "../../../../constants/recruting";
import { useStepTwoStore } from "../../../../store/useStore";
import CommonIdeal from "./CommonIdeal";
import GroupIdeal from "./GroupIdeal";
import { useGroupStore } from "../../../../store/useStore";
import { useMutation } from "@tanstack/react-query";
import { postPrepare2 } from "./service/Step2";

export default function DefineIdealCandidateContainer() {
  const mutation = useMutation(
    (data: { formData: IdealForm; recruitId: number }) =>
      postPrepare2(data.formData, data.recruitId),
    {
      onSuccess: (data) => {
        console.log("등록 성공", data);
      },
      onError: (error: any) => {
        console.error(`모집하기2 등록에 실패하였습니다`, error);
      }
    }
  );

  const { setStepCompleted, steps } = useStepTwoStore();
  const { group: groups } = useGroupStore();

  const methods = useForm<IdealForm>({
    defaultValues: {
      partIdeals: [
        { partName: "공통", content: [] },
        ...groups.map((group) => ({ partName: group.name, content: [] }))
      ]
    },
    mode: "onTouched"
  });

  const handleSubmit = methods.handleSubmit((data) => {
    if (data.partIdeals.every((part) => part.content.length > 0)) {
      console.log(data);
      setStepCompleted(1, true);

      const recruitId = 1; //todo: 일단 임시로
      mutation.mutate({
        formData: data,
        recruitId: recruitId
      });
      setStepCompleted(1, true);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className="mb-[147px]">
        <div className={`${steps[1].completed ? "pointer-events-none" : ""}`}>
          <div className="ml-8 w-full mt-[25px]">
            <CommonIdeal />
          </div>
          <div className="ml-8 w-full mt-[25px]">
            <GroupIdeal />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              aria-label={
                steps[1].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE
              }
              className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
                steps[1].completed
                  ? "bg-main-400 border border-main-100 text-main-100"
                  : "bg-main-100 text-white-100"
              } text-body flex-center hover:bg-main-500`}
            >
              {steps[1].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
            </button>
          </div>
          {steps[1].completed && (
            <div className="fixed animate-dropdown bottom-[16px]">
              <div className="custom-shadow ml-8 w-[1016px] h-[79px] bg-gray-100 border border-main-400 rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800 overflow-hidden">
                확정된 내용만을 서류 평가 시에 참고할 수 있습니다.
              </div>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
