import { useState } from "react";
import ClubCard from "../components/recruting/home/ClubCard";
import ClubAlignDropdown from "../components/recruting/home/ClubAlignDropdown";
import ClubCardList from "../components/recruting/home/ClubCardList";
import MainCategory from "../components/recruting/home/MainCategory";

export default function Main() {
  return (
    <div>
      <div className="container max-w-[1077px] mx-auto">
        <MainCategory />
      </div>

      <div className="container max-w-[1072px] mx-auto">
        <ClubCardList />
      </div>
    </div>
  );
}
