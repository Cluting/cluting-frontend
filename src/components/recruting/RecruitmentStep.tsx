//리크루팅 단계

export default function RecruitmentStep() {
  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <section>
          <div className="bg-gray-100 px-[19px] py-[8px] rounded-[7px] text-left">
            <p className="text-caption1 text-gray-700">Today</p>
            <p className="text-gray-900 text-title3">10월 13일 화요일</p>
          </div>
        </section>

        <section className="mt-5 mb-[25px]">
          <p className="text-subheadline">{"리크루팅을 시작해 주세요."}</p>
        </section>
      </div>

      <section className="flex items-center ml-10">
        <div>
          <div className="w-[70px] h-[70px] rounded-full bg-gray-400"></div>
          <p className="text-caption2 text-gray-700 mt-2">계획 세우기</p>
        </div>
        <img
          src="/assets/ic-progress.svg"
          alt="진행 단계"
          className=" w-[46px] h-[6px] mx-4 mb-5"
        />

        <div>
          <div className="w-[70px] h-[70px] rounded-full bg-gray-400"></div>
          <p className="text-caption2 text-gray-700 mt-2">모집 준비하기</p>
        </div>
        <img
          src="/assets/ic-progress.svg"
          alt="진행 단계"
          className=" w-[46px] h-[6px] mx-4 mb-5"
        />

        <div>
          <div className="w-[70px] h-[70px] rounded-full bg-gray-400"></div>
          <p className="text-caption2 text-gray-700 mt-2">서류 평가하기</p>
        </div>
        <img
          src="/assets/ic-progress.svg"
          alt="진행 단계"
          className=" w-[46px] h-[6px] mx-4 mb-5"
        />

        <div>
          <div className="w-[70px] h-[70px] rounded-full bg-gray-400"></div>
          <p className="text-caption2 text-gray-700 mt-2">
            서류 합격자 및 <br /> 면접 안내
          </p>
        </div>
        <img
          src="/assets/ic-progress.svg"
          alt="진행 단계"
          className=" w-[46px] h-[6px] mx-4 mb-5"
        />

        <div>
          <div className="w-[70px] h-[70px] rounded-full bg-gray-400"></div>
          <p className="text-caption2 text-gray-700 mt-2">면접 평가하기</p>
        </div>
        <img
          src="/assets/ic-progress.svg"
          alt="진행 단계"
          className=" w-[46px] h-[6px] mx-4 mb-5"
        />

        <div>
          <div className="w-[70px] h-[70px] rounded-full bg-gray-400"></div>
          <p className="text-caption2 text-gray-700 mt-2">
            최종 합격자 및 <br /> 활동 안내
          </p>
        </div>
      </section>
    </div>
  );
}
