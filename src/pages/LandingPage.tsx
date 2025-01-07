import { motion } from "framer-motion";

export default function LandingPage() {
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

      <section className="bg-white-100 h-[6800px]"></section>
    </div>
  );
}
