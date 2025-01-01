export default function PopularClub({
  logoSrc,
  logoAlt,
  mainImageSrc,
  clubType,
  clubTitleFirst,
  clubTitleSecond,
  tags
}: PopularClubProps) {
  return (
    <div className="hover-animation relative w-[248px] h-[243px] rounded-[11.88px] bg-black overflow-hidden">
      <img
        src={logoSrc}
        alt={logoAlt}
        className="absolute z-50 bottom-[13px] right-[18px] w-[41px] h-[41px] border-[0.87px] border-gray-400 rounded-full"
      />
      <img
        src={mainImageSrc}
        alt={logoAlt}
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-end px-[23px] pb-[17.48px]">
        <div
          className={`w-[40px] h-[20px] mb-[5.33px] bg-white-100 border border-gray-100 rounded-[26.13px] text-caption2 flex-center ${clubType === "연합" ? "text-main-600" : "text-main-700"}`}
        >
          {clubType}
        </div>
        <p className="text-white-100 text-title3 text-left">
          {clubTitleFirst}
          <br />
          {clubTitleSecond}
        </p>
        <div className="mt-[8.75px] text-[13.99px] flex gap-[8.75px]">
          {tags.map((tag, index) => (
            <p key={index} className="text-gray-200">
              {tag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
