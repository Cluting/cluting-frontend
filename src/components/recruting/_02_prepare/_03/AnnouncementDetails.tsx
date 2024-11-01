//2-3 공고 작성

export default function AnnouncementDetails() {
  return (
    <form className="flex flex-col bg-white-100 py-6 mx-8 mb-9 px-10 rounded-[12px] w-full text-left">
      <label className="mt-6">포스터 업로드</label>
      <input type="file" className="input-background input-style" />

      <label className="mt-6">공고 제목</label>
      <input type="text" className="input-background input-style" />

      <label className="mt-6">모집 기간</label>
      <input type="date" className="input-background input-style" />

      <label className="mt-6">서류 합격자 발표일</label>
      <input type="date" className="input-background input-style" />

      <label className="mt-6">모집 인원</label>
      <input type="number" className="input-background input-style" />

      <label className="mt-6">활동 기간</label>
      <input type="date" className="input-background input-style" />

      <label className="mt-6">활동 요일 및 시간</label>
      <input type="date" className="input-background input-style" />

      <label className="mt-6">동아리 회비</label>
      <input type="text" className="input-background input-style mb-12" />
    </form>
  );
}
