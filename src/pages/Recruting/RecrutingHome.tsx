//리크루팅 홈

import Sidemenu from "../../components/recruting/home/Sidemenu";
import TodoTemplate from "../../components/recruting/home/TodoTemplate";

export default function RecrutingHome() {
  return (
    <div className="flex-center text-[30px] ">
      {" "}
      <Sidemenu />
      <div className="w-[1000px] h-auto bg-white-100 py-6 mx-8 px-[13px] rounded-[12px]">
        <section className="w-min">
          <p className="text-headline mb-[30px] text-left">개인 TODO</p>
          <TodoTemplate />
        </section>
      </div>
    </div>
  );
}
