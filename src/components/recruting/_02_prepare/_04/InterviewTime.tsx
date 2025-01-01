import { useFormContext } from "react-hook-form";

// 2 - 면접 시간 설정하기
export default function InterviewTime() {
  const { register } = useFormContext();

  return (
    <div className="section-background ">
      <div className="flex">
        <label className="text-subheadline flex gap-2 mr-11">
          <input
            {...register("interviewDuration", { valueAsNumber: true })}
            value={30}
            name="interviewDuration"
            id="30min"
            type="radio"
          />
          30분
        </label>

        <label className="text-subheadline flex gap-2">
          <input
            {...register("interviewDuration", { valueAsNumber: true })}
            value={60}
            name="interviewDuration"
            id="1hour"
            type="radio"
          />
          1시간
        </label>
      </div>
    </div>
  );
}
