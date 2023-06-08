import PropTypes from 'prop-types'

export default function Card({ title, content, kategori }) {
  const maxLength = 150; // Panjang maksimum konten yang ingin ditampilkan

  const truncatedContent = content.length > maxLength ? content.slice(0, maxLength) + '...' : content;

  return (
    <>
      <div className="card bg-base-100 shadow-xl image-full max-h-60">
        <figure>
          <img
            src="https://i.pinimg.com/564x/f2/fa/5e/f2fa5e888373b70bce905f9430c54c78.jpg"
            alt="Shoes"
            className="w-full self-center"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className='badge badge-primary text-white badge-xs font-bold'>{kategori}</p>
          <p className="border max-h-full">{truncatedContent}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Baca Selengkapnya Lur </button>
          </div>
          <p className="text-xs font-bold text-right">10 Juni 2023</p>
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
