interface ProfileProps {
  color: string;
  name: string;
  role: string;
  university: string;
  major: string;
  semester: string;
}

export default function Profile({
  color,
  name,
  role,
  university,
  major,
  semester
}: ProfileProps) {
  return (
    <section className="relative w-full h-[281px] flex-center bg-gray-100 border border-gray-200 rounded-[8px] px-[36px] py-[17px]">
      <div
        style={{ backgroundColor: `#${color}` }}
        className="absolute top-5 left-14 text-white-100 text-caption1 py-[5px] px-[12px] rounded "
      >
        면접자
      </div>
      <div className="flex gap-[42px] items-start mt-[50px]">
        <div className="min-w-[230px] grid grid-cols-[5fr_7fr] self-stretch gap-y-2 text-left text-[#6E6E6E] text-[16px]">
          <p className="text-title3 text-[#000] mb-[10px]">{name}</p>
          <div></div>
          <div className="font-bold">지원 파트</div>
          <div>{role}</div>
          <div className="font-bold">학교</div>
          <div>{university}</div>
          <div className="font-bold">학과</div>
          <div>{major}</div>
          <div className="font-bold">학기</div>
          <div>{semester}</div>
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
