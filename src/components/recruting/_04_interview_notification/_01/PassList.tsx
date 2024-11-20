export default function PassList() {
  return (
    <div className="w-max-[440px] pr-[10px]">
      <section className="flex items-center gap-[18px]">
        <div className="flex items-center">
          <div className="text-[#525252] text-[13.3px] mr-[5px] p-[6px] rounded-[5px] bg-white-100 border border-gray-200">
            전체 합격자
          </div>
          <p className="text-[#6F7278] text-[11px]">{"60"}</p>
        </div>

        <div className="flex items-center">
          <div className="text-[#525252] text-[13.3px] mr-[5px] p-[6px] rounded-[5px] bg-white-100 border border-gray-200">
            기획
          </div>
          <p className="text-[#6F7278] text-[11px]">{"60"}</p>
        </div>

        <div className="flex items-center">
          <div className="text-[#525252] text-[13.3px] mr-[5px] p-[6px] rounded-[5px] bg-white-100 border border-gray-200">
            디자인
          </div>
          <p className="text-[#6F7278] text-[11px]">{"60"}</p>
        </div>

        <div className="flex items-center">
          <div className="text-[#525252] text-[13.3px] mr-[5px] p-[6px] rounded-[5px] bg-white-100 border border-gray-200">
            개발
          </div>
          <p className="text-[#6F7278] text-[11px]">{"60"}</p>
        </div>
      </section>

      <table className="w-full mt-4">
        <thead className="w-full bg-[#F4F4F4] border border-[#D6D7DA]  rounded-[6.42px] text-[12.75px] text-[#7E7E7E]">
          <tr>
            <th className="py-[11px]">상태</th>
            <th className="py-[11px]">이름</th>
            <th className="py-[11px]">구분</th>
            <th className="py-[11px]">순위</th>
            <th className="py-[11px]">결과</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-[41px] text-[12.85px] font-semibold">
            <td>
              <div className="bg-[#9EA2A9] rounded-[4.82px] text-white-100 flex-center py-[5px] px-[5px] text-[11px] font-semibold">
                완료
              </div>
            </td>
            <td>홍길동</td>
            <td>{"기획"}</td>
            <td>1</td>
            <td>합격</td>
          </tr>

          <tr className="h-[41px] text-[12.85px] font-semibold">
            <td>
              <div className="bg-[#9EA2A9] rounded-[4.82px] text-white-100 flex-center py-[5px] px-[5px] text-[11px] font-semibold">
                완료
              </div>
            </td>
            <td>홍길동</td>
            <td>{"기획"}</td>
            <td>1</td>
            <td>합격</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
