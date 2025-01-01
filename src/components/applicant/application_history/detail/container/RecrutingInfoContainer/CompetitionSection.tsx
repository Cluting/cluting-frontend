export function CompetitionSection() {
  return (
    <section className="mb-[30px]">
      <h2 className="mb-[14px] font-bold text-gray-800 text-left">경쟁률</h2>
      <div className="w-full px-[65px] py-[13px] bg-gray-100 rounded-[7px]">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-headline text-gray-800">전체 평균</p>
          <p className="text-5xl font-bold">
            <span className="text-main-500">4 </span>: 1
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-headline text-gray-800">기획 평균</p>
          <p className="text-5xl font-bold">
            <span className="text-main-700">3.2 </span>: 1
          </p>
        </div>
      </div>
    </section>
  );
}
