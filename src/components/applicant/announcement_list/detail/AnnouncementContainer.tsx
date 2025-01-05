import ClubInformation from "./ClubInformation/ClubInformation";
import ClubProfileShort from "./ClubInformation/ClubProfileShort";

export default function AnnouncementContainer() {
  return (
    <div
      className="w-[1213px] min-h-[800px] flex flex-col gap-12 px-16 py-10  bg-white-100"
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
        <p className="text-base font-normal text-left whitespace-pre-wrap font-Pretendard">
          동아리 설명글
        </p>
      </div>
    </div>
  );
}
