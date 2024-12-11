interface ApplicantItemProps {
  applicant: {
    id: string;
    name: string;
    phone: string;
    group: string;
    status: "작성 전" | "작성 중" | "작성 완료" | string;
  };
  onCreateQuestion: (id: string) => void;
}

const ApplicantItem: React.FC<ApplicantItemProps> = ({
  applicant,
  onCreateQuestion
}) => {
  return (
    <li className="flex items-center p-4 h-16 border-b-[0.5px] border-[#D6D7DA] gap-2">
      <div className="text-left w-28">
        <div className="flex w-20 h-7 flex-center bg-[#F1F3FF] rounded-3xl">
          <span className="text-[#8B8FA4] font-Pretendard font-medium text-sm">
            {applicant.status}
          </span>
        </div>
      </div>
      <div className="flex flex-col text-left w-28">
        <div className="text-[13.856px] font-Pretendard font-semibold text-[#3B3D46] leading-normal">
          {applicant.name}
        </div>
        <div className="text-xs font-Pretendard font-normal text-[#8b8fa4]">
          {applicant.phone}
        </div>
      </div>

      <div className="w-16 text-sm font-semibold text-left font-Pretendard text-gray-1100">
        {applicant.group}
      </div>

      <div className="w-32 text-sm font-medium text-left font-Pretendard">
        <button
          onClick={() => onCreateQuestion(applicant.id)}
          className="flex w-20 h-8 ml-auto text-xs font-medium border rounded-lg flex-center bg-main-300 border-main-400 font-Pretendard"
        >
          질문 만들기
        </button>
      </div>
    </li>
  );
};

export default ApplicantItem;
