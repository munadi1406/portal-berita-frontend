import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import formatDateTime from "./../utils/formatDateTime";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect, useState } from "react";
import randomBg from "../utils/randomBg";
import pisahKategori from "../utils/pisahKategori";

export default function Card({ title, prolog, kategori, image, createdAt }) {
  const maxLengthTitle = 40; // Panjang maksimum konten yang ingin ditampilkan
  const formattedTitle = title.toLowerCase().replace(/\s/g, "-");
  const truncatedTitle =
    title.length > maxLengthTitle
      ? title.slice(0, maxLengthTitle) + "..."
      : title;

  const maxLength = 75; // Panjang maksimum konten yang ingin ditampilkan
  const truncatedProlog =
    prolog.length > maxLength ? prolog.slice(0, maxLength) + "..." : prolog;

  const [kategoriPart, setKategoriPart] = useState([]);

  useEffect(() => {
    setKategoriPart(pisahKategori(kategori));
  }, []);

  return (
    <div className="relative  overflow-clip">
      <div className="card shadow-md overflow-clip text-white/75 w-full h-full relative">
          <LazyLoadImage
            src={image}
            alt={title}
            className="object-cover object-center absolute top-0 left-0 z-0"
            effect="blur"
          />
          {/* gradiend */}
          <div className="absolute w-full h-full top-0 left-0 bg-black/50 z-10">
          </div>
        <div className="card-body grid grid-cols-1 relative z-10">
          <h2 className="card-title " title={title}>
            {truncatedTitle}
          </h2>
          <div className="text-xs font-bold text-left">
            {formatDateTime(createdAt)}
          </div>
          <div className="w-full flex h-max space-x-1 flex-wrap">
            {kategoriPart.map((e, i) => (
              <div
                className={`text-xs max-w-max ${randomBg()} p-1 pl-2 pr-2 font-bold rounded-full`}
                key={i}
              >
                {e}
              </div>
            ))}
          </div>
          <div className=" max-h-full  overflow-hidden " title={prolog}>
            {truncatedProlog}
          </div>
          <div className="card-actions justify-end">
            <Link
              to={`/article/${formattedTitle}`}
              className="btn btn-accent w-full text-sm"
            >
              Baca Selengkapnya Lur{" "}
            </Link>
          </div>
        </div>
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
