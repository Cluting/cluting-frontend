//리크루팅 홈

import { useState } from "react";
import RecrutingStartModal from "../../components/recruting/home/_start/RecrutingStartModal";

import AddAdmin from "../../components/recruting/home/_admin/AddAdmin";
import Sidemenu from "../../components/recruting/common/Sidemenu";
import RecruitmentStep from "../../components/recruting/common/RecruitmentStep";
import RecruitingCalender from "../../components/recruting/home/RecruitingCalendar";
import { useRecruitmentStartStore } from "../../store/useStore";
import AddAdminModal from "../../components/recruting/home/_admin/AddAdminModal";
import TodoTemplate from "../../components/recruting/home/_todo/TodoTemplate";
import { useQuery } from "@tanstack/react-query";
import { getRecruitingHome } from "../../components/recruting/service/recruiting";
import { useParams } from "react-router-dom";
import { ENTIRE_STAGE } from "../../constants/recruting";

export default function RecrutingHome() {
  const { isRecruitingStarted, startRecruiting } = useRecruitmentStartStore();

  //FIX:
  const params = useParams();
  const clubId = Number(params.clubId);
  const recruitId = 1;

  // 리크루팅 홈 데이터 조회
  const { data: recruitingHomeData } = useQuery(
    ["recruitingHome", recruitId, clubId],
    () => getRecruitingHome(recruitId, clubId),
    {
      onSuccess: (data) => {
        console.log(data);

        if (data?.recruitInfo) {
          const { currentStage, clubName, generation } = data.recruitInfo;

          if (ENTIRE_STAGE.includes(currentStage)) {
            startRecruiting();
          }
        }
        // TODO: TopSection에 현재 진행중인 단계 보이도록 데이터 전달
      }
    }
  );

  //운영진 추가 모달
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const handleAddAdminOpenModal = () => {
    setIsAddAdminModalOpen(true);
  };
  const handleAddAdminCloseModal = () => {
    setIsAddAdminModalOpen(false);
  };

  //리크루팅 모달
  const [isRecrutingModalOpen, setIsRecrutingModalOpen] = useState(false);
  const handleRecrutingOpenModal = () => {
    setIsRecrutingModalOpen(true);
  };
  const handleRecrutingCloseModal = () => {
    setIsRecrutingModalOpen(false);
  };

  return (
    <div className="flex justify-center pt-6 bg-gray-100 ">
      <Sidemenu />
      <div className="w-[1050px] flex flex-col mb-[180px]">
        <div className="  h-auto bg-white-100 pb-6 ml-8  rounded-[12px]">
          <RecruitmentStep />
          <div className="flex">
            <RecruitingCalender
              apiSchedule={recruitingHomeData?.recruitSchedule}
            />
          </div>
          <div className="px-10 py-[30px]">
            <div className="flex gap-11">
              <section className="w-min">
                <div className="flex">
                  <div className="w-full flex justify-between mb-4">
                    <p className="text-headline  text-left">운영진</p>
                    <button
                      onClick={handleAddAdminOpenModal}
                      className="button-main-light flex-center h-min py-[9px] px-[18px] text-caption2 rounded-[10px]"
                    >
                      <img
                        src="/assets/ic-addMain.svg"
                        alt="운영진 추가"
                        className="w-[10px] h-[10px] mr-2"
                      />
                      운영진 추가
                    </button>
                  </div>
                </div>
                <AddAdmin />
              </section>
              {isAddAdminModalOpen && (
                <AddAdminModal onClose={handleAddAdminCloseModal} />
              )}
              <section className="w-min">
                <p className="text-headline text-left mb-7">개인 TODO</p>
                <TodoTemplate />
              </section>
            </div>
          </div>
        </div>

        {!isRecruitingStarted && (
          <section className="fixed bottom-[16px] z-[999] w-[1018px] mb-10 bg-main-300 text-headline flex items-center justify-between mx-8 mt-[14px] py-[15px] px-[30px] rounded-[12px] border-main-400">
            <p className="mt-7 text-headline text-gray-800 mb-[30px] text-left">
              아직 리크루팅을 시작하지 않았어요. 리크루팅을 시작해 주세요!
            </p>
            <button
              onClick={handleRecrutingOpenModal}
              className="button-main-bg py-[13px] px-[25px] rounded-[10px]"
            >
              리크루팅 시작하기
            </button>
          </section>
        )}

        {isRecrutingModalOpen && (
          <RecrutingStartModal onClose={handleRecrutingCloseModal} />
        )}
      </div>
    </div>
  );
}
