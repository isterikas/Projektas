import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useState } from "react";
import PlayIcon from "../assets/icons/icon-play.svg";
import TrendingCard from "./TrendingCard";
function Trending({
  contents,
  width,
  update,
  setUpdate,
  userBookmarks,
  loggedIn,
}) {
  

  return (
    <>
      <h2 className=" text-white heading-l">Trending</h2>
      <Swiper
        slidesPerView={1.5}
        spaceBetween={40}
        breakpoints={{
          1024: {
            slidesPerView: 2.5,
          },
        }}
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
                <div className="relative left-5  rounded-lg">
                  <div>
                    <div>
                      <div>
                        {width >= 768 ? (
                          <img
                            src={
                              "src" + slide.thumbnail.trending.large.slice(1)
                            }
                            alt="Film in trend"
                            className="rounded-lg"
                          />
                        ) : (
                          <img
                            src={
                              "src" + slide.thumbnail.trending.small.slice(1)
                            }
                            alt="Film in trend"
                            className="rounded-lg"
                          />
                        )}
                      </div>
                      <div className="absolute inset-0 hover:bg-black hover:bg-opacity-50 hover:cursor-pointer opacity-0 hover:opacity-100 text-white place-content-center heading-xs">
                        <p className="flex justify-center">
                          <div className="rounded-[100px] bg-white bg-opacity-25 flex gap-[19px] p-3">
                            <img src={PlayIcon} alt="#" />
                            <p>Play</p>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <TrendingCard
                      slide={slide}
                      update={update}
                      setUpdate={setUpdate}
                      userBookmarks={userBookmarks}
                      loggedIn={loggedIn}
                    />
                  </div>
      
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
