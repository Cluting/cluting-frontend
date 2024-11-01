export default function PopularClub() {
  return (
    <div className="relative w-[248px] h-[243px] rounded-[11.88px] bg-black overflow-hidden">
      <img
        src="assets/itTimeLogo.svg"
        alt="인기 동아리 로고(임시: 잇타)"
        className="absolute z-50 top-[13.98px] left-[18.36px] w-[41px] h-[41px] border-[0.87px] border-[#E2E3E5] rounded-full"
      />
      <img
        src="assets/popularClub.svg"
        alt="인기 동아리(임시: 잇타)"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute z-50 top-[18px] left-[192px] w-[40px] h-[20px] bg-white-100 border border-[#E2E3E5] rounded-[26.13px] text-[10.26px] flex-center">
        연합
      </div>
      <div className="absolute inset-0 flex flex-col justify-end pb-[17.48px]">
        <p className="px-[23px] text-white-100 text-[22px] font-semibold text-left leading-[30px]">
          IT 서비스<br></br>동아리 잇타
        </p>
        <div className="mt-[8.75px] pl-[23.61px] text-[13.99px] flex gap-[8.75px]">
          <p className="text-gray-200">IT</p>
          <p className="text-gray-200">프로그래밍</p>
          <p className="text-gray-200">서비스기획</p>
          <p className="text-gray-200">디자인</p>
        </div>
      </div>
    </div>
  );
}
