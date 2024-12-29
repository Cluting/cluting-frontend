import { ScoreSection } from "./ScoreSection";
import { CompetitionSection } from "./CompetitionSection";
import { GradeDistributionSection } from "./GradeDistributionSection";

export default function RecrutingInfoContainer() {
  return (
    <div className="relative w-full min-h-[1062px] px-7 py-[26px]">
      <article className="absolute right-7 w-[390px] px-[19px] py-[17px] bg-gray-50 border border-gray-200 rounded-lg">
        <ScoreSection />
        <CompetitionSection />
        <GradeDistributionSection />
      </article>
    </div>
  );
}
