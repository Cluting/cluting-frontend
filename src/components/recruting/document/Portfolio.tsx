import { useState } from "react";
import PortfolioPDF from "./PortfolioPDF";

//3 - 리크루팅 : 서류 평가하기 단계 포트폴리오
export default function Portfolio() {
  //포트폴리오 link,none,pdf
  const [showPortfolio, setShowPortfolio] = useState("pdf");
  return (
    <div
      className={` h-full pt-6 bg-gray-100 ${showPortfolio === "pdf" ? "flex flex-col items-center" : "flex flex-col items-start"}`}
    >
      {showPortfolio === "link" && (
        <section className="custom-shadow w-full py-[27px] px-[17px] bg-main-300 border border-gray-200 rounded-lg ">
          <div className="bg-white-100  break-words whitespace-normal rounded-lg border border-gray-200 p-[19px] text-qustion leading-6 text-justify text-gray-1000">
            <p>
              비핸스
              <br />
              <a
                href="https://www.behance.net/onboarding/hirerCreative"
                target="_blank"
                className=" underline"
              >
                https://www.behance.net/onboarding/hirerCreative
              </a>
              <br />
              피그마 <br />
              <a
                href=" https://www.figma.com/design/gk0WAmsaKt8gFqEfbF1Hpe/%EC%9E%87%ED%83%80_%EA%B0%81%EC%96%91%EA%B0%81%EC%84%B1_%ED%81%B4%EB%A3%A8%ED%8C%85?node-id=733-8392&t=xVKyOiYS2HCzIuX1-1"
                target="_blank"
                className=" underline"
              >
                https://www.figma.com/design/gk0WAmsaKt8gFqEfbF1Hpe/%EC%9E%87%ED%83%80_%EA%B0%81%EC%96%91%EA%B0%81%EC%84%B1_%ED%81%B4%EB%A3%A8%ED%8C%85?node-id=733-8392&t=xVKyOiYS2HCzIuX1-1
              </a>
            </p>
          </div>
        </section>
      )}

      {showPortfolio === "none" && (
        <div className="custom-shadow w-full h-[429px] flex-center bg-white-100  rounded-lg border border-gray-200 text-caption3  text-gray-600">
          지원자가 포트폴리오를 <br />
          등록하지 않았습니다
        </div>
      )}

      {showPortfolio === "pdf" && <PortfolioPDF />}
    </div>
  );
}
