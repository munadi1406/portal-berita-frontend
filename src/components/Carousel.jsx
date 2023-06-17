import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import formatDateTime from "../utils/formatDateTime";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import pisahKategori from "../utils/pisahKategori";
import randomBg from "../utils/randomBg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./assets/swipperStyle.css";

import { Autoplay, Pagination, Navigation } from "swiper";
import { useEffect, useState, memo } from "react";

const Carousel = memo(function Carousel({ data }) {
  const [dataCarousel, setDataCarousel] = useState([]);

  useEffect(() => {
    setDataCarousel(data);
  }, [data]);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[350px]"
      >
        {dataCarousel.map((e, i) => (
          <SwiperSlide
            key={i}
            className="flex justify-center items-center flex-col-reverse"
          >
            <div className="absolute top-0 left-0 w-full h-full p-2  flex justify-end pb-10 items-start flex-col gap-3 z-10">
              <h1 className="text-white font-bold text-3xl text-left">
                {e.title}
              </h1>
              <div className="flex justify-start items-start space-x-1 w-full">
                {pisahKategori(e.kategori).map((e, i) => (
                  <div
                    className={`${randomBg()} text-white rounded-full text-xs p-1`}
                    key={i}
                  >
                    {e}
                  </div>
                ))}
                <div className="text-xs text-white p-1 font-bold">
                  {formatDateTime(e.createdAt)}
                </div>
              </div>
              <Link
                to={`/article/${e.title.toLowerCase().replace(/\s/g, "-")}`}
                className="btn btn-accent"
              >
                Baca Sekarang
              </Link>
            </div>
            <LazyLoadImage
              src={e.image}
              alt={e.title}
              className="bg-cover"
              effect="black-and-white"
            />
            {/* bg grident  */}
            <div className="absolute top-0 left-0 bg-black/30 w-full h-full z-0"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
});

Carousel.propTypes = {
  data: PropTypes.array,
};

export default Carousel;
