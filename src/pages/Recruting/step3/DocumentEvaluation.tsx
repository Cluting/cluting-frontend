//3 - 리크루팅 : 서류 평가하기 단계 (페이지)
import DocumentReviewPrepContainer from "../../../components/recruting/_03_document_evaluation/_01/DocumentReviewPrepContainer";
import Sidemenu from "../../../components/recruting/common/Sidemenu";

export default function DocumentEvaluation() {
  return (
    <div className="flex justify-center pt-6 bg-gray-100">
      <Sidemenu />
      <div className="w-[1016px]">
        <DocumentReviewPrepContainer />
      </div>
    </div>
  );
}
