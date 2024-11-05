import PopularClub from "./PopularClub";

export default function MainBanner() {
  return (
    <div className="relative flex justify-center max-w-[1440px] mx-auto">
      <p className="absolute top-[162.01px] left-[180.53px] text-[34px] font-semibold text-left">
        지금 가장 인기 있는<br></br>동아리 리스트
      </p>

      <div className="absolute top-[85.5px] left-[551.72px] flex-center gap-[25.36px]">
        <PopularClub />
        <PopularClub />
        <PopularClub />
      </div>
    </div>
  );
}
