import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import TrendingCard from "./TrendingCard";
function Trending({ contents }) {
  return (
    <>
      <h2 className=" background-dark-blue text-white">Trending</h2>
      <Swiper
        slidesPerView={1.5}
        spaceBetween={10}
        speed={100}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        pagination={{
          clickable: true,
        }}
        className="mySwiper background-dark-blue"
      >
        {contents.map((slide) => {
          if (slide.isTrending) {
            return (
              <SwiperSlide key={slide.contentsId}>
               <img
                src={"src" + slide.thumbnail.trending.small.slice(1)}
                alt="Film in trend"
                className="rounded-lg"
                />
                <div className="relative bottom-20 left-7"> 
                <TrendingCard slide={slide}/>
                </div>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </>
  );
}
export default Trending;
