// 1 - 계획하기 : 지원자 그룹 짓기
export default function GroupCreate() {
  return (
    <div className="custom-shadow w-full h-auto bg-white-100 py-6 mx-8 mt-[34px] px-[13px] rounded-[12px]">
      <div className="flex items-center mx-8 my-4">
        <h1 className="text-callout">지원자 그룹 짓기</h1>
        <div className="ml-3 tooltip ">
          동아리가 파트로 구분된다면 ex) 기획/디자인/홍보팀 등으로 그룹화해
          주세요
        </div>
      </div>
      <div className="flex items-start gap-4 h-[50px] mb-[62px]">
        <button className="button-main-light flex-center ml-8  py-[14px] px-[38px] text-callout rounded-[10px]">
          <img
            src="/assets/ic-addWhite.svg"
            alt="그룹 추가"
            className="w-[10px] h-[10px] mr-2 "
          />
          그룹 추가
        </button>
        <input
          placeholder="그룹명"
          className="w-[158px] h-full rounded-[8px] py-[11px] px-[20px]  text-center input-background"
        />
      </div>
    </div>
  );
}
