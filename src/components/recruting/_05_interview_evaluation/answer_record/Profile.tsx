interface ProfileProps {
  color: string;
}

export default function Profile({ color }: ProfileProps) {
  return (
    <section className="relative w-full h-[281px] flex-center bg-gray-100 border border-gray-200 rounded-[8px] px-[36px] py-[17px]">
      <div
        style={{ backgroundColor: `#${color}` }}
        className="absolute top-5 left-14 text-white-100 text-caption1 py-[5px] px-[12px] rounded "
      >
        면접자1
      </div>
      <div className="flex gap-[42px] items-start mt-[50px]">
        <div className="grid grid-cols-[5fr_7fr]  self-stretch gap-y-2 text-left text-[#6E6E6E] text-[16px]">
          <p className="text-title3 text-[#000] mb-[10px]">김민지</p>
          <div> </div>
          <div className="font-bold">지원 파트</div>
          <div>기획</div>
          <div className="font-bold">학교</div>
          <div>성신여자대학교</div>
          <div className="font-bold">학과</div>
          <div>서비스디자인공학과</div>
          <div className="font-bold">학기</div>
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
