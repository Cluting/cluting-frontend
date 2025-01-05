import { UUID } from "crypto";
import ApplicantItem from "./ApplicantItem";
import ListHeader from "./ListHeader";

interface Applicant {
  id: UUID;
  name: string;
  phone: string;
  groupName: string;
  status: "작성 전" | "작성 중" | "작성 완료" | string;
}

interface ApplicantProps {
  applicants: Applicant[]; // 데이터
  onCreateQuestion: (id: UUID) => void;
}

const ApplicantList: React.FC<ApplicantProps> = ({
  applicants = [],
  onCreateQuestion
}) => {
  const middleIndex = Math.ceil(applicants.length / 2);
  const leftList = applicants.slice(0, middleIndex);
  const rightList = applicants.slice(middleIndex);

  return (
    <div className="flex w-full gap-7">
      {/* width값은 추후 최상위 부모 수정되면 다시 수정 필요 */}
      <div className="flex flex-col w-[28.5rem] gap-3">
        <ListHeader />
        <div className="flex flex-col">
          {leftList.map((applicant) => (
            <ApplicantItem
              key={applicant.id}
              applicant={applicant}
              onCreateQuestion={onCreateQuestion}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-[28.5rem] gap-3">
        <ListHeader />
        <div className="flex flex-col">
          {rightList.map((applicant) => (
            <ApplicantItem
              key={applicant.id}
              applicant={applicant}
              onCreateQuestion={onCreateQuestion}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicantList;
