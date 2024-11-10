//2-5 지원서 폼 제작 및 공고 올리기 (컨테이너)
import ApplicantProfile from "./ApplicantProfile";

export default function CreateApplicationFormContainer() {
  return (
    <div className="w-[1100px]">
      {/*지원서 제목*/}
      <div className="ml-8 w-full mt-[26px]">
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
        <ApplicantProfile />
      </div>
      <div className="ml-8 w-full mt-[58px]">
        <div className="flex">
          <p className="section-title">
            <span className="mr-[0.25em] text-main-100">*</span>공통 질문 만들기
          </p>
          <div className="tooltip">공통 질문을 작성해 주세요.</div>
        </div>
        {/*공통 질문 만들기 */}
        <div className="mt-[12px] h-auto pt-[32px] pl-[31px] pr-[42px] pb-[32px] bg-white-100 rounded-[12px]">
          <p className="mb-[15px] text-title3 text-[#3B3D46] text-left">
            공통 질문 관련 주의 사항
          </p>
          <input
            className="flex items-center text-left w-full h-[42px] pl-[21px] rounded-[8px] border border-gray-500 text-subheadline outline-none hover:border-main-100"
            placeholder="글자 수를 지키지 않으면 불이익이 있을 수 있습니다. 글자 수를
            유의해 주세요!"
          />
          <div className="flex-center my-[42px] border border-gray-200 "></div>
          <p className="mb-[15px] text-title3 text-[#3B3D46] text-left">
            공통 질문 추가하기
          </p>
          <div className="w-full h-auto px-[21px] pt-[20px] pb-[13px] bg-gray-100 rounded-[12px] border border-gray-300">
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="질문을 작성해 주세요."
                className="w-[541px] h-[42px] py-[11px] pl-[19px] rounded-[8px] border border-gray-400 outline-none hover:border-main-100"
              />
              <div className="flex-center w-[247px] h-[42px] bg-white-100 rounded-[8px] border border-gray-400">
                드롭다운
              </div>
            </div>
            <input
              type="text"
              placeholder="지원자의 답변 작성란 입니다."
              className="w-full min-h-[91px] mt-[18px] py-[15px] pl-[20px] rounded-[8px] border border-gray-400 outline-none hover:border-main-100"
            />
            <div className="flex">
              <input
                type="checkbox"
                className="bg-gray-200 border border-main-300"
              />
              <p>글자 수 제한</p>

              <input
                type="text"
                className="flex-center w-[66px] h-[26px] rounded-[6px] border border-gray-500 outline-none hover:border-main-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
