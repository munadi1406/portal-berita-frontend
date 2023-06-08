const collapse = ({title,content}) => {
    const maxLength = 150; // Panjang maksimum konten yang ingin ditampilkan

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
        </div>
      </div>
    </>
  );
};

export default collapse;
