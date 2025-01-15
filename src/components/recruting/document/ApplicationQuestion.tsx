import { useQuery } from "@tanstack/react-query";
import { getDocEvaluationContent } from "../_03_document_evaluation/service/Step3";
import { useParams } from "react-router-dom";

//3 - 리크루팅 : 서류 평가하기 단계  지원 문항
export default function ApplicationQuestion() {
  const { id } = useParams<{ id: string }>();
  //FIX: 리크루팅 아이디, 지원자 아이디 하드 코딩
  const recruitId = 1;
  const { data: evaluationContent } = useQuery(
    ["evaluationContent", recruitId, id],
    () => getDocEvaluationContent(recruitId, parseInt(id!, 10)),
    {
      enabled: !!id
    }
  );

  return (
    <div className="flex flex-col items-start h-full pt-6 bg-gray-100 mb-[1200px]">
      <p className="evalutation-title mb-[9px]">지원 문항</p>
      {evaluationContent?.questionAndAnswers.map((qa, index) => (
        <section
          key={index}
          className="w-full mb-[24px] py-[27px] px-[17px] bg-main-300 border border-gray-200 rounded-lg"
        >
          <p className="text-headline text-left text-gray-1100 pl-[5px]">
            {index + 1}. {qa.question}
          </p>
          <div className="bg-white-100 rounded-lg border border-gray-200 mt-[18px] p-[19px] text-qustion text-justify text-gray-1000">
            {qa.answer}
          </div>
        </section>
      ))}
    </div>
  );
}
