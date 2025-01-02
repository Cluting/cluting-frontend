export function ScoreSection() {
  return (
    <section className="mb-[30px]">
      <h2 className="mb-[14px] font-bold text-gray-800 text-left">평균 점수</h2>
      <div className="flex flex-col gap-[9px]">
        <div className="w-full px-[92px] py-[15px] bg-gray-100 rounded-[7px]">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-subheadline text-gray-800">합격 기준 점수</p>
            <p className="text-headline font-bold text-[#000000]">88.7점</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-subheadline text-gray-800">총점 평균</p>
            <p className="text-headline font-bold text-[#000000]">81점</p>
          </div>
        </div>
        <div className="w-full px-[92px] py-[15px] bg-main-300 rounded-[7px]">
          <div className="flex items-center justify-between">
            <p className="text-subheadline text-gray-800">내 점수</p>
            <p className="text-headline font-bold text-main-100">90점</p>
          </div>
        </div>
      </div>
    </section>
  );
}
