import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react';
import Loader from '../utils/loader';
import { Link } from 'react-router-dom';
import formatDateTime from '../utils/formatDateTime';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './assets/swipperStyle.css'


import { Autoplay, Pagination, Navigation } from 'swiper';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Carousel = ({ data }) => {
    const [dataCarousel, setDataCarousel] = useState([])
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const [loader, setLoader] = useState(true)
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    useEffect(() => {
        setDataCarousel(data)
        if(dataCarousel){
            setLoader(false)
        }
    }, [data])
    return (
        <>
            {loader ? <Loader /> : (
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    className="mySwiper h-[350px]"
                >
                    {dataCarousel.map((e,i) => (
                        <SwiperSlide key={i} className='flex justify-center items-center flex-col-reverse'>
                            <div className='absolute top-0 left-0 w-full h-full p-2  flex justify-end items-start flex-col gap-3 z-10'>
                                <h1 className='text-white font-bold text-3xl text-left'>{e.title}</h1>
                                <div className='flex justify-start items-start  w-full'>
                                    <div className='bg-blue-600 text-white rounded-full text-xs p-1'>{e.kategori}</div>
                                    <div className='text-xs text-white p-1 font-bold'>{formatDateTime(e.createdAt)}</div>
                                </div>
                                <Link to={`/article/${e.title.toLowerCase().replace(/\s/g, '-')}`} className='btn btn-accent'>Baca Sekarang</Link>
                            </div>
                            <img src={e.image} alt={e.title} className='bg-cover' loading='lazy'/>
                            {/* bg grident  */}
                            <div className='absolute top-0 left-0 bg-black/30 w-full h-full z-0'></div>
                        </SwiperSlide>
                    ))}
                    <div className="autoplay-progress text-white " slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle} className='' >
                            <circle cx="24" cy="24" r="20" stroke='white' ></circle>
                        </svg>
                        <span ref={progressContent}></span>
                    </div>
                </Swiper>
            )}
        </>
    )
}

Carousel.propTypes = {
    data: PropTypes.array
}

export default Carousel

