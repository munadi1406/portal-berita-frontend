import { Link } from "react-router-dom";

const collapse = ({title,content}) => {
    const maxLength = 150; // Panjang maksimum konten yang ingin ditampilkan
    const formattedTitle = title.toLowerCase().replace(/\s/g, "-");
  const truncatedContent = content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
  return (
    <>
      <div className="collapse bg-base-200">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
          {title}
        </div>
        <div className="collapse-content bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
          <p>{truncatedContent}</p>
        <Link to={`/article/${formattedTitle}`} className="link-primary">Baca Sekarang</Link>
        </div>
      </div>
    </>
  );
};

export default collapse;
