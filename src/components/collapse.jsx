import { Link } from "react-router-dom";

const collapse = ({ title }) => {
  const formattedTitle = title.toLowerCase().replace(/\s/g, "-");
  return (
    <>
      {/* <div className="collapse bg-base-200">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
          {title}
        </div>
        <div className="collapse-content bg-primary text-primary-content [input:checked~&]:bg-secondary [input:checked~&]:text-secondary-content">
          <p>{truncatedContent}</p>
          <Link to={`/article/${formattedTitle}`} className="link-primary">
            Baca Sekarang
          </Link>
        </div>
      </div> */}
      <div className="collapse collapse-plus bg-info text-white">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-md font-medium">{title}</div>
        <div className="collapse-content">
          <Link to={`/article/${formattedTitle}`} className="text-white underline">
            Baca Sekarang
          </Link>
        </div>
      </div>
    </>
  );
};

export default collapse;
