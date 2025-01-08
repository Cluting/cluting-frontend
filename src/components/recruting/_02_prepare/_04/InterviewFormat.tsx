import { useFormContext } from "react-hook-form";
import { useInterviewStore } from "../../../../store/useStore";
import { useEffect, useState } from "react";

// 1 - 면접 형식 설정하기

export default function InterviewFormat() {
  const [summary, setSummary] = useState<string | null>(null);
  const { setInterviewer, setInterviewee } = useInterviewStore();

  const { register, watch } = useFormContext();

  const interviewer = watch("interviewer");
  const interviewee = watch("interviewee");

  useEffect(() => {
    // 전역 상태 등록
    setInterviewer(interviewer);
    setInterviewee(interviewee);
  }, [interviewer, interviewee, setInterviewer, setInterviewee]);

  useEffect(() => {
    if (interviewer > 0 && interviewee > 0) {
      setSummary(`${interviewer} : ${interviewee}로 면접을 진행합니다.`);
    } else {
      setSummary(null);
    }
  }, [interviewer, interviewee]);

  return (
    <div className="section-background ">
      <div className="flex items-center">
        <div className="flex flex-col">
          <p className="text-gray-850 text-callout">면접관</p>
          <div className="flex items-center">
            <input
              {...register("interviewer", { valueAsNumber: true, min: 0 })}
              type="number"
              min={0}
              defaultValue={0}
              className="w-20 input-style input-background mr-[11px]"
            />
            <p className="text-headline">명</p>
          </div>
        </div>
        <p className="mx-5 text-headline text-gray-800 mt-5">:</p>
        <div className="flex flex-col">
          <p className="text-gray-850 text-callout">면접자</p>
          <div className="flex items-center">
            <input
              {...register("interviewee", { valueAsNumber: true, min: 0 })}
              type="number"
              min={0}
              defaultValue={0}
              className="w-20 input-style input-background mr-[11px]"
            />
            <p className="text-headline">명</p>
          </div>
        </div>
      </div>
      {summary && (
        <p className="text-caption2 text-main-100 mt-[9px]">{summary}</p>
      )}
    </div>
  );
}
