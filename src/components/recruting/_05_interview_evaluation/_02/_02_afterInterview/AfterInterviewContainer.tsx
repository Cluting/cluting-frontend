import React, { useEffect, useMemo, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

interface Group {
  groupId: number;
  name: string;
}
const steps = ["평가 전", "평가 중", "평가 후", "평가 완료"];
const stepsPath = ["before", "ing", "after", "complete"];

export default function AfterInterviewContainer() {
  const navigate = useNavigate();
  const { stage } = useParams<{ stage: string }>();

  const [currentStep, setCurrentStep] = useState(0);
  const [schedule, setSchedule] = useState("이후");
  const recruitId = 1;
  const { data: groups = [] } = useQuery(["groups", recruitId], async () => {
    const response = await getInterviewGroups(Number(recruitId));
    return response.map((group: Group) => group.name);
  });

  // 필터와 정렬 상태 관리
  const [filter, setFilter] = useState("전체");
  //FIX: 드롭다운 검토 필요 지원순, 오래된 순
  const [sortType, setSortType] = useState("지원순");
  const filterOptions = useMemo(() => ["전체", ...groups], [groups]);

  // URL과 현재 단계 동기화
  useEffect(() => {
    const index = stepsPath.indexOf(stage || "before");
    if (index !== -1) {
      setCurrentStep(index);
    }
  }, [stage, location.pathname]);

  // 단계 변경 핸들러
  const handleStepClick = (index: number) => {
    const newStage = stepsPath[index];
    const newPath = `/recruting/05_interview_evaluation/interview/after/${newStage}`;

    if (location.pathname !== newPath) {
      navigate(newPath, { replace: false });
      setCurrentStep(index);
    }
  };

  // 현재 단계에 따라 컴포넌트 렌더링
  const renderStepComponent = (): React.ReactNode => {
    switch (stage) {
      case "before":
        return <BeforeEvaluation filter={filter} sortType={sortType} />;
      case "ing":
        return <DuringEvaluation filter={filter} sortType={sortType} />;
      case "after":
        return <AfterEvaluation filter={filter} sortType={sortType} />;
      case "complete":
        return <CompletedEvaluation filter={filter} sortType={sortType} />;
      default:
        return <BeforeEvaluation filter={filter} sortType={sortType} />;
    }
  };

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
              onStepClick={handleStepClick}
            />
          </div>
          <div className="mb-8">{renderStepComponent()}</div>
        </div>
      </div>
    </div>
  );
}
