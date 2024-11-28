import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface InterviewTable {
  category: string;
  interviewees: string[];
  interviewers: string[];
  interviewersId: number;
  isAnswered: boolean;
}

interface TimeGroup {
  time: string;
  timeGroupId: number;
  groups: InterviewTable[];
}

export default function InterviewTable() {
  const navigate = useNavigate();

  const [timeGroups, setTimeGroups] = useState<TimeGroup[]>([]); // 시간과 그룹 데이터를 저장

  useEffect(() => {
    // JSON 데이터 불러오기
    fetch("/interviewAnswerTable.json")
      .then((response) => response.json())
      .then((data: TimeGroup[]) => setTimeGroups(data))
      .catch((error) => console.error("JSON 오류:", error));
  }, []);

  return (
    <div className="w-full">
      <table className="w-full bg-white-100  ">
        <thead className="w-full bg-[#F4F4F4] border border-[#D6D7DA] text-[16px] text-[#7E7E7E]">
          <tr>
            <th className="py-[11px] w-[57px]">시간대 </th>
            <th className="py-[11px] w-[100px] row-span-6">면접 그룹</th>
            <th className="py-[11px] w-[100px]"></th>
            <th className="py-[11px] w-[100px] "></th>
            <th className="py-[11px] w-[100px]"></th>
            <th className="py-[11px] w-[100px] "></th>
            <th className="py-[11px] w-[100px]"></th>
          </tr>
        </thead>

        <thead className="w-full text-[16px] text-[#7E7E7E]">
          <tr>
            <th className="py-[11px] w-[57px]"> </th>
            <th className="py-[11px] w-[100px] row-span-2">기획</th>
            <th className="py-[11px] w-[100px]"></th>
            <th className="py-[11px] w-[100px] row-span-2">개발</th>
            <th className="py-[11px] w-[100px]"></th>
            <th className="py-[11px] w-[100px] row-span-2">디자인</th>
            <th className="py-[11px] w-[100px]"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-[32px] group">
            <td>
              <div className="h-[32px] bg-gray-100 rounded-[4.82px] text-gray-1100 flex-center my-[11px] ml-[11px] py-[6px] px-[21px] text-subheadline  hover:text-main-100">
                11:00 AM
              </div>
            </td>

            <td className="border-r border-gray-300">
              <div className="text-[13.2px] "> 박시현/최예은</div>
            </td>
            <td>
              <div className="relative">
                <div className="text-gray-900 text-callout rounded-lg px-[10px] py-[5px] flex">
                  <div className="py-[5px] px-2">김민지</div>
                  <div className="py-[5px] px-2">이태준</div>
                </div>
                {/* {!group.isAnswered && (
                      <button
                        onClick={() => {
                          navigate("/");
                        }}
                        className="absolute top-2 left-0 hidden group-hover:inline-block button-main-bg text-[13.2px] text-capiton3 rounded-[6px] px-7 py-2"
                      >
                        답변 기록하기
                      </button>
                    )} */}
              </div>
            </td>

            <td className="border-r border-gray-300">
              <div className="text-[13.2px] "> 박시현/최예은</div>
            </td>
            <td>
              <div className="relative">
                <div className="text-gray-900 text-callout rounded-lg px-[10px] py-[5px] flex">
                  <div className="py-[5px] px-2">김민지</div>
                  <div className="py-[5px] px-2">이태준</div>
                </div>
                {/* {!group.isAnswered && (
                      <button
                        onClick={() => {
                          navigate("/");
                        }}
                        className="absolute top-2 left-0 hidden group-hover:inline-block button-main-bg text-[13.2px] text-capiton3 rounded-[6px] px-7 py-2"
                      >
                        답변 기록하기
                      </button>
                    )} */}
              </div>
            </td>

            <td className="border-r border-gray-300">
              <div className="text-[13.2px] "> 박시현/최예은</div>
            </td>
            <td>
              <div className="relative">
                <div className="text-gray-900 text-callout rounded-lg px-[10px] py-[5px] flex">
                  <div className="py-[5px] px-2">김민지</div>
                  <div className="py-[5px] px-2">이태준</div>
                </div>
                {/* {!group.isAnswered && (
                      <button
                        onClick={() => {
                          navigate("/");
                        }}
                        className="absolute top-2 left-0 hidden group-hover:inline-block button-main-bg text-[13.2px] text-capiton3 rounded-[6px] px-7 py-2"
                      >
                        답변 기록하기
                      </button>
                    )} */}
              </div>
            </td>
          </tr>

          <tr className="h-[32px] group">
            <td>
              <div className="h-[32px] bg-gray-100 rounded-[4.82px] text-gray-1100 flex-center my-[11px] ml-[11px] py-[6px] px-[21px] text-subheadline  hover:text-main-100">
                11:00 AM
              </div>
            </td>

            <td className="border-r border-gray-300">
              <div className="text-[13.2px] "> 박시현/최예은</div>
            </td>
            <td>
              <div className="relative">
                <div className="text-gray-900 text-callout rounded-lg px-[10px] py-[5px] flex">
                  <div className="py-[5px] px-2">김민지</div>
                  <div className="py-[5px] px-2">이태준</div>
                </div>
                {/* {!group.isAnswered && (
                      <button
                        onClick={() => {
                          navigate("/");
                        }}
                        className="absolute top-2 left-0 hidden group-hover:inline-block button-main-bg text-[13.2px] text-capiton3 rounded-[6px] px-7 py-2"
                      >
                        답변 기록하기
                      </button>
                    )} */}
              </div>
            </td>

            <td className="border-r border-gray-300">
              <div className="text-[13.2px] "> 박시현/최예은</div>
            </td>
            <td>
              <div className="relative">
                <div className="text-gray-900 text-callout rounded-lg px-[10px] py-[5px] flex">
                  <div className="py-[5px] px-2">김민지</div>
                  <div className="py-[5px] px-2">이태준</div>
                </div>
                {/* {!group.isAnswered && (
                      <button
                        onClick={() => {
                          navigate("/");
                        }}
                        className="absolute top-2 left-0 hidden group-hover:inline-block button-main-bg text-[13.2px] text-capiton3 rounded-[6px] px-7 py-2"
                      >
                        답변 기록하기
                      </button>
                    )} */}
              </div>
            </td>

            <td className="border-r border-gray-300">
              <div className="text-[13.2px] "> 박시현/최예은</div>
            </td>
            <td>
              <div className="relative">
                <div className="text-gray-900 text-callout rounded-lg px-[10px] py-[5px] flex">
                  <div className="py-[5px] px-2">김민지</div>
                  <div className="py-[5px] px-2">이태준</div>
                </div>
                {/* {!group.isAnswered && (
                      <button
                        onClick={() => {
                          navigate("/");
                        }}
                        className="absolute top-2 left-0 hidden group-hover:inline-block button-main-bg text-[13.2px] text-capiton3 rounded-[6px] px-7 py-2"
                      >
                        답변 기록하기
                      </button>
                    )} */}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
