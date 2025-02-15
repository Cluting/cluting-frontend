//불합격한 동아리

import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import ClubCard from "../../../recruting/home/_main/ClubCard";

export default function FailClubContainer() {
  const { menu } = useParams();
  const navigate = useNavigate();

  const clubsData = [
    {
      id: uuidv4(),
      dDay: 3,
      clubImg: "/assets/home/main/1.svg",
      logoSrc: "/assets/home/main/1Logo.svg",
      logoAlt: "1",
      title: "밴드 온더락 6기 모집",
      clubName: "밴드 On The Rock",
      tags: ["문화예술", "밴드", "인디"]
    },
    {
      id: uuidv4(),
      dDay: 3,
      clubImg: "/assets/home/main/1.svg",
      logoSrc: "/assets/home/main/1Logo.svg",
      logoAlt: "1",
      title: "밴드 온더락 6기 모집",
      clubName: "밴드 On The Rock",
      tags: ["문화예술", "밴드", "인디"]
    },
    {
      id: uuidv4(),
      dDay: 3,
      clubImg: "/assets/home/main/1.svg",
      logoSrc: "/assets/home/main/1Logo.svg",
      logoAlt: "1",
      title: "밴드 온더락 6기 모집",
      clubName: "밴드 On The Rock",
      tags: ["문화예술", "밴드", "인디"]
    }
  ];

  const handleCardClick = (clubId: string) => {
    navigate(`/applicant/applications/${menu}/detail`);
  };

  return (
    <div className="w-full min-h-[630px] bg-white-100">
      <div className="grid grid-cols-3 gap-8">
        {clubsData.map((club, index) => (
          <div
            key={club.id}
            onClick={() => handleCardClick(club.id)}
            className="cursor-pointer"
          >
            <ClubCard
              id={club.id}
              dDay={club.dDay}
              clubImg={club.clubImg}
              logoSrc={club.logoSrc}
              logoAlt={club.logoAlt}
              title={club.title}
              clubName={club.clubName}
              tags={club.tags}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
