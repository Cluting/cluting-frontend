import DetailContents from "./DetailContents";

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="flex items-center  gap-[75px]">
      <span className="font-bold text-gray-1200 w-32 text-left">{label}</span>
      <span className="text-gray-1100">{value}</span>
    </div>
  );
}

export default function AnnouncementContainer() {
  return (
    <div className="max-w-4xl p-6 bg-white rounded-lg">
      <div className="flex flex-row gap-11 mb-12">
        <img
          src="/assets/club-poster.svg"
          alt="포스터"
          className="w-[337px] h-[478px]"
        />

        <div className="w-full ">
          <div className="flex mb-6">
            <div className="flex items-center w-[284px] h-[73px] p-4 bg-main-300 rounded-lg">
              <div className="flex items-center justify-center w-[54px] h-[54px] bg-main-400 rounded-full">
                <img
                  src="/assets/home/banner/popularClub2Logo.svg"
                  alt="잇타 로고"
                />
              </div>
              <p className="ml-3 font-semibold text-gray-900">
                IT 서비스 동아리 잇타 (7기)
              </p>
            </div>
            <button className="p-2">
              <img
                src="/assets/ic-bookmark.svg"
                alt="북마크"
                className="ml-7"
              />
            </button>
          </div>

          {/* Details list */}
          <div className="space-y-7">
            <DetailItem label="접수 기간" value="2월 16일(월) ~ 2월 27일(수)" />
            <DetailItem label="서류 합격자 발표일" value="2월 28일(목)" />
            <DetailItem label="최종 합격자 발표일" value="3월 2일(일)" />
            <DetailItem label="모집 인원" value="약 50명" />
            <DetailItem
              label="활동 기간"
              value="2025년 3월-2025년 8월 (약 5개월)"
            />
            <DetailItem label="활동 요일" value="매주 토요일" />
            <DetailItem label="활동 시간" value="2-3시간 내외" />
            <DetailItem label="동아리 회비" value="5만원" />
          </div>
        </div>
      </div>
      <hr />
      <div>
        <DetailContents />
      </div>
    </div>
  );
}
