import React, { useMemo, useState } from "react";
import Dropdown from "../../../_03_document_evaluation/_02/common/DropDown";
import { useQuery } from "@tanstack/react-query";
import { getInterviewGroups } from "../../service/Step5";
import Sidemenu from "../../../common/Sidemenu";
import TopSection from "../../common/TopSection";
import ScheduleTopSection from "../ScheduleTopSection";
import BeforeEvaluation from "./step/BeforeEvaluation";
import DuringEvaluation from "./step/DuringEvaluation";
import AfterEvaluation from "./step/AfterEvaluation";
import CompletedEvaluation from "./step/CompletedEvaluation";
import EvalProcessBar from "../../../_03_document_evaluation/_02/common/EvalProcessBar";

interface Group {
  groupId: number;
  name: string;
}

export default function AfterInterviewContainer() {
  const steps = ["평가 전", "평가 중", "평가 후", "평가 완료"];
  const [currentStep, setCurrentStep] = useState(0);

  //FIX:하드코딩
  const recruitId = 1;
  const { data: groups = [] } = useQuery(["groups", recruitId], async () => {
    const response = await getInterviewGroups(Number(recruitId));
    return response.map((group: Group) => group.name);
  });

  const renderStepComponent = (): React.ReactNode => {
    switch (currentStep) {
      case 0:
        return <BeforeEvaluation filter={filter} sortType={sortType} />;
      case 1:
        return <DuringEvaluation filter={filter} sortType={sortType} />;
      case 2:
        return <AfterEvaluation filter={filter} sortType={sortType} />;
      case 3:
        return <CompletedEvaluation filter={filter} sortType={sortType} />;
    }
  };

  const [schedule, setSchedule] = useState("이후");

  const [filter, setFilter] = useState("전체");
  //FIX: 드롭다운 검토 필요 지원순, 오래된 순
  const [sortType, setSortType] = useState("지원순");
  const filterOptions = useMemo(() => ["전체", ...groups], [groups]);

  return (
    <div className="flex justify-center pt-6 bg-gray-100 ">
      <Sidemenu />
      <div className="flex flex-col gap-7 w-[1016px] pl-8 mb-[500px]">
        <TopSection />
        <ScheduleTopSection schedule={schedule} setSchedule={setSchedule} />
        <div className="flex flex-col mt-6">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Dropdown
                label="필터 : "
                defaultValue="전체"
                options={filterOptions}
                onSelect={(value) => setFilter(value)}
              />
              <Dropdown
                label="정렬 : "
                defaultValue="지원순"
                options={["지원순"]}
                onSelect={(value) => setSortType(value)}
              />
            </div>
            <EvalProcessBar
              steps={steps}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
          </div>
          <div className="mb-8">{renderStepComponent()}</div>
        </div>
      </div>
    </div>
  );
}
