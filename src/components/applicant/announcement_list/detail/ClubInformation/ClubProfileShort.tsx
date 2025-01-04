interface ProfileProps {
  imgSrc: string;
  name: string;
}

const ClubProfileShort: React.FC<ProfileProps> = ({ imgSrc, name }) => {
  return (
    <div className="flex gap-2 px-5 py-[0.62rem] bg-[#e4e3fa] rounded-xl items-center">
      <div className="flex flex-center w-[3.375rem] h-[3.375rem] rounded-full bg-main-400">
        <img
          src={imgSrc}
          className="w-[2.625rem] h-[2.625rem] rounded-full "
          alt="동아리 이미지"
        />
      </div>
      <div className="text-lg font-semibold leading-5 tracking-tight font-Pretendard text-gray-1100">
        {name}
      </div>
    </div>
  );
};

export default ClubProfileShort;
