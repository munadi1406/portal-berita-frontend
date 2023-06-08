

export default function Card() {
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
            <h2 className="card-title">Berita 1</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam doloremque facere dolorum libero, officiis saepe perspiciatis nulla! Distinctio, quod voluptatum!</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Baca Ini Om</button>
            </div>
            <p className="text-xs font-bold text-right">10-juni-2023</p>
          </div>
        </div>
    </>
  )
}
