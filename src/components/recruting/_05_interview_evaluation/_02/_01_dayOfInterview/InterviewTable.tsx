import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InterviewTable() {
  const navigate = useNavigate();

  // 면접자의 답변 완료 상태 관리
  const [responses, setResponses] = useState({
    "김민지 이태준": false,
    "박시현 최예은": true
  });

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
            <td className="text-[13.2px]">박시현/최예은</td>
            <td className="relative">
              <div className="text-gray-900 text-callout rounded-lg py-[5px] flex gap-[15px]">
                <div className="py-[5px] px-2">김민지</div>
                <div className="py-[5px] px-2">이태준</div>
              </div>
              {!responses["김민지 이태준"] && (
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className="absolute top-2 left-0 hidden group-hover:inline-block button-main-bg text-[13.2px] text-capiton3 rounded-[6px] px-7 py-2"
                >
                  답변 기록하기
                </button>
              )}
            </td>
            <td className="text-[13.2px]">박시현/최예은</td>
            <td className="relative">
              <div className="text-gray-900 text-callout rounded-lg py-[5px] flex gap-[15px]">
                <div className="py-[5px] px-2">김민지</div>
                <div className="py-[5px] px-2">이태준</div>
              </div>
              {!responses["김민지 이태준"] && (
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className="absolute top-2 left-0 hidden group-hover:inline-block button-main-bg text-[13.2px] text-capiton3 rounded-[6px] px-7 py-2"
                >
                  답변 기록하기
                </button>
              )}
            </td>
            <td className="text-[13.2px]">박시현/최예은</td>
            <td className="relative">
              <div className="text-gray-900 text-callout rounded-lg py-[5px] flex gap-[15px]">
                <div className="py-[5px] px-2">박시현</div>
                <div className="py-[5px] px-2">박시현</div>
              </div>
              {!responses["김민지 이태준"] && (
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className="absolute top-2 left-0 hidden group-hover:inline-block button-main-bg text-[13.2px] text-capiton3 rounded-[6px] px-7 py-2"
                >
                  답변 기록하기
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
