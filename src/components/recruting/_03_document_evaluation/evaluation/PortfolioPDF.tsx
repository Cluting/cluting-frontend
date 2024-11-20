import { PdfViewer } from "@naverpay/react-pdf";
import { useCallback } from "react";

//임시 PDF 경로
const PDF_URL = "/assets/포트폴리오 예시.pdf";

const PDF_STYLE: React.CSSProperties = {
  width: "100vw",
  border: "2px solid #E5E5EA",
  margin: "0"
};

export default function PortfolioPDF() {
  const handleRenderPDFError = useCallback(() => {
    if (PDF_URL) {
      // 브라우저 기본 PDF 뷰어로 새 창 열기
      window.open(PDF_URL, "_blank");
    } else {
      console.error("PDF URL이 설정되지 않았습니다.");
    }
  }, []);
  return (
    <div className="flex-center w-full h-full pt-6 bg-gray-100">
      <PdfViewer
        style={PDF_STYLE}
        pdfUrl={PDF_URL}
        onErrorPDFRender={handleRenderPDFError}
      />
    </div>
  );
}
