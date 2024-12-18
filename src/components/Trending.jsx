import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import PlayIcon from "../assets/icons/icon-play.svg";
import TrendingCard from "./TrendingCard";
function Trending({
  contents,
  width,
  update,
  setUpdate,
  loggedIn,
  userBookmarks,
}) {
  return (
    <>
      <h2 className=" content-heading text-white mb-3">Trending</h2>
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
          const isBookmarked = userBookmarks.find(
            (bookmark) =>
              bookmark.contentsId == slide.contentsId &&
              bookmark.userId == loggedIn
          );
          if (slide.isTrending) {
            return (
              <SwiperSlide key={slide.contentsId}>
                <div className="relative left-7 rounded-lg">
                  <div>
                    {width >= 768 ? (
                      <img
                        src={"src" + slide.thumbnail.trending.large.slice(1)}
                        alt="Trending piece of content"
                        className="rounded-lg"
                      />
                    ) : (
                      <img
                        src={"src" + slide.thumbnail.trending.small.slice(1)}
                        alt="Trending piece of content"
                        className="rounded-lg"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 hover:bg-black hover:bg-opacity-50 hover:cursor-pointer opacity-0 hover:opacity-100 text-white place-content-center heading-xs hover:rounded-[8px]">
                    <div className="flex justify-center">
                      <div className="rounded-[100px] bg-white bg-opacity-25 flex gap-[19px] p-3">
                        <img src={PlayIcon} alt="Play icon" />
                        <p>Play</p>
                      </div>
                    </div>
                  </div>

                  <TrendingCard
                    slide={slide}
                    update={update}
                    setUpdate={setUpdate}
                    loggedIn={loggedIn}
                    isBookmarked={isBookmarked}
                  />
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
