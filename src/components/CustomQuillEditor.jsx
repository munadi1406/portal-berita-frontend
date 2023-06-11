import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomQuillEditor = () => {
  const [text, setText] = useState('');
  const [customClass, setCustomClass] = useState('');

  const reactQuillRef = useRef(null);

  useEffect(() => {
    if (reactQuillRef.current) {
      const editor = reactQuillRef.current.editor;

      const toolbar = editor.getModule('toolbar');
      toolbar.addHandler('bold', () => {
        editor.format('bold', true);
        editor.format('className', customClass); // Menambahkan className sesuai dengan customClass
      });
    }
  }, [customClass]);

  const handleChange = (value) => {
    setText(value);
  };

  useEffect(()=>{
    // console.log(text)
  },[text])

  const handleClassChange = (event) => {
    setCustomClass(event.target.value); // Memperbarui nilai customClass sesuai dengan input pengguna
  };

  return (
    <div>
      <input type="text" value={customClass} onChange={handleClassChange} placeholder="Masukkan className" />
      <ReactQuill
        ref={reactQuillRef}
        value={text}
        onChange={handleChange}
        modules={{
          toolbar: [
            ['bold'],
          ],
        }}
      />
    </div>
  );
};

export default CustomQuillEditor;
