import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getInterviewGroups, getInterviewList } from "../../service/Step5";

interface InterviewGroup {
  category: string;
  interviewees: string[];
  interviewers: string[];
  interviewersId: number;
  isAnswered: boolean;
}

interface TimeSlot {
  time: string;
  timeGroupId: number;
  InterviewStatus: string;
  groups: InterviewGroup[];
}

interface Group {
  groupId: number;
  name: string;
}

export default function InterviewTable() {
  const [timeSlots, TimeSlot] = useState<TimeSlot[]>([]); // 시간과 그룹 데이터를 저장

  //FIX:하드코딩
  const recruitId = 1;
  const { data: interviewList } = useQuery(["interviewList", recruitId], () =>
    getInterviewList(Number(recruitId))
  );
  console.log("BACK: 면접 리스트", interviewList);

  useEffect(() => {
    // JSON 데이터 불러오기
    fetch("/interviewAnswerTable.json")
      .then((response) => response.json())
      .then((data: TimeSlot[]) => TimeSlot(data))
      .catch((error) => console.error("JSON 오류:", error));
  }, []);

  const { data: groups } = useQuery(["groups", recruitId], () =>
    getInterviewGroups(Number(recruitId))
  );
  console.log("BACK: 면접 그룹 ", groups);

  return (
    <div className="w-full min-w-[1000px] text-caption3 ">
      <div className="w-full h-min-[593px] h-[593px] bg-white-100 rounded-lg custom-shadow overflow-x-scroll">
        <ul className="flex w-full min-w-max  bg-main-300 border border-[#D6D7DA] text-[16px] text-[#7E7E7E] font-semibold rounded-t-lg">
          <li className="py-[11px] w-[57px] ml-[20px]">시간대 </li>
          <li className="py-[11px] w-[100px] ml-[28px]">면접 그룹</li>
        </ul>

        <div className="overflow-x-scroll h-full overflow-y-scroll">
          <ul className="flex gap-8 ml-[120px] mt-4 min-w-max">
            {groups &&
              groups.map((group: Group) => (
                <li
                  key={group.groupId}
                  className="bg-gray-100 border border-gray-200 text-gray-1100 text-caption3 py-2 w-[221px] rounded-md text-center"
                >
                  {group.name}
                </li>
              ))}
          </ul>

          <div className="flex flex-col mt-[18px] min-w-max">
            {timeSlots.map((timeSlot) => (
              <div className="flex">
                <ul>
                  <li className="flex items-center ml-[20px] my-[10px]">
                    <div
                      className={`py-[6px] px-[12px] rounded-md ${timeSlot.InterviewStatus === "Complete" ? "bg-gray-200 text-gray-600" : timeSlot.InterviewStatus === "InProgress" ? "bg-gray-150 text-main-100" : "bg-gray-100"}`}
                    >
                      {timeSlot?.time}
                    </div>

                    {timeSlot.groups.map((group) => (
                      <div className="flex items-center mx-[33px]">
                        <div className="text-gray-1100 py-[8px] px-[11px] ">
                          {group.interviewers.join("/")}
                        </div>

                        <div
                          className={`text-gray-1100 py-[8px] px-[11px] rounded-md bg-gray-100 border border-gray-200 ${timeSlot.InterviewStatus === "Complete" ? "bg-gray-200 text-gray-600" : timeSlot.InterviewStatus === "InProgress" ? "bg-gray-150 text-main-100" : "bg-gray-100"}`}
                        >
                          {timeSlot.InterviewStatus === "InProgress" ? (
                            <div className="relative group p-0">
                              <p className="cursor-pointer group-hover:opacity-0 transition-opacity">
                                {group.interviewees.join("/")}
                              </p>
                              <Link
                                to={`/recruting/answer_record/${encodeURIComponent(group.interviewees.join("/"))}`}
                                className="block w-full h-full"
                              >
                                <button className="text-center absolute w-[100px]  top-[-8px] left-[-12px] rounded-md py-2 px-[11px] bg-main-100 text-white-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                  답변 기록하기
                                </button>
                              </Link>
                            </div>
                          ) : (
                            <p>{group.interviewees.join("/")}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
