//3 - 리크루팅 : 서류 평가 준비하기 단계
import TopSection from "../../../components/recruting/_03_document_evaluation/common/TopSection";
import Sidemenu from "../../../components/recruting/common/Sidemenu";
import DocumentReviewPrepContainer from "../../../components/recruting/_03_document_evaluation/_01/DocumentReviewPrepContainer";

export default function DocumentPrep() {
  return (
    <div className="flex justify-center pt-6 bg-gray-100">
      <Sidemenu />
      <div className="w-[1016px]">
        <TopSection />
        <DocumentReviewPrepContainer />
      </div>
    </div>
  );
}
