import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  // 페이지 로드 시 가장 위로 스크롤 이동
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const [selectAdminView, setSelectAdminView] = useState<boolean>(true);
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity
    }
  };

  return (
    <div className="m-0 font-Line">
      <section className="relative">
        <div className="absolute top-[250px] left-[211px] text-white-100 text-left">
          <motion.p
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="text-[50px] font-bold mb-6 font-Line"
          >
            대학생 동아리 리크루팅 <br />
            통합 관리 솔루션 <br />
            클루팅 입니다.
          </motion.p>
          <motion.p
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="text-[22px] font-normal"
          >
            동아리 리크루팅에 필요한 모든 것, <br />
            국내 최초의 동아리 리크루팅 플랫폼, 클루팅 !
          </motion.p>
        </div>
        <motion.img
          src="/assets/landing/bubble-01.png"
          className="absolute w-[380px] top-[200px] left-[900px]"
          animate={floatAnimation}
        />
        <motion.img
          src="/assets/landing/bubble-02.png"
          className="absolute w-[300px] top-[240px] left-[1500px]"
          animate={floatAnimation}
        />
        <img src="/assets/landing/frame01.png" />
      </section>

      <section className="bg-white-100 h-[600px]  px-[211px]">
        <div className="mt-[124px] flex-col items-center">
          <h1 className="text-bold text-[37px] text-[#555063] mb-[96px]">
            클루팅(Cluting) 소개
          </h1>

          <div className="flex justify-center gap-[80px]">
            <div className="flex justify-center text-left gap-25 text-[#696575]">
              <div>
                <h2 className="text-[30px] text-[#555063] mb-[17px]">
                  클루팅이란?
                </h2>
                <p className="text-caption2">
                  클루팅은 대학 동아리 모집과 지원 과정을 한곳에서 관리할 수
                  있는
                  <br />
                  통합 관리 플랫폼입니다. 동아리 운영진에게는 효율적이고
                  체계적인
                  <br />
                  모집 도구를 제공하고, 지원자에게는 간편하고 빠른 지원 경험을
                  <br />
                  선사합니다. 모집부터 지원까지, 클루팅이 대학 동아리 리크루팅의
                  <br />
                  모든 과정을 혁신합니다.
                </p>
              </div>
            </div>

            <div className="flex justify-center text-left gap-25 text-[#696575]">
              <div>
                <h2 className="text-[30px] text-[#555063] mb-[17px]">
                  클루팅은 어떻게 사용하나요?
                </h2>
                <p className="text-caption2 mb-[20px]">
                  클루팅은 동아리 지원자 입장, 동아리 운영진 입장으로 2가지 사용
                  형태 <br />가 있습니다. 지원자는 동아리 공고를 확인하고 지원할
                  수 있으며 <br /> 운영진은 리크루팅 틀을 따라서 리크루팅을
                  효과적으로 운영할 수 있습 <br />
                  니다. 운영진은 이용권 구매를 통해 이용할 수 있으니 아래 버튼을
                  통해 <br />
                  이용권 정보를 확인해 보세요.
                </p>
                <Link to="/" className=" text-main-500 font-bold text-[13px] ">
                  클루팅 이용권 안내 자세히 보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex flex-col text-left w-full h-[774px] bg-[#E9E1FD] px-[211px]">
        <div className="bg-[#E2DEED] w-fit h-[71px] rounded-[46.08px] p-[9px] relative text-[21.68px] left-60 mt-[37px]">
          <motion.div
            className="absolute top-[9px] w-[50%] h-[53px] bg-[#784FEF] rounded-[46.08px]"
            animate={{
              x: selectAdminView ? 0 : "100%",
              backgroundColor: selectAdminView ? "#784FEF" : "#1AB786"
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <button
            onClick={() => setSelectAdminView(true)}
            className={`relative z-10 py-[15px] px-[169px] rounded-[46.08px] transition-colors duration-300 ${
              selectAdminView ? "text-white-100" : "text-[#696575]"
            }`}
          >
            동아리 운영진
          </button>
          <button
            onClick={() => setSelectAdminView(false)}
            className={`relative z-10 py-[15px] px-[169px] rounded-[46.08px] transition-colors duration-300 ${
              !selectAdminView ? "text-white-100" : "text-[#696575]"
            }`}
          >
            동아리 지원자
          </button>
        </div>

        {!selectAdminView ? (
          <div>
            <div className="text-left pt-[197px] flex flex-col w-full">
              <h1 className="text-[45px] font-bold">
                2025년 꼭 붙고 싶은 동아리가 있다면
              </h1>
              <p className="font-regular text-[20.89px] text-[#696575] mt-[30px]">
                취미, 취업, 창업, 스포츠... 대학생활의 꽃, 동아리 경험을 놓치고
                싶지 않나요?
                <br /> 동아리 공고 열람, Q&A, 동아리 합격 정보를 한 눈에
                확인하고 지원해 보세요! <br /> 이전 기수 동아리 리크루팅 정보와
                후기로 지원 여부를 결정해 보세요.
              </p>
              <Link to="/">
                <button className="flex-center mt-[30px] text-[#0F9C70] font-bold text-[16.37px] px-[50px] py-[10px] bg-[#D8ECE6] rounded-[44px]">
                  동아리 리스트 구경하기
                  <img
                    src="/assets/landing/ic-club-list.svg"
                    className="ml-[4px]"
                  />
                </button>
              </Link>
            </div>
            <motion.img
              src="/assets/landing/applicant-card.png"
              className="absolute w-[984px] bottom-[-20px] right-[140px]"
              animate={floatAnimation}
            />
          </div>
        ) : (
          <div>
            <div className="text-left pt-[197px] flex flex-col w-full">
              <h1 className="text-[45px] font-bold">
                이번 동아리 리크루팅, <br />또 어떻게 처리할지 고민이라면
              </h1>
              <p className="font-regular text-[20.89px] text-[#696575] mt-[30px]">
                매년 반복되는 동아리 리크루팅에서 새로운 운영진에 대한 인수인계,
                <br />
                처음 해보는 면접 진행... 복잡하고, 비효율적으로 느끼셨나요?
                <br />
                <br />
                동아리 운영진의 시간 단축을 위해 클루팅을 이용해 보세요.
              </p>
              <Link to="/">
                <button className="flex-center mt-[30px] text-[#5C2ADE] font-bold text-[16.37px] px-[50px] py-[10px] bg-[#DFD3FF] rounded-[44px]">
                  동아리 생성하기
                </button>
              </Link>
            </div>
            <motion.img
              src="/assets/landing/section3-admin.png"
              className="absolute w-[487px] bottom-[-20px] right-[140px]"
              animate={floatAnimation}
            />
          </div>
        )}
      </section>

      <section className="relative flex text-left w-full h-[774px] bg-[#575C73] px-[211px]">
        <div className="text-left pt-[197px] flex flex-col ">
          <h1 className="text-[45px] font-bold text-white-100">
            동아리 지원 상황을 실시간으로 확인하세요.
          </h1>
          <p className="font-regular text-[20.89px] text-[#BFC5DC] mt-[30px]">
            내 지원서가 접수 되었나? <br /> 서류 평가가 완료 되었나? <br />
            <br /> 불안하고 알 수 없었던 나의 지원 상황을 바로바로 알 수 있어요.
          </p>
          <Link to="/">
            <button className="flex-center mt-[30px] text-[#0F9C70] font-bold text-[16.37px] px-[50px] py-[10px] bg-[#D8ECE6] rounded-[44px]">
              동아리 리스트 구경하기
              <img
                src="/assets/landing/ic-club-list.svg"
                className="ml-[4px]"
              />
            </button>
          </Link>
        </div>
        <motion.img
          src="/assets/landing/process-bubble.png"
          className="absolute w-[217px] bottom-[250px] right-[400px]"
          animate={floatAnimation}
        />
        <img
          src="/assets/landing/process.png"
          className="absolute w-[1087px] bottom-[72px] left-[210px]"
        />
      </section>

      <section className="pt-[140px] relative flex items-center text-left w-full h-[833px] bg-white-100 px-[211px] ">
        <div className="text-left flex flex-col ">
          <h1 className="text-[45px] font-bold text-[#464957]">
            동아리 운영진에게 궁금한 점을 <br />
            바로바로 해결해요.
          </h1>
          <p className="font-regular text-[20.89px] text-[#464957] mt-[30px]">
            하이라이트 형식으로 중요한 정보들을 편하게 확인하고 <br />
            운영진과의 1:1채팅으로 대화를 주고 받으며
            <br /> 궁금증을 해결하세요!
          </p>
        </div>

        <img
          src="/assets/landing/section5.png"
          className="w-[628px] h-[355px]"
        />
      </section>

      <section className="flex-center gap-4 w-full h-[745px] bg-[#F7F4FF]">
        <motion.img
          src="/assets/landingQuestion1.svg"
          alt="문의 하이라이트1"
          className="w-[300px]"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.img
          src="/assets/landingQuestion2.svg"
          alt="문의 하이라이트2"
          className="w-[300px]"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.img
          src="/assets/landingQuestion3.svg"
          alt="문의 하이라이트3"
          className="w-[300px]"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </section>

      <section className="relative flex text-left w-full h-[774px] bg-[#575C73] px-[211px]">
        <div className="text-left pt-[197px] flex flex-col ">
          <h1 className="text-[45px] font-bold text-white-100">
            미리 저장한 기본 프로필과 <br />
            포트폴리오로 편하게 지원하세요!
          </h1>
          <p className="font-regular text-[20.89px] text-[#BFC5DC] mt-[30px]">
            이름, 학교, 학과 등 동아리마다 반복되는 기본 질문들..
            <br />
            매번 첨부해야하는 포트폴리오들..
            <br />
            번거롭지 않으셨나요!
            <br />
            <br />
            반복되는 질문들과 제출 서류들을
            <br />
            한번의 저장으로 끝내세요!
          </p>
        </div>
        <img
          src="/assets/landingImg2.svg"
          className="absolute bottom-0 right-[50px] w-[800px]"
        />
      </section>

      <div className="flex-center w-full h-[200px] bg-[#EDE9F7] ">
        <div className=" justify-center flex-col">
          <p className="flex-center text-[#4D4A61] text-[37px] font-bold">
            클루팅 이용 과정
          </p>
          <p className="text-[#696575] text-[16px]">
            상세한 활용 방법은 맨 하단의 ‘가이드 자세히 보기’를 확인해 주세요.
          </p>
        </div>
      </div>
      <div className="flex-center w-full h-[619px] bg-[#13B482]">
        <img src="/assets/이용과정.svg" className="w-[480px]" />
        <div className="items-end">
          <div className="mb-[33px] text-white-100 text-[17px] text-left font-thin">
            <p>
              동아리 모집 공고를 구경하고, 지원하고 싶은 동아리의 공고 세부
              사항을 확인하세요.
            </p>
            <p>
              접수 기간, 합격자 발표일, 활동 상세 내용 등, 지원자가 필요한
              정보는 다 있어요.
            </p>
          </div>
          <img src="/assets/컴퓨터.svg" className="w-[535px]" />
        </div>
      </div>
      <div className="w-full h-[800px] bg-[#464957] flex flex-col items-center pt-[348px]">
        <h1 className="text-[45px] font-bold text-white-100">
          클루팅에 대해 더 궁금하신가요?
        </h1>
        <div className="flex gap-4">
          <Link to="/">
            <button
              type="button"
              className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] button-main-light text-main-100
           text-body flex-center hover:bg-main-500 hover:text-white-100`}
            >
              클루팅 SNS 바로가기
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] bg-main-100 text-white-100
         text-body flex-center hover:bg-main-500`}
            >
              가이드 자세히 보기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
