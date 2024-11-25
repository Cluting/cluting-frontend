import { useEffect, useState } from "react";
import { Applicant } from "../../../../type/type";

interface failListProps {
  filter: string;
}
export default function FailList({ filter }: failListProps) {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const filteredData = applicants.filter((item) => item.group === filter);

  useEffect(() => {
    // JSON 파일에서 더미 데이터 가져오기
    fetch("/failApplicant.json")
      .then((response) => response.json())
      .then((data: Applicant[]) => setApplicants(data))
      .catch((error) => console.error("JSON 오류:", error));
  }, []);

  return (
    <div className="w-max-[440px] pl-[10px]">
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <div className="text-[#525252] text-[13.3px] mr-[5px] p-[6px] rounded-[5px] bg-gray-100 ">
            불합격자
          </div>
          <p className="text-[#6F7278] text-[11px]">{"78"}</p>
        </div>
      </div>
      <table className="w-full mt-4">
        <thead className="w-full bg-gray-100  rounded-[6.42px] text-[12.75px] text-gray-800">
          <tr>
            <th className="py-[11px] w-[80px]">상태</th>
            <th className="py-[11px] w-[100px]">이름</th>
            <th className="py-[11px]">그룹</th>
            <th className="py-[11px]">순위</th>
            <th className="py-[11px]">결과</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((applicant) => (
            <tr className="h-[50px] text-[12.85px] text-gray-1100 font-semibold border-b border-[#D6D7DA]">
              <td>
                <div className="bg-gray-100 rounded-[38px] text-gray-500 flex-center py-[5px] px-[5px] text-caption3">
                  {applicant.status === "완료" ? "결정 완료" : ""}
                </div>
              </td>
              <td>
                <div className="flex flex-col items-start ml-[25px]">
                  <div className="text-3"> {applicant.name}</div>
                  <div className="font-normal text-[9.64px] text-gray-500">
                    {applicant.phone}
                  </div>
                </div>
              </td>
              <td>{applicant.group}</td>
              <td>{applicant.rank}</td>
              <td className="text-red-100">{applicant.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
