//지원자 홈

import ApplicantCalendar from "./ApplicantCalendar";
import ApplicantStatus from "./ApplicationStatus";

export default function ApplicantHomeContainer() {
  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="ml-[34.38px] mt-7 flex flex-col items-start ">
        <h1 className="text-title2 font-bold mb-4">프로필 홈</h1>
        <div className="w-[1015px] px-12 py-10 bg-white-100 text-left rounded rounded-tr-[12px] rounded-bl-[12px] rounded-br-[12px]">
          <section>
            <h2 className="font-bold text-title2 text-gray-800">
              내 지원 상황
            </h2>
            <ApplicantStatus />
            <ApplicantStatus />
          </section>

          <section className="mt-[34px]">
            <h2 className="font-bold text-title2 text-gray-800">
              지원 캘린더(2)
            </h2>
            <ApplicantCalendar />
          </section>
        </div>
      </div>
    </div>
  );
}
