import Chatting from "./components/Chatting";
import Highlight from "./components/Highlight";

export default function InqueryContainer() {
  return (
    <div className="w-full h-[1000px] bg-white-100 grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <Highlight />
      </div>
      <div className="col-span-1">
        <Chatting />
      </div>
    </div>
  );
}
