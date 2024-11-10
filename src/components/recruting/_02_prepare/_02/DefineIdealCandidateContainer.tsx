// //2-2 인재상 구축하기 (컨테이너)
import CommonIdeal from "./CommonIdeal";
import GroupIdeal from "./GroupIdeal";
import CompleteButton from "../../CompleteButton";

export default function DefineIdealCandidateContainer() {
  return (
    <div>
      <div className="ml-8 w-full mt-[25px]">
        <CommonIdeal />
      </div>
      <div className="ml-8 w-full mt-[25px]">
        <GroupIdeal />
      </div>
      <div className="flex-center mt-[50px]">
        <CompleteButton />
      </div>
    </div>
  );
}
