//리크루팅 홈

import Sidemenu from "../../components/recruting/home/Sidemenu";
import TodoTemplate from "../../components/recruting/home/TodoTemplate";

export default function RecrutingHome() {
  return (
    <div className="text-[30px] ">
      {" "}
      <Sidemenu />
      <TodoTemplate />
    </div>
  );
}
