// 2 - 면접 시간 설정하기
export default function InterviewTime() {
  return (
    <div className="section-background ">
      <div className="flex">
        <label className="text-subheadline flex gap-2 mr-11">
          <input name="interviewDuration" id="30min" type="radio" />
          30분
        </label>

        <label className="text-subheadline flex gap-2">
          <input name="interviewDuration" id="1hour" type="radio" />
          1시간
        </label>
      </div>
    </div>
  );
}
