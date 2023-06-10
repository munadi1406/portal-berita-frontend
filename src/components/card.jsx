import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Parser } from 'html-to-react'

export default function Card({ title, content, kategori,image }) {
  const formattedTitle = title.toLowerCase().replace(/\s/g, '-');
  const maxLength = 75; // Panjang maksimum konten yang ingin ditampilkan
  
  const truncatedContent = content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
  const maxLengthTitle = 40; // Panjang maksimum konten yang ingin ditampilkan

  const truncatedTitle = title.length > maxLengthTitle ? title.slice(0, maxLengthTitle) + '...' : title;
 
  return (
    <>
      <div className="card h-96 image-full shadow-md "> 
        <figure>
          <img
            src={image}
            alt={title}
            className="object-cover h-full w-full"
            width={100}
            loading='lazy'
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title ">{truncatedTitle}</h2>
          <div className="text-xs font-bold text-right">10 Juni 2023</div>
          <div className='text-xs bg-primary max-w-max p-1 pl-2 pr-2 font-bold rounded-full'>{kategori}</div>
          <p className=" max-h-full ">{Parser().parse(truncatedContent)}</p>
          <div className="card-actions justify-end">
            <Link to={`/article/${formattedTitle}`} className="btn btn-primary w-full text-sm">Baca Selengkapnya Lur </Link>
          </div>
        </div>
      </div>
    </>
  );
}


Card.propTypes = {
  title:PropTypes.string,
  content:PropTypes.string,
  kategori:PropTypes.string,
  image:PropTypes.any
}
