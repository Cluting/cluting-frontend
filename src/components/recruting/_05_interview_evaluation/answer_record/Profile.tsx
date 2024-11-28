export default function Profile() {
  return (
    <section className="w-full h-[281px] bg-gray-50 border border-gray-200 rounded-[8px] px-[20px] py-[30px]">
      <div className="flex items-center mb-[36px] "></div>
      <div className="flex gap-[25px] items-start">
        <div className="grid grid-cols-[5fr_7fr] self-stretch gap-y-2 text-left text-subheadline text-gray-800 text ">
          <p className="text-title3 mb-[10px]">김민지</p>
          <div> </div>
          <div>지원 파트</div>
          <div>기획</div>
          <div>학교</div>
          <div>성신여자대학교</div>
          <div>학과</div>
          <div>서비스디자인공학과</div>
          <div>학기</div>
          <div>3학년 2학기</div>
        </div>
        <img
          src="/assets/profile.png"
          alt="프로필 예시 사진"
          className="w-[150px] h-[184px] shrink-0"
        />
      </div>
    </section>
  );
}
