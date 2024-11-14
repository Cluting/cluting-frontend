// //2-2 인재상 구축하기 (컨테이너)
import { BUTTON_TEXT } from "../../../../constants/recruting";
import { useStepTwoStore } from "../../../../store/useStore";
import CommonIdeal from "./CommonIdeal";
import GroupIdeal from "./GroupIdeal";

export default function DefineIdealCandidateContainer() {
  //현재 스텝 완료 여부 (전역 상태)
  const { setStepCompleted, steps } = useStepTwoStore();

  return (
    <div>
      <div className="ml-8 w-full mt-[25px]">
        <CommonIdeal />
      </div>
      <div className="ml-8 w-full mt-[25px]">
        <GroupIdeal />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={() => {
            setStepCompleted(1, true);
            //FIX: 각 인재상 폼 에러 여부 검사, 제출 여부 검사 후에 통과하면 완료처리가 되도록 수정
          }}
          aria-label={
            steps[1].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE
          }
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
            steps[1].completed
              ? "bg-main-400 border border-main-100 text-main-100 " //수정하기
              : "bg-main-100 text-white-100 " //완료하기
          }  text-body flex-center hover:bg-main-500`}
        >
          {steps[1].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
        </button>
      </div>
    </div>
  );
}
