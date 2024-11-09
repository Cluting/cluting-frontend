//2-5 지원서 폼 제작 및 공고 올리기 (컨테이너)
export default function CreateApplicationFormContainer() {
  return (
    <div className="w-[1100px]">
      {/*지원서 제목*/}
      <div className="ml-8 w-full mt-[30px]">
        <p className="section-title">
          <span className="mr-[0.25em] text-main-100">*</span>지원서 제목
        </p>

        <div className="mt-[12px] h-auto pt-[29px] px-[30px] pb-[40px] bg-white-100 rounded-[12px]">
          <input
            type="text"
            alt="지원서 제목 입력"
            placeholder="ex) OO 동아리 5기 지원"
            className="w-full h-[42px] pl-[21px] rounded-[8px] border border-gray-500 outline-none text-subheadline"
          />
        </div>
        {/*지원자 기본 프로필 */}
        <div className="flex mt-[34px]">
          <p className="section-title">
            <span className="mr-[0.25em] text-main-100">*</span>지원서 제목
          </p>
          <div className="tooltip">지원자의 기본 프로필을 불러옵니다.</div>
        </div>
        <div className="mt-[12px] h-auto pt-[23px] pt-[29px] px-[30px] pb-[29px] bg-white-100 rounded-[12px]">
          <div className="text-subheadline">
            <p className="text-left text-gray-700">인적 사항</p>
            <div className="flex w-full h-[207px] mt-3 pt-[22px] pb-[23px] pl-[24.08px] bg-[#FBFBFF] rounded-[12px] border border-gray-300">
              <div className="w-[146.9px] h-[162px] rounded-[10px] bg-gray-500"></div>
              <div>홍길동</div>
            </div>
          </div>
          <div className="pt-4 text-subheadline">
            <p className="text-left text-gray-700 ">학력</p>
            <div className="flex flex-col justify-center text-left w-full h-[190px] mt-3 pl-[46.59px] py-9 bg-[#FBFBFF] rounded-[12px] border border-gray-300 text-gray-900 gap-[29px]">
              <p>학교 O O대학교</p>
              <p>학과 OO학과</p>
              <p>다전공 OO학과</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
