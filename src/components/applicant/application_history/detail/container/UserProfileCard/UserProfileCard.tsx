export default function UserProfileCard() {
  return (
    <div className="기본 프로필">
      <p className="mb-[9px] text-[#7E7E7E] text-subheadline text-left">
        기본 프로필
      </p>
      <div className="flex justify-between">
        <div className="w-[560px] h-[268px] px-5 pt-[30px] pb-[27px] bg-gray-50 border border-gray-200 rounded-[8px]">
          <span className="flex items-end">
            <p className="mr-[5px] text-title3">김민지</p>
            <p className="text-caption3 text-gray-800">3학년 2학기 재학</p>
          </span>
          <div className="flex gap-[25px] items-end">
            <div className="flex flex-col gap-[22px]">
              <span className="flex">
                <p className="mr-[55px] text-subheadline text-gray-800">
                  지원 그룹
                </p>
                <p className="text-callout text-gray-800 font-medium">기획</p>
              </span>
              <span className="flex">
                <p className="mr-[69px] text-subheadline text-gray-800">
                  이메일
                </p>
                <p className="text-callout text-gray-800 font-medium">
                  cluting@gmail.com
                </p>
              </span>
              <span className="flex">
                <p className="mr-[69px] text-subheadline text-gray-800">
                  휴대폰
                </p>
                <p className="text-callout text-gray-800 font-medium">
                  010-1234-5678
                </p>
              </span>
              <span className="flex ">
                <p className="mr-[53px] text-subheadline text-gray-800">
                  현 거주지
                </p>
                <p className="text-callout text-gray-800 font-medium">
                  서울시 강남구
                </p>
              </span>
            </div>
            <div className="flex items-end">
              <div className="w-[150px] h-[184px] bg-gray-200 rounded-[12px]">
                <img
                  src="/assets/profile.png"
                  alt="프로필"
                  className="border border-gray-200 rounded-[12px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-[560px] h-[268px] px-[29px] pt-[50px] bg-gray-50 border border-gray-200 rounded-[8px]">
          <span className="mb-7 flex ">
            <p className="mr-[69px] text-subheadline text-gray-800">학교</p>
            <p className="text-callout text-gray-800 font-medium">
              성신여자대학교
            </p>
          </span>
          <span className="mb-7 flex ">
            <p className="mr-[69px] text-subheadline text-gray-800">학과</p>
            <p className="text-callout text-gray-800 font-medium">
              서비스디자인공학과
            </p>
          </span>
          <span className="mb-7 flex ">
            <p className="mr-[53px] text-subheadline text-gray-800">다전공</p>
            <p className="text-callout text-gray-800 font-medium">
              시각디자인학과(부전공)
            </p>
          </span>
          <span className="flex ">
            <p className="mr-[69px] text-subheadline text-gray-800">학기</p>
            <p className="text-callout text-gray-800 font-medium text-left">
              24년 하반기 기준 3학년 2학기<br></br>(재학)
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}
