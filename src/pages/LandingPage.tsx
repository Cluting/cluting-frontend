import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  // 페이지 로드 시 가장 위로 스크롤 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      <section className="bg-white-100 h-[6800px]">
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
    </div>
  );
}
