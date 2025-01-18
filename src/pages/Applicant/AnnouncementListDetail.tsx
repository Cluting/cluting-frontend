import AnnouncementListDetailContainer from "../../components/applicant/announcement_list/detail/AnnouncementListDetailContainer";

// 공고 보기
export default function AnnouncementListDetail() {
  return (
    <div className="w-full h-full flex-center pt-6 bg-gray-100">
      <div className="w-[1016px] mb-[143px] h-full">
        <AnnouncementListDetailContainer />
      </div>
    </div>
  );
}
