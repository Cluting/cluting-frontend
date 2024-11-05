//2-2 인재상 구축하기 (컨테이너)

import { useRef, useState } from "react";
import CommonIdealList from "./CommonIdealList";
import CommonIdealInsert from "./CommonIdealInsert";
import CompleteButton from "../../CompleteButton";

export default function DefineIdealCandidateContainer() {
  const [ideals, setIdeals] = useState<Ideal[]>([]);
  const nextId = useRef<number>(1);

  const onInsert = (text: string) => {
    const ideal = {
      id: nextId.current,
      text
    };
    setIdeals([...ideals, ideal]);
    nextId.current += 1;
  };

  const onRemove = (id: number) => {
    setIdeals(ideals.filter((ideal) => ideal.id !== id));
  };

  return (
    <div className="ml-8 w-full mt-[25px]">
      <div className="flex">
        <p className="section-title">
          <span className="mr-[0.25em] text-main-100">*</span> 공통 인재상
        </p>
        <div className="tooltip">각 그룹별 인재상을 작성해 주세요..</div>
      </div>
      <div className="mt-[16px] relative h-auto bg-white-100 rounded-[12px] custom-shadow">
        <CommonIdealList ideals={ideals} onRemove={onRemove} />
        <CommonIdealInsert onInsert={onInsert} />
      </div>
      <div className="flex-center mt-[50px]">
        <CompleteButton />
      </div>
    </div>
  );
}
