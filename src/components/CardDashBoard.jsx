export default function CardDashBoard({title,prolog,image}) {
  return (
    <div className="card glass">
      <figure>
        <img
          src={image}
          alt="car!"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-normal font-semibold">{title}</h2>
        <p>{prolog}</p>
        <div className="card-normal justify-end">
          <button className="btn btn-primary">Learn now!</button>
        </div>
      </div>
    </div>
  );
}
