//3 - 리크루팅 : 서류 평가하기 단계
import TopSection from "../../../components/recruting/_03_document_evaluation/common/TopSection";
import Sidemenu from "../../../components/recruting/common/Sidemenu";
import DocumentReviewContainer from "../../../components/recruting/_03_document_evaluation/_02/DocumentReviewContainer";

export default function DocumentEval() {
  return (
    <div className="flex justify-center pt-6 bg-gray-100">
      <Sidemenu />
      <div className="w-[1016px] mb-[400px]">
        <TopSection />
        <DocumentReviewContainer />
      </div>
    </div>
  );
}
