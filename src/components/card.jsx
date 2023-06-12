import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import formatDateTime from "./../utils/formatDateTime";

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

  return (
    <>
      <div className="card h-96 image-full shadow-md">
        <figure>
          <img
            src={image}
            alt={title}
            className="object-cover h-full w-full"
            width={100}
            loading="lazy"
          />
        </figure>
        <div className="card-body grid grid-cols-1">
          <h2 className="card-title " title={title}>
            {truncatedTitle}
          </h2>
          <div className="text-xs font-bold text-left">
            {formatDateTime(createdAt)}
          </div>
          <div>
            <div className="text-xs bg-primary max-w-max p-1 pl-2 pr-2 font-bold rounded-full">
              {kategori}
            </div>
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
