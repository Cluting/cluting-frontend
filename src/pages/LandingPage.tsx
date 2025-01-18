import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function LandingPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true }); // 요소가 화면에 나타났을 때만 트리거

  return (
    <div>
      <div className="flex-center w-full h-[745px] bg-[#F7F4FF]">
        <img
          src="/assets/landingQuestion1.svg"
          alt="문의 하이라이트1"
          className="w-[300px]"
        />
        <img
          src="/assets/landingQuestion2.svg"
          alt="문의 하이라이트1"
          className="w-[300px]"
        />
        <img
          src="/assets/landingQuestion3.svg"
          alt="문의 하이라이트1"
          className="w-[300px]"
        />
      </div>
      <div className="flex w-full h-[666px] bg-[#575C73]">
        <div className="">
          <div className="text-white-100 font-bold text-[33px] text-left ">
            <p>미리 저장한 기본 프로필과</p>
            <p>포트폴리오로 편하게 지원하세요!</p>
          </div>
          <div className="text-[#CACFEA] font-text-[18px] text-left">
            <p>이름, 학교, 학과 등 동아리마다 반복되는 기본 질문들...</p>
            <p>매번 첨부해야하는 포트폴리오들..</p>
            <p>번거롭지 않으셨나요!</p>

            <p>반복되는 질문들과 제출 서류들을</p>
            <p>한번의 저장으로 끝내세요! </p>
          </div>
        </div>
        <img src="/assets/landingImg2.svg" className="w-[670px]" />
      </div>
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
          <div className="mb-[63px] text-white-100 text-[17px] text-left font-thin">
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
      <div className="w-full h-[1372px] bg-[#464957]">
        <img src="/assets/landingLast.svg" />
      </div>
      <div
        style={{
          background: "linear-gradient(to bottom, #5219EF 32%, #7E50FB 100%)"
        }}
        className="relative flex flex-col items-center top-[-2px] w-full h-[766.29px] pt-[158px] font-bold text-[56px] text-white-100"
      >
        <p>대학 동아리 리크루팅 </p>
        <p> 통합 관리 솔루션 </p>
        {/* 별 이미지에 Framer Motion 적용 */}
        <motion.img
          src="/assets/landing/star.svg"
          alt="별"
          className="absolute top-30"
          initial={{ y: -10 }} // 초기 위치
          animate={{ y: [0, -20, 0] }} // 요요처럼 떠다니는 효과
          transition={{
            duration: 2, // 애니메이션 지속 시간
            repeat: Infinity, // 무한 반복
            repeatType: "loop" // 반복 방식
          }}
        />
        <img
          src="/assets/landing/landing-logo.svg"
          alt="로고"
          className="mt-[43px]"
        />
        <img
          src="/assets/landing/section1-img.svg"
          alt="섹션 1 이미지"
          className="z-[999] absolute bottom-[-150px]"
        />
        <img
          src="/assets/landing/section1-bottom.svg"
          alt="하단 물결"
          className="absolute bottom-[-2px] w-full"
        />
      </div>
      <div
        ref={sectionRef}
        className="bg-[#1C1A31] relative flex flex-col items-center top-[-2px] w-full h-[1800px] pt-[158px] font-bold text-[30px] text-white-100"
      >
        <motion.p
          className="mt-[382px]"
          initial={{ opacity: 0, y: 50 }} // 아래에서 위로 이동
          animate={{ opacity: 1, y: 0 }} // 최종 위치
          transition={{ duration: 0.8, delay: 0.2 }} // 지속 시간과 지연 시간
        >
          이번 동아리 리크루팅,
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          또 어떻게 처리할지 고민이라면
        </motion.p>
        <motion.p
          className="mt-[382px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          어떤 동아리가 최고의 선택일지
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          망설여진다면
        </motion.p>
      </div>
      <div
        ref={sectionRef}
        style={{
          background: "linear-gradient(to bottom, #1C1A31 0%, #7649EE 100%)"
        }}
        className="relative flex flex-col items-center justify-center top-[-2px] w-full h-full pt-[158px] font-bold text-[36px] text-white-100"
      >
        <div className="flex-center gap-[105px]">
          {/* 첫 번째 아이템 */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/assets/landing/section2-img1.svg"
              alt="시간 단축 이미지"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              시간 단축
            </motion.p>
          </motion.div>

          {/* 두 번째 아이템 */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <img
              src="/assets/landing/section2-img2.svg"
              alt="운영진 소통 효율화 이미지"
              className="mt-[65px]"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-[70px]"
            >
              운영진 소통 효율화
            </motion.p>
          </motion.div>

          {/* 세 번째 아이템 */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <img
              src="/assets/landing/section2-img1.svg"
              alt="정확한 정보 이미지"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              동아리의 정확한 정보
            </motion.p>
          </motion.div>
        </div>
        <Link to="/main">
          <button className=" py-[14px] px-[50px]  mt-[300px] mb-[140px] button-main-bg hover:bg-main-500 text-title1 rounded-[7px]">
            클루팅 바로가기
          </button>
        </Link>
      </div>
    </div>
  );
}
