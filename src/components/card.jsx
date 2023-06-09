import PropTypes from 'prop-types'

export default function Card({ title, content, kategori }) {
  const maxLength = 75; // Panjang maksimum konten yang ingin ditampilkan

  const truncatedContent = content.length > maxLength ? content.slice(0, maxLength) + '...' : content;

  return (
    <>
      <div className="card h-96 image-full shadow-md"> 
        <figure>
          <img
            src="https://i.pinimg.com/564x/f2/fa/5e/f2fa5e888373b70bce905f9430c54c78.jpg"
            alt="Shoes"
            className="w-full self-center"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <div className="text-xs font-bold text-right">10 Juni 2023</div>
          <div className='text-xs bg-primary max-w-max p-1 pl-2 pr-2 font-bold rounded-full'>{kategori}</div>
          <p className=" max-h-full">{truncatedContent}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary w-full text-sm">Baca Selengkapnya Lur </button>
          </div>
        </div>
      </div>
    </>
  );
}


Card.propTypes = {
  title:PropTypes.string,
  content:PropTypes.string,
  kategori:PropTypes.string
}
