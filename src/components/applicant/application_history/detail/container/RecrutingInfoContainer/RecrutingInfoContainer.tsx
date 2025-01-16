import { ScoreSection } from "./ScoreSection";
import { CompetitionSection } from "./CompetitionSection";
import { GradeDistributionSection } from "./GradeDistributionSection";

export default function RecrutingInfoContainer() {
  return (
    <div className="w-full min-h-[1062px] p-7">
      <section className="flex">
        <img
          src="/assets/동아리정보.svg"
          alt="동아리 리크루팅 정보 이미지"
          className="w-[760px]"
        />
        <article className=" w-[390px] px-[19px] py-[17px] bg-gray-50 border border-gray-200 rounded-lg">
          <ScoreSection />
          <CompetitionSection />
          <GradeDistributionSection />
        </article>
      </section>
    </div>
  );
}
