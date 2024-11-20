export default function FailList() {
  return (
    <div className="w-max-[440px] pl-[10px]">
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <div className="text-[#525252] text-[13.3px] mr-[5px] p-[6px] rounded-[5px] bg-white-100 border border-gray-200">
            불합격자
          </div>
          <p className="text-[#6F7278] text-[11px]">{"78"}</p>
        </div>
      </div>
      <table className="w-full mt-4">
        <thead className="w-full bg-[#F4F4F4] border border-[#D6D7DA]  rounded-[6.42px] text-[12.75px] text-[#7E7E7E]">
          <tr>
            <th className="py-[11px] w-[57px]">상태</th>
            <th className="py-[11px] w-[100px]">이름</th>
            <th className="py-[11px]">구분</th>
            <th className="py-[11px]">순위</th>
            <th className="py-[11px]">결과</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-[50px] text-[12.85px] font-semibold border-b border-[#D6D7DA]">
            <td>
              <div className="bg-[#9EA2A9] rounded-[4.82px] text-white-100 flex-center py-[5px] px-[5px] text-[11px] font-semibold">
                완료
              </div>
            </td>
            <td>
              <div className="flex flex-col items-start ml-[25px]">
                <div className="text-3">김민지</div>
                <div className="font-normal text-[9.64px] text-gray-800">
                  010-****-5687
                </div>
              </div>
            </td>
            <td>{"기획"}</td>
            <td>2위</td>
            <td className="text-red-100">합격</td>
          </tr>

          <tr className="h-[50px] text-[12.85px] font-semibold border-b border-[#D6D7DA]">
            <td>
              <div className="bg-[#9EA2A9] rounded-[4.82px] text-white-100 flex-center py-[5px] px-[5px] text-[11px] font-semibold">
                완료
              </div>
            </td>
            <td>
              <div className="flex flex-col items-start ml-[25px]">
                <div className="text-3">김민지</div>
                <div className="font-normal text-[9.64px] text-gray-800">
                  010-****-5687
                </div>
              </div>
            </td>
            <td>{"기획"}</td>
            <td>1위</td>
            <td className="text-red-100">합격</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
