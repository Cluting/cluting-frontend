import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LazyLoad.css";

function LazyLoad() {
  const settings = {
    dots: true, //개수 표시 점
    infinite: true,
    speed: 500, //다음 컨텐츠까지의 속도
    slidesToShow: 1, //화면에 보이는 컨텐츠의 수
    slidesToScroll: 1, //스크롤 시 넘어가는 컨텐츠 수
    initialSlide: 0, //첫 컨텐츠 번호
    autoplay: true, //자동 캐러셀
    autoplaySpeed: 3000, //자동 캐러셀 속도
    draggable: false //드래그
  };
  return (
    <div className="slider-container ">
      <Slider {...settings}>
        <div>
          <img src={"/assets/home/banner/bannerVer1.svg"} className="w-full" />
        </div>
        <div>
          <img src={"/assets/home/banner/bannerVer2.svg"} className="w-full" />
        </div>
      </Slider>
    </div>
  );
}

export default LazyLoad;
