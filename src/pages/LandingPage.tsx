import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function LandingPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true }); // 요소가 화면에 나타났을 때만 트리거

  return (
    <div>
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
        <Link to="/">
          <button className=" py-[14px] px-[50px]  mt-[300px] mb-[140px] button-main-bg hover:bg-main-500 text-title1 rounded-[7px]">
            클루팅 바로가기
          </button>
        </Link>
      </div>
    </div>
  );
}
