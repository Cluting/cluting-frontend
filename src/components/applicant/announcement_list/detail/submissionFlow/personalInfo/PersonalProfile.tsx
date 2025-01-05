const PersonalProfile = () => {
  return (
    <div className="w-full h-[36rem] p-8 rounded-xl bg-white-100">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h5 className="text-left font-Pretendard font-semibold text-[#646775] text-base leading-5 tracking-tight">
            인적 사항
          </h5>
          <div className="flex gap-8 w-full h-52 p-6 bg-gray-50 border border-[#B9BED3] rounded-xl">
            <div className="w-[8.5rem] h-full overflow-hidden rounded-lg">
              <img
                src="/assets/profile.png"
                className="w-full h-full"
                alt="프로필 사진"
              />
            </div>
            <div className="flex flex-col gap-8 justify-evenly">
              <div className="flex items-end gap-3">
                <h3 className="font-Pretendard font-semibold text-[#4C4E59] text-xl leading-6 tracking-wide">
                  김민지
                </h3>
                <span className="font-Pretendard font-medium text-base text-[#646775] leading-5 tracking-tight">
                  여자 / 22학번
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-20 gap-y-8">
                <div className="flex gap-5">
                  <h4 className="w-14 text-left font-Pretendard font-semibold leading-5 tracking-tighter text-base text-[#646775]">
                    휴대폰
                  </h4>
                  <h4 className="font-Pretendard font-semibold leading-5 tracking-tighter text-base text-[#4C4E59]">
                    010-1234-5678
                  </h4>
                </div>
                <div className="flex gap-5">
                  <h4 className="w-14 text-left font-Pretendard font-semibold leading-5 tracking-tighter text-base text-[#646775]">
                    이메일
                  </h4>
                  <h4 className="font-Pretendard font-semibold leading-5 tracking-tighter text-base text-[#4C4E59]">
                    1234@gmail.com
                  </h4>
                </div>
                <div className="flex gap-5">
                  <h4 className="w-14 text-left font-Pretendard font-semibold leading-5 tracking-tighter text-base text-[#646775]">
                    현 거주지
                  </h4>
                  <h4 className="font-Pretendard font-semibold leading-5 tracking-tighter text-base text-[#4C4E59]">
                    서울특별시 강남구
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-left font-Pretendard font-semibold text-[#646775] text-base leading-5 tracking-tight">
            학력
          </h5>
          <div className="flex flex-col justify-between w-full h-52 px-8 py-10 bg-gray-50 border border-[#B9BED3] rounded-xl">
            <div className="flex gap-5">
              <h4 className="w-14 text-left font-Pretendard font-semibold leading-5 tracking-tighter text-base text-[#646775]">
                학교
              </h4>
              <h4 className="font-Pretendard font-semibold leading-5 tracking-tighter text-base text-[#4C4E59]">
                성신여자대학교
              </h4>
            </div>
            <div className="flex gap-5">
              <h4 className="w-14 text-left font-Pretendard font-semibold leading-5 tracking-tighter text-base text-[#646775]">
                학과
              </h4>
              <h4 className="font-Pretendard font-semibold leading-5 tracking-tighter text-base text-[#4C4E59]">
                서비스디자인공학과
              </h4>
            </div>
            <div className="flex gap-5">
              <h4 className="w-14 text-left font-Pretendard font-semibold leading-5 tracking-tighter text-base text-[#646775]">
                다전공
              </h4>
              <h4 className="font-Pretendard font-semibold leading-5 tracking-tighter text-base text-[#4C4E59]">
                시각디자인학과
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
