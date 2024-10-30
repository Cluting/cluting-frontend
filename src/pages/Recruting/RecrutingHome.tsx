//리크루팅 홈

import Sidemenu from "../../components/recruting/home/Sidemenu";
import TodoTemplate from "../../components/recruting/home/TodoTemplate";

export default function RecrutingHome() {
  return (
    <div className="flex-center text-[30px] ">
      {" "}
      <Sidemenu />
      <div className="flex flex-col">
        <div className="w-[1000px] h-auto bg-white-100 py-6 mx-8 px-[13px] rounded-[12px]">
          <section className="w-min">
            <p className="text-headline mb-[30px] text-left">개인 TODO</p>
            <TodoTemplate />
          </section>
        </div>
        <section className="w-[1000px] bg-gray-400 text-headline flex items-center justify-between mx-8 mt-[14px] py-[15px] px-[30px] rounded-[12px]">
          <p className="mt-7 text-headline text-gray-800 mb-[30px] text-left">
            아직 리크루팅을 시작하지 않았어요. 리크루팅을 시작해 주세요!
          </p>
          <button className="py-[13px] px-[25px] bg-gray-900 text-gray-400 hover:text-gray-500 rounded-[10px]">
            리크루팅 시작하기
          </button>
        </section>
      </div>
    </div>
  );
}
