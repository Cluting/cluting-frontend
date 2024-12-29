import AnnouncementListDetailContainer from "../../components/applicant/announcement_list/detail/AnnouncementListDetailContainer";
import Sidemenu from "../../components/applicant/common/Sidemenu";

// 공고 보기
export default function AnnouncementListDetail() {
  return (
    <div className="w-full h-screen flex-center bg-gray-100">
      <Sidemenu />
      <AnnouncementListDetailContainer />
    </div>
  );
}
