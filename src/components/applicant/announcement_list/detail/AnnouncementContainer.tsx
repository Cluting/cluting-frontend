import ClubInformation from "./ClubInformation/ClubInformation";
import ClubProfileShort from "./ClubInformation/ClubProfileShort";

export default function AnnouncementContainer() {
  return (
    <div
      className="flex flex-col gap-12 px-16 py-10 bg-white-100"
      style={{ boxShadow: "0px 4px 21.6px 0px rgba(0, 0, 0, 0.05)" }}
    >
      {/* 공고 윗부분 */}
      <div className="flex gap-14">
        <div className="w-80 h-[30rem]">
          <img
            src="/assets/Itstime.png"
            className="object-cover w-full h-full"
            alt="잇타 포스터"
          />
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-6">
            <ClubProfileShort
              imgSrc="/assets/ic-Itstime.png"
              name="IT 서비스 동아리 잇타 (7기)"
            />
            <button type="button" className="border-none bg-none">
              <img
                src="/assets/ic-bookMark.svg"
                className="w-[38px] h-[38px]"
                alt="북마크"
              />
            </button>
          </div>
          {/* 동아리 정보 */}
          <ClubInformation />
        </div>
      </div>

      <hr className="w-full" />
      {/* 세부 내용 */}
      <div className="flex flex-col gap-10">
        <h3 className="text-xl font-semibold leading-5 tracking-tight text-left font-Pretendard text-gray-1100">
          세부 내용
        </h3>
        <pre className="text-base font-normal text-left whitespace-pre-wrap font-Pretendard">
          줄바꿈이안돼요 아놔 대학생 연합 IT 동아리 잇타(IT’s TIME)에서 6기
          신입회원을 모집합니다! 잇타는 ’IT’s TIME‘의 줄임말로, ’이제 ______ 할
          시간‘이라는 의미를 담고 있습니다. 세상에 없던 새로운 서비스, 상상만
          해도 즐거운 프로젝트, 사업성 높은 아이디어들, 이 모든 IT 꿈들을 현실로
          만드는 대학생 연합 IT 동아리입니다. 이제는 꿈을 이룰 시간, 바로 잇타와
          함께하세요. 🔥 활동 내용 - 웹/앱 팀 프로젝트 - 동아리 정규 프로그램 -
          분야별 스터디 - IT’s TRIP (잇타 MT) - 뒤풀이 등 친목 교류 프로그램 📅
          모집 일정 - 1차 서류 모집: 8월 15일(목) ~ 8월 25일(일) 23:59 - 1차
          합격자 발표: 8월 29일(목) (개별 문자 발표) - 2차 면접 (비대면,
          게더타운): 8월 30일(금) ~ 9월 2일(월) - 최종 합격자 발표 : 9월 6일(금)
          - OT: 9월 14일(토) (대면 필참) 🙌 모집 대상 - 수도권 대학생 (재학생,
          휴학생, 졸업유예생 모두 가능 / 단, 24년도 8월 졸업생 지원불가) - 매달
          2회 토요일 정규 프로그램에 빠짐없이 참여 가능한 사람 - 팀 활동 및
          회의에 성실히 참여 가능한 사람 - 책임감과 애정을 갖고 팀 프로젝트에
          진심을 다할 수 있는 사람 - 팀원들과 원활한 의사소통이 가능한 사람 - 팀
          프로젝트에서 문제 상황을 해결해 본 경험이 있는 사람 🎈 모집 분야 및
          자격 요건 1. 기획 파트 - 기획의 기본 흐름을 알고 IT 서비스 기획을
          경험해 본 사람 - 기획하고 싶은 서비스에 대한 아이디어가 있는 사람 -
          기획 파트의 경우, OT 때 진행하는 기획 세미나에서 자신의 아이디어를
          간단하게 발표해야 합니다. 2. 디자인 파트 - 프로젝트 경험이 있고,
          피그마를 다룰 줄 아는 사람 - 서비스에 맞는 디자인을 할 수 있는 사람 3.
          개발 파트 (웹 프론트엔드, 앱 프론트엔드, 백엔드) - 개발 프로젝트
          경험이 있고, 이를 증명할 수 있는 깃허브 계정이 있는 사람 - 다른 파트의
          팀원들과 원활히 소통할 줄 아는 사람 4. 우대사항 - 프로젝트 리딩 경험이
          있는 사람 ⭐️ 지원 방법 - 지원 구글폼은 프로필 링크를 참고해주세요. -
          중복 지원 가능하나, 지원하실 모든 파트의 지원서를 각각 제출해주셔야
          합니다. - 지원서 제출은 8월 25일(일) 23:59 까지이니 기한을
          준수해주시기 바랍니다.
        </pre>
      </div>
    </div>
  );
}
