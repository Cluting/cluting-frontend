import { GetApplicant } from "../../../../type/type";

interface PassListProps {
  filter: string;
  passData: GetApplicant[];
  byGroup?: { [key: string]: number };
}

export default function PassList({ filter, passData, byGroup }: PassListProps) {
  const filteredData =
    filter === "전체"
      ? passData
      : passData.filter((data) => data.part === filter);

  return (
    <div className="w-max-[440px] pr-[10px]">
      <section className="flex items-center gap-[18px]">
        <div className="flex items-center">
          <div className="text-[#525252] text-[13.3px] mr-[5px] p-[6px] rounded-[5px] bg-gray-100 ">
            전체 합격자
          </div>
          <p className="text-[#6F7278] text-[11px]">{passData?.length}</p>
        </div>
        {byGroup &&
          Object.entries(byGroup).map(([group, count]) => (
            <div key={group} className="flex items-center">
              <div className="text-[#525252] text-[13.3px] mr-[5px] p-[6px] rounded-[5px] bg-gray-100">
                {group}
              </div>
              <p className="text-[#6F7278] text-[11px]">{count}</p>
            </div>
          ))}
      </section>

      <table className="w-full mt-4 ">
        <thead className="w-full bg-gray-100 rounded-[6.42px] text-[12.75px] text-gray-800">
          <tr>
            <th className="py-[11px] w-[80px]">상태</th>
            <th className="py-[11px] w-[100px]">이름</th>
            <th className="py-[11px]">그룹</th>
            <th className="py-[11px]">순위</th>
            <th className="py-[11px]">결과</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((data) => (
            <tr className="h-[50px] text-[12.85px] text-gray-1100 font-semibold border-b border-[#D6D7DA]">
              <td>
                <div className="bg-gray-100 rounded-[38px] text-gray-500 flex-center py-[5px] px-[5px] text-caption3">
                  {data.state === "AFTER" ? "결정 완료" : "결정 완료"}
                </div>
              </td>
              <td>
                <div className="flex flex-col items-start ml-[25px]">
                  <div className="text-3"> {data.name}</div>
                  <div className="font-normal text-[9.64px] text-gray-500">
                    {data.phone}
                  </div>
                </div>
              </td>
              <td> {data.part}</td>
              <td> {data.rank}</td>
              <td className="text-[#416AFF]"> {data.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
