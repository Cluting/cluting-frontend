import { useLocation, useNavigate } from "react-router-dom";
import AnnouncementContainer from "../../components/applicant/announcement_list/detail/AnnouncementContainer";
import DocumentSubmitContainer from "../../components/applicant/announcement_list/detail/DocumentSubmitContainer";
import InquiryContainer from "../../components/applicant/announcement_list/detail/InquiryContainer";
import AnnouncementDetailHeader from "../../components/applicant/announcement_list/detail/AnnouncementDetailHeader";

// 공고 보기
export default function AnnouncementListDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentMenu = queryParams.get("menu") || "announcement";

  const setMenu = (menu: "announcement" | "documentSubmit" | "inquiry") => {
    queryParams.set("menu", menu);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="w-full bg-gray-100">
      {/* Header */}
      <AnnouncementDetailHeader
        currentMenu={
          currentMenu as "announcement" | "documentSubmit" | "inquiry"
        }
        setMenu={setMenu}
      />
      <div className="w-full px-28 bg-[#F1F3FF]">
        {currentMenu === "announcement" && <AnnouncementContainer />}
        {currentMenu === "documentSubmit" && <DocumentSubmitContainer />}
        {currentMenu === "inquiry" && <InquiryContainer />}
      </div>
    </div>
  );
}
