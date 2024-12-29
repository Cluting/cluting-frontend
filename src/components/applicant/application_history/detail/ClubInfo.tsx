export default function ClubInfo() {
  const clubInfo = {
    id: 1,
    clubName: "IT 서비스 동아리 잇타",
    sessionNumber: "7기",
    applyDate: "2024.02.13",
    isPassed: "합격"
  };
  return (
    <div>
      <div className="flex-center px-[15px] py-[10px] bg-main-300 rounded-[10px]">
        <div className="relative flex-center mr-3 w-[54px] h-[54px] rounded-full bg-main-400">
          <img
            src="/assets/home/banner/popularClub2Logo.svg"
            alt="동아리 로고"
            className="flex-center w-[42px] h-[42px] rounded-full object-cover"
          />
        </div>
        <p className="text-body font-semibold mr-[19px]">
          {clubInfo.clubName} ({clubInfo.sessionNumber})
        </p>
        <p className="mr-[19px] text-[14px] text-gray-600 font-semibold">
          지원 일자: {clubInfo.applyDate}
        </p>
        <p className="w-[46px] h-[25px] bg-white-100 rounded-[5px] text-[#007AFF] font-semibold">
          {clubInfo.isPassed}
        </p>
      </div>
    </div>
  );
}
