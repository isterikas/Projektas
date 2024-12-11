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
  const [checked, setChecked] = useState(false);

  const setStateChecked = async (contentsId) => {
    const thisBookmark = await userBookmarks.find(
      (bookmark) =>
        bookmark.userId == loggedIn && bookmark.contentsId == contentsId
    );
    if (thisBookmark) setChecked(true);
  };

  const toggleBookmark = (contentsId) => {
    setUpdate(update + 1);
    const thisBookmark = userBookmarks.find(
      (bookmark) =>
        bookmark.userId == loggedIn && bookmark.contentsId == contentsId
    );
    if (thisBookmark) {
      deleteBookmark(thisBookmark.id);
      setChecked(false);
    } else {
      setChecked(true);
      postData({ contentsId: contentsId, userId: loggedIn }, "userBookmarks");
    }
  };

  return (
    <>
      <h2 className=" background-dark-blue text-white heading-l">Trending</h2>
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
            setStateChecked(slide.contentsId);
            return (
              <SwiperSlide key={slide.contentsId} className="">
                <div className="absolute bottom-4 left-16">
                  <TrendingCard
                    slide={slide}
                    update={update}
                    setUpdate={setUpdate}
                    userBookmarks={userBookmarks}
                    loggedIn={loggedIn}
                  />
                </div>
                <div className="relative">
                  {loggedIn ? (
                    <button
                      onClick={() => toggleBookmark(slide.contentsId)}
                      className="text-white z-50 absolute right-0 top-0 w-6 h-6 bookmark-icon"
                    >
                      <img
                        src={
                          checked
                            ? "../assets/icons/icon-bookmark-full.svg"
                            : "../assets/icons/icon-bookmark-empty.svg"
                        }
                        alt=""
                      />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {width >= 1024 ? (
                    <img
                      src={"src" + slide.thumbnail.trending.large.slice(1)}
                      alt="Film in trend"
                    />
                  ) : (
                    <img
                      src={"src" + slide.thumbnail.trending.small.slice(1)}
                      alt="Film in trend"
                    />
                  )}
                </div>
                <div
                  className="absolute inset-0 hover:bg-black hover:bg-opacity-50 hover:cursor-pointer opacity-0 hover:opacity-100 text-white place-content-center heading-xs
                "
                >
                  <div className="flex justify-center">
                    <div className="rounded-[100px] bg-white bg-opacity-25 flex gap-[19px] p-3">
                      <img src={PlayIcon} alt="#" />
                      <p>Play</p>
                    </div>
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
