export default function ApplicantProfile() {
  return (
    <div>
      {/*지원자 기본 프로필 */}
      <div className="flex mt-[34px]">
        <p className="section-title">지원자 기본 프로필</p>
        <div className="tooltip">지원자의 기본 프로필을 불러옵니다.</div>
      </div>
      <div className="mt-[12px] h-auto pt-[23px] pt-[29px] px-[30px] pb-[29px] bg-white-100 rounded-[12px]">
        <div className="text-subheadline">
          <p className="text-left text-gray-700">인적 사항</p>
          <div className="flex w-full h-[207px] mt-3 pt-[22px] pb-[23px] pl-[24.08px] bg-[#FBFBFF] rounded-[12px] border border-gray-300">
            <div className="w-[146.9px] h-[162px] rounded-[10px] bg-gray-500"></div>
            <div className="w-[497.44px] h-[129px] ml-[47.61px] mt-[18px] mb-[15px] text-left">
              <div className="flex">
                <p className="text-body text-gray-900 mr-[14px] mb-[36px]">
                  홍길동
                </p>
                <p className="text-callout text-gray-700">남자/OO학번</p>
              </div>
              <div className="flex justify-between text-subheadline">
                <div className="flex">
                  <p className="text-gray-700 mr-[37px] mb-[31px]">휴대폰 </p>
                  <p className="text-gray-900">010-1234-5678</p>
                </div>
                <div className="flex">
                  <p className="text-gray-700 mr-[20px]">이메일 </p>
                  <p className="text-gray-900">OOOO@naver.com</p>
                </div>
              </div>
              <div className="flex">
                <p className="text-gray-700 mr-[20px]">현 거주지 </p>
                <p className="text-gray-900">서울특별시 OO구</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 text-subheadline">
          <p className="text-left text-gray-700 ">학력</p>
          <div className="flex flex-col justify-center text-left text-subheadline w-full h-[190px] mt-3 pl-[46.59px] py-9 bg-[#FBFBFF] rounded-[12px] border border-gray-300 text-gray-900 gap-[29px]">
            <div className="flex">
              <p className="mr-[20px] text-gray-700">학교</p>
              <p className="text-gray-900"> OO대학교</p>
            </div>
            <div className="flex">
              <p className="mr-[37px] text-gray-700">학과</p>
              <p className="text-gray-900"> OO학과</p>
            </div>
            <div className="flex">
              <p className="mr-[20px] text-gray-700">다전공</p>
              <p className="text-gray-900"> OO학과</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
