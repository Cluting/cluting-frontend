import Chart from "./Chart/Chart";

export function GradeDistributionSection() {
  return (
    <section>
      <h2 className="mb-[14px] font-bold text-gray-800 text-left">학년분포</h2>
      <div className="relative w-full h-[200px] bg-gray-100 rounded-[7px]">
        <Chart />
      </div>
    </section>
  );
}
