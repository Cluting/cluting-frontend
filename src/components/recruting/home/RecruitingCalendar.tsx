import "../../../style/calendar.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";
import AddAdminModal from "./AddAdminModal";

export default function RecruitingCalender() {
  //운영진 추가 모달
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const handleAddAdminOpenModal = () => {
    setIsAddAdminModalOpen(true);
  };
  const handleAddAdminCloseModal = () => {
    setIsAddAdminModalOpen(false);
  };
  return (
    <div className="mt-[30px] mx-10 bg-white-100 flex gap-[49px]">
      <div className="flex flex-col">
        <p className="text-headline  text-left mb-[21px]">
          리크루팅 정보 바로가기
        </p>
        <section className="w-[307px] text-caption3 bg-white-100  flex flex-col rounded-[12px]">
          <button className="bg-gray-100 border border-gray-200 flex items-center py-[14px] pl-4 mb-[17px] rounded-[8px] text-subheadline text-gray-900">
            <img
              src="/assets/ic-recruitingList-01.svg"
              alt="지원자 리스트 보기"
              className="w-5 h-5 mr-2"
            />
            지원자 리스트 보기
          </button>
          <button className="bg-gray-100 border border-gray-200 flex items-center  py-[14px] pl-4 mb-[17px] rounded-[8px] text-subheadline text-gray-900">
            <img
              src="/assets/ic-recruitingList-02.svg"
              alt="면접 일정 바로가기"
              className="w-5 h-5 mr-2"
            />
            면접 일정 바로가기
          </button>
          <button className="bg-gray-100 border border-gray-200 flex items-center  py-[14px] pl-4 mb-[17px] rounded-[8px] text-subheadline text-gray-900">
            <img
              src="/assets/ic-recruitingList-03.svg"
              alt="서류 합격자 리스트 바로가기"
              className="w-5 h-5 mr-2"
            />
            서류 합격자 리스트 바로가기
          </button>
          <button
            onClick={handleAddAdminOpenModal}
            className="bg-gray-100 border border-gray-200 flex items-center  py-[14px] pl-4 mb-[17px] rounded-[8px] text-subheadline text-gray-900"
          >
            <img
              src="/assets/ic-recruitingList-04.svg"
              alt=" 최종 합격 리스트 보기"
              className="w-5 h-5 mr-2"
            />
            최종 합격 리스트 보기
          </button>
        </section>
      </div>
      {isAddAdminModalOpen && (
        <AddAdminModal onClose={handleAddAdminCloseModal} />
      )}

      <div className="relative flex flex-col datepicker-container relative">
        <p className="text-headline  text-left mb-[21px]">리크루팅 달력</p>
        <FullCalendar
          locale="ko"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          nowIndicator={true}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next"
          }}
          timeZone="UTC"
        />
      </div>
    </div>
  );
}
