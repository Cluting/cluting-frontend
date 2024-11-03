//2-3 공고 작성 (컨테이너)

import AnnouncementContent from "./AnnouncementContent";
import AnnouncementDetails from "./AnnouncementDetails";

export default function AnnouncementContainer() {
  return (
    <div className="w-[1100px]">
      <div className="flex items-center mx-8 my-4">
        <h1 className="text-callout">공고 세부 사항</h1>
        <div className="ml-3 py-2 px-3 bg-white-100 rounded-[11px] border border-gray-200 ">
          우리 동아리의 인재상을 작성해 주세요.
        </div>
      </div>
      <AnnouncementDetails />
      <div className="flex items-center mx-8 my-4">
        <h1 className="text-callout">본문 작성</h1>
        <div className="ml-3 py-2 px-3 bg-white-100 rounded-[11px] border border-gray-200 ">
          우리 동아리의 인재상을 작성해 주세요.
        </div>
      </div>
      <AnnouncementContent />
    </div>
  );
}
