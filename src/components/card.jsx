import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import formatDateTime from "./../utils/formatDateTime";
import {  LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect, useState } from "react";
import randomBg from "../utils/randomBg";
import pisahKategori from "../utils/pisahKategori";
import TextComponent from './TextComponent';

export default function Card({ title, prolog, kategori, image, createdAt }) {
  const maxLengthTitle = 40; // Panjang maksimum konten yang ingin ditampilkan
  const formattedTitle = title.toLowerCase().replace(/\s/g, "-");
  const truncatedTitle =
    title.length > maxLengthTitle
      ? title.slice(0, maxLengthTitle) + "..."
      : title;

  const [kategoriPart, setKategoriPart] = useState([]);

  useEffect(() => {
    setKategoriPart(pisahKategori(kategori));
  }, []);

  return (
    <div className="p-2 rounded-md flex flex-col space-y-1 justify-between hover:relative hover:z-10 hover:scale-105 bg-base-200 transition-all ease-in-out duration-200">
      <div className=" max-h-max flex justify-center items-center">
        <LazyLoadImage
          src={image}
          className="object-cover h-48 w-96 rounded-md"
          effect="blur"
        />
      </div>
      <h2 className="text-md text-info font-semibold" title={title}>
        {truncatedTitle}
      </h2>
      <div className="w-full flex h-max space-x-1 flex-wrap">
        {kategoriPart.map((e, i) => (
          <div
            className={`text-[10px] max-w-max text-white ${randomBg()} p-1 pl-2 pr-2 font-bold rounded-full`}
            key={i}
          >
            {e}
          </div>
        ))}
      </div>
      <div>
        <div className="text-[10px] font-bold text-left w-full">
          {formatDateTime(createdAt)}
        </div>
        <div className="text-sm text-slate-600 font-medium" title={prolog}>
          <TextComponent fullText={prolog}/>
        </div>
      </div>
      <div className="">
        <Link
          to={`/article/${formattedTitle}`}
          className="btn btn-accent rounded-xl whitespace-nowrap text-base-100 text-xs w-full"
        >
          Baca Selengkapnya Lur{" "}
        </Link>
      </div>
    </div>





  );
}

Card.propTypes = {
  title: PropTypes.string,
  prolog: PropTypes.string,
  kategori: PropTypes.string,
  image: PropTypes.any,
  createdAt: PropTypes.string,
};
