import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import formatDateTime from "./../utils/formatDateTime";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect,useState } from "react";
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
    <>
      <div className="card h-96 image-full shadow-md">
        <figure>
          <LazyLoadImage
            src={image}
            alt={title}
            className="object-cover h-full min-w-full"
            effect="blur"
          />
        </figure>
        <div className="card-body grid grid-cols-1">
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
              className="btn btn-primary w-full text-sm"
            >
              Baca Selengkapnya Lur{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  prolog: PropTypes.string,
  kategori: PropTypes.string,
  image: PropTypes.any,
  createdAt: PropTypes.string,
};
