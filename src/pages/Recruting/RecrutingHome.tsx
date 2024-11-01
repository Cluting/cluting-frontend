//리크루팅 홈

import { useState } from "react";
import RecrutingStartModal from "../../components/recruting/home/RecrutingStartModal";
import Sidemenu from "../../components/recruting/Sidemenu";
import TodoTemplate from "../../components/recruting/home/_todo/TodoTemplate";
import RecruitmentStep from "../../components/recruting/RecruitmentStep";
import AddAdmin from "../../components/recruting/home/AddAdmin";
import AddAdminModal from "../../components/recruting/home/AddAdminModal";

export default function RecrutingHome() {
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
    <div className="flex-center text-[30px] ">
      {" "}
      <Sidemenu />
      <div className="flex flex-col">
        <div className="w-[1100px] h-auto bg-white-100 py-6 mx-8 px-[13px] rounded-[12px]">
          <RecruitmentStep />
          <div className="px-10 py-[30px]">
            <div className="flex gap-11">
              <section className="w-min">
                <div className="flex">
                  <div className="w-full flex justify-between mb-4">
                    <p className="text-headline  text-left">운영진</p>
                    <button
                      onClick={handleAddAdminOpenModal}
                      className="flex-center h-min py-[9px] px-[18px] text-caption2 bg-gray-500 hover:bg-gray-600 text-white-100 rounded-[10px]"
                    >
                      <img
                        src="/assets/ic-addWhite.svg"
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

        <section className="w-[1100px] bg-gray-400 text-headline flex items-center justify-between mx-8 mt-[14px] py-[15px] px-[30px] rounded-[12px]">
          <p className="mt-7 text-headline text-gray-800 mb-[30px] text-left">
            아직 리크루팅을 시작하지 않았어요. 리크루팅을 시작해 주세요!
          </p>
          <button
            onClick={handleRecrutingOpenModal}
            className="py-[13px] px-[25px] bg-gray-900 text-gray-400 hover:text-white-100 rounded-[10px]"
          >
            리크루팅 시작하기
          </button>
        </section>
        {isRecrutingModalOpen && (
          <RecrutingStartModal onClose={handleRecrutingCloseModal} />
        )}
      </div>
    </div>
  );
}
