import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import { url } from "./helpers/jsonURL.js";
function Trending() {
  const [error, setError] = useState("");
  const [carousel, setCarousel] = useState([]);
  console.log(error);

  const getAllData = async () => {
    const response = await axios.get(url("contents"));
    return response.data;
  }; //tailored getAllData function; will have to be deleted once fetch will be executed on the main page.

  const fetchData = async () => {
    try {
      const data = await getAllData();
      setCarousel(data);
    } catch (error) {
      setError(error.message);
    }
  }; //will have to be deleted and array of content should be passed through props, params or context.

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Swiper className="mySwiper">
        {carousel.map((id) => {
          if (id.isTrending) {
            return (
              <SwiperSlide key={id.title}>
                <img src={id.thumbnail.trending.small} alt="cf" />
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </>
  );
}
export default Trending;
