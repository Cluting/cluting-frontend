import AnnouncementListContainer from "../../components/applicant/announcement_list/AnnouncementListContainer";
import Sidemenu from "../../components/applicant/common/Sidemenu";

// 공고 리스트
export default function AnnouncementList() {
  return (
    <div className="w-full h-screen flex-center bg-gray-100">
      <Sidemenu />
      <AnnouncementListContainer />
    </div>
  );
}
