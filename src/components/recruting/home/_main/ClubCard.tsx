import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Bookmark } from "lucide-react";

export default function ClubCard({
  id,
  dDay,
  clubImg,
  logoSrc,
  logoAlt,
  title,
  clubName,
  tags,
  isLarge = false // 기본값은 크기가 작은 버전
}: ClubCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false); //북마크
  const cardWidth = isLarge ? "w-[322px]" : "w-[288px]";

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/applicant/announcement/${id}/detail`);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = "/assets/home/main/defaultClub.svg";
  };

  return (
    <div
      className={`relative ${cardWidth} h-[211px] rounded-[16.86px] bg-[#FBFBFF] border border-gray-300 cursor-pointer`}
    >
      <div className="w-full h-[126px] rounded-t-[16px] bg-gray-300">
        <img
          src={clubImg}
          onClick={handleClick}
          onError={handleImageError}
          className="w-full h-full rounded-t-[16px] object-cover"
        />
        <div className="absolute left-[11px] top-[13px] w-[40px] h-[27px] rounded-[10.25px] bg-white-100 text-[#FF4E4E] text-[11px] flex items-center justify-center font-bold">
          D-{dDay}
        </div>
        <img src="/assets/smallBookmark.svg" alt="북마크" className="" />
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Bookmark
            className={`absolute right-[18px] top-[13px] w-6 h-6 transition-colors ${isBookmarked ? "fill-current text-white-100" : "text-white-100"}`}
          />
        </button>
      </div>
      <div className="absolute right-[23px] top-[96px] w-[60px] h-[60px] rounded-full bg-[#FBFBFF] flex items-center justify-center">
        <img
          src={logoSrc}
          onError={handleImageError}
          alt={logoAlt}
          className="w-[44px] h-[44px] rounded-full object-cover"
        />
      </div>

      <div
        onClick={handleClick}
        className="absolute bottom-0 left-0 pl-[21px] w-full h-[85px]"
      >
        <div className="pt-[9.99px]">
          <p className="text-[15px] font-bold text-left bottom-[57px] text-[#3A3A3C]">
            {title}
          </p>
          <p className="text-[9.97px] text-left text-[#3A3A3C]">{clubName}</p>
        </div>

        <div className="flex justify-between items-end pb-[13px]">
          <div className="flex items-center ml-[10px] gap-[25px] text-gray-1100 text-[10.03px]">
            {tags.map((tag, index) => (
              <p key={index}>{tag}</p>
            ))}
          </div>
          <button className="mr-[23px] w-[55px] h-[26px] bg-main-300 border border-main-400 text-main-100 text-caption3 rounded-[5px] flex-center">
            채팅
          </button>
        </div>
      </div>
    </div>
  );
}
