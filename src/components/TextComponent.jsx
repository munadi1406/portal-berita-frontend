import PropTypes from 'prop-types'
import { useState } from 'react';
import { convert } from 'html-to-text';

const TextComponent = ({ fullText }) => {
    const [isFullTextShown, setIsFullTextShown] = useState(false);
  
    const toggleFullText = () => {
      setIsFullTextShown(!isFullTextShown);
    };
  
    const convertAndDeleteNewLine = () => {
      const convertToString = convert(fullText);
      const deleteNewBreak = convertToString.replace(/\n/g, '');
      return deleteNewBreak;
    };
  
    const truncatedText = convertAndDeleteNewLine().slice(0, 100);
  
    return (
      <div>
        {isFullTextShown ? (
          <div>
            {convertAndDeleteNewLine()}
            <button onClick={toggleFullText} className="link text-info">
              Tutup
            </button>
          </div>
        ) : (
          <div className='flex flex-col justify-start items-start'>
            <div>{truncatedText}</div>
            {convertAndDeleteNewLine().length > 100 && (
              <button onClick={toggleFullText} className="link text-info">
                Baca Selengkapnya
              </button>
            )}
          </div>
        )}
      </div>
    );
  };
  
  


TextComponent.propTypes ={
    fullText:PropTypes.any
}
export default TextComponent
