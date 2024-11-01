//리크루팅 - 02 모집 준비하기 단계 페이지

import AnnouncementContainer from "../../components/recruting/_02_prepare/_03/AnnouncementContainer";
import Sidemenu from "../../components/recruting/Sidemenu";
export default function RecrutingPrepare() {
  return (
    <div className="flex bg-gray-100 px-16 py-9">
      <Sidemenu />
      <AnnouncementContainer />
    </div>
  );
}
