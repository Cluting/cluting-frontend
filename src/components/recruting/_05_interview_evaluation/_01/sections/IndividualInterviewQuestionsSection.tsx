import { useState } from "react";
import Dropdown from "./dropdown/Dropdown";
import Headline from "./headline/Headline";
import ProgressBar from "./processBar/ProcessBar";
import ApplicantList from "./list/ApplicantList";
import { v4 as uuidv4 } from "uuid";
import AuthorityModal from "./modal/AuthorityModal";

export default function IndividualInterviewQuestionsSection() {
  const [filter, setFilter] = useState("전체");
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const steps = ["작성 전", "작성 중", "작성 완료"];

  // 목업데이터로, 추후 삭제 필요
  const applicantsMockUp = [
    {
      id: uuidv4(),
      name: "김은혜",
      phone: "010-1234-1234",
      group: "개발",
      status: "작성 전"
    },
    {
      id: uuidv4(),
      name: "곽서연",
      phone: "010-1234-1234",
      group: "개발",
      status: "작성 중"
    },
    {
      id: uuidv4(),
      name: "박시현",
      phone: "010-1234-1234",
      group: "기획",
      status: "작성 완료"
    },
    {
      id: uuidv4(),
      name: "김동현",
      phone: "010-1234-1234",
      group: "개발",
      status: "작성 전"
    },
    {
      id: uuidv4(),
      name: "양성원",
      phone: "010-1234-1234",
      group: "개발",
      status: "작성 완료"
    },
    {
      id: uuidv4(),
      name: "윤다인",
      phone: "010-1234-1234",
      group: "개발",
      status: "작성 중"
    }
  ];

  const filteredApplicants = applicantsMockUp.filter(
    (applicant) =>
      (filter === "전체" || applicant.group === filter) &&
      applicant.status === steps[currentStep]
  );

  const renderStepComponents = () => {
    switch (currentStep) {
      case 0:
        return (
          <ApplicantList
            applicants={filteredApplicants}
            onCreateQuestion={handleCreateQuestion}
          />
        );
      case 1:
        return (
          <ApplicantList
            applicants={filteredApplicants}
            onCreateQuestion={handleCreateQuestion}
          />
        );
      case 2:
        return (
          <ApplicantList
            applicants={filteredApplicants}
            onCreateQuestion={handleCreateQuestion}
          />
        );
      default:
        return null;
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleCreateQuestion = (id: string) => {
    // 해당 부분 연결시 바꿔야함
    alert("질문 생성 버튼");
  };

  return (
    <div className="relative flex flex-col gap-2">
      <Headline
        essential={true}
        title="개별 면접 질문 만들기"
        hint="지원자 개인에게 하고 싶은 질문을 추가해 주세요. 지원자의 지원서류를 기반으로 작성할 수 있습니다."
      >
        {/* 기획 확정 안나서 추후 수정 예정 */}
        <button
          type="button"
          onClick={toggleModal}
          className="text-base font-medium underline font-Pretendard text-[#646775]"
        >
          권한자 보기
        </button>
        <div className="absolute right-0 top-10">
          <AuthorityModal isOpen={isModalOpen} onClose={toggleModal} />
        </div>
      </Headline>
      <div className="flex flex-col gap-4 p-4 bg-white-100 border border-[#D9D4E7] rounded-2xl">
        <div className="flex flex-col gap-3">
          <Dropdown
            label="필터 : "
            defaultValue="전체"
            options={["전체", "기획", "디자인", "개발"]}
            onSelect={(value) => setFilter(value)}
          />
          <ProgressBar
            steps={steps}
            currentStep={currentStep}
            onStepClick={(stepIndex) => setCurrentStep(stepIndex)}
          />
        </div>
        {renderStepComponents()}
      </div>
    </div>
  );
}
