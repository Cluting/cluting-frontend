//2-3 공고 작성 (컨테이너)

import AnnouncementContent from "./AnnouncementContent";
import AnnouncementDetails from "./AnnouncementDetails";

export default function AnnouncementContainer() {
  return (
    <div>
      <div className="flex items-center mx-8 my-4">
        <h1 className="text-callout">공고 세부 사항</h1>
        <div className=" ml-3 tooltip">
          우리 동아리의 인재상을 작성해 주세요.
        </div>
      </div>
      <AnnouncementDetails />
      <div className="flex items-center mx-8 my-4">
        <h1 className="text-callout">본문 작성</h1>
        <div className=" ml-3 tooltip ">
          우리 동아리의 인재상을 작성해 주세요.
        </div>
      </div>
      <AnnouncementContent />
    </div>
  );
}
