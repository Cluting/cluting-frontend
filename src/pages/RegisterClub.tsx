import RegisterClubContainer from "../components/common/RegisterClubContainer";

export default function RegisterClub() {
  return (
    <div className="w-full h-full flex flex-col items-center bg-gray-100 ">
      <h1 className="text-title1 text-gray-900 mt-[50px] mb-[30px]">
        동아리 등록
      </h1>
      <RegisterClubContainer />
    </div>
  );
}
