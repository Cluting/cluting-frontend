import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDocEvaluationContent } from "../_03_document_evaluation/service/Step3";

//3 - 리크루팅 : 서류 평가하기 단계 기본 프로필
export default function UserProfile() {
  const { id } = useParams<{ id: string }>();

  //FIX: 임시 데이터 객체
  const tempData = {
    applicantInfo: {
      name: `user${id}`,
      groupName: "개발",
      email: "example@email.com",
      phone: "010-1234-5678",
      location: "서울특별시",
      school: "이화여자대학교",
      major: "컴퓨터공학과",
      doubleMajor: "경영학과",
      profile: "/assets/profile.png"
    }
  };

  //FIX:
  const recruitId = 1;
  const { data: evaluationContent } = useQuery(
    ["evaluationContent", recruitId, id],
    () => getDocEvaluationContent(recruitId, parseInt(id!, 10)),
    {
      enabled: !!id
    }
  );

  return (
    <div className="flex flex-col items-start h-full pt-6 bg-gray-100">
      <p className="evalutation-title mb-[9px]">기본 프로필</p>

      <div className="flex gap-4 w-full">
        <section className="w-full bg-gray-50 border border-gray-200 rounded-[8px] px-[20px] py-[30px]">
          <div className="flex items-center mb-[36px] ">
            <p className="text-title3">
              {evaluationContent
                ? evaluationContent?.applicantInfo?.name
                : `user${id}`}
            </p>
            <p className="text-caption3 text-gray-800 ml-[5px]">
              3학년 2학기 재학
            </p>
          </div>
          <div className="flex gap-[25px] items-start">
            <div className="grid grid-cols-[5fr_7fr] self-stretch gap-y-7 text-left text-subheadline text-gray-800 text ">
              <div>지원 그룹</div>
              <div>
                {evaluationContent
                  ? evaluationContent?.applicantInfo?.groupName
                  : tempData?.applicantInfo.groupName}
              </div>
              <div>이메일</div>
              <div>
                {evaluationContent
                  ? evaluationContent?.applicantInfo?.email
                  : tempData?.applicantInfo.email}
              </div>
              <div>휴대폰</div>
              <div>
                {evaluationContent
                  ? evaluationContent?.applicantInfo?.phone
                  : tempData?.applicantInfo.phone}
              </div>
              <div>현 거주지</div>
              <div>
                {evaluationContent
                  ? evaluationContent?.applicantInfo?.location
                  : tempData?.applicantInfo.location}
              </div>
            </div>
            {evaluationContent?.applicantInfo?.profile ? (
              <img
                src={evaluationContent?.applicantInfo?.profile}
                alt="프로필 예시 사진"
                className="w-fit h-fit shrink-0 rounded-lg object-cover"
              />
            ) : (
              <img
                src="/assets/profile.png"
                alt="프로필 예시 사진"
                className="w-[150px] h-[184px]"
              />
            )}
          </div>
        </section>

        <section className="bg-gray-50 min-w-[340px] border border-gray-200 rounded-[8px] px-[20px] py-[30px]">
          <div className="flex">
            <div className="grid grid-cols-[2fr_7fr] pt-[55px] gap-y-7 text-left text-subheadline text-gray-800 text ">
              <div>학교</div>
              <div>
                {evaluationContent
                  ? evaluationContent?.applicantInfo?.school
                  : tempData?.applicantInfo.school}
              </div>
              <div>학과</div>
              <div>
                {evaluationContent
                  ? evaluationContent?.applicantInfo?.major
                  : tempData?.applicantInfo.major}
              </div>
              <div>다전공</div>
              <div>
                {evaluationContent?.applicantInfo?.doubleMajor
                  ? evaluationContent?.applicantInfo?.doubleMajor
                  : tempData?.applicantInfo.doubleMajor}
                (부전공)
              </div>
              <div>학기</div>
              {/* //FIX:학기 변환 필요 */}
              <div>24년 하반기 기준 3학년 2학기 (재학)</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
