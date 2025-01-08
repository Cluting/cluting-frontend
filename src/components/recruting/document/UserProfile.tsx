import { useParams } from "react-router-dom";
import { useApplicantEvaluationStore } from "../../../store/useEvaluationStore";

//3 - 리크루팅 : 서류 평가하기 단계 기본 프로필
export default function UserProfile() {
  const { id } = useParams<{ id: string }>();

  const { applicants } = useApplicantEvaluationStore();
  const applicant = applicants.find((item) => item.id === id);

  //FIX: evaluation에 없는 applicant 정보 추가하여 나머지도 불러와야 함 (현재는 applicant에만 있는 데이터만)

  return (
    <div className="flex flex-col items-start h-full pt-6 bg-gray-100">
      <p className="evalutation-title mb-[9px]">기본 프로필</p>

      <div className="flex gap-4 w-full">
        <section className="w-full bg-gray-50 border border-gray-200 rounded-[8px] px-[20px] py-[30px]">
          <div className="flex items-center mb-[36px] ">
            <p className="text-title3">{applicant?.name}</p>
            <p className="text-caption3 text-gray-800 ml-[5px]">
              3학년 2학기 재학
            </p>
          </div>
          <div className="flex gap-[25px] items-start">
            <div className="grid grid-cols-[5fr_7fr] self-stretch gap-y-7 text-left text-subheadline text-gray-800 text ">
              <div>지원 그룹</div>
              <div>{applicant?.group}</div>
              <div>이메일</div>
              <div>cluting@gmail.com</div>
              <div>휴대폰</div>
              <div>010-1234-5678</div>
              <div>현 거주지</div>
              <div>서울시 강남구</div>
            </div>
            {/* <img
              src="/assets/profile.png"
              alt="프로필 예시 사진"
              className="w-[150px] h-[184px] shrink-0"
            /> */}
            <div className="w-[150px] h-[184px] shrink-0 bg-gray-200 rounded-lg">
              {" "}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 min-w-[340px] border border-gray-200 rounded-[8px] px-[20px] py-[30px]">
          <div className="flex">
            <div className="grid grid-cols-[2fr_7fr] pt-[55px] gap-y-7 text-left text-subheadline text-gray-800 text ">
              <div>학교</div>
              <div>성신 여자 대학교</div>
              <div>학과</div>
              <div>서비스디자인공학과</div>
              <div>다전공</div>
              <div>시각디자인학과 (부전공)</div>
              <div>학기</div>
              <div>24년 하반기 기준 3학년 2학기 (재학)</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
