import { useState } from "react";

import { useEffect, Suspense, lazy } from "react";
import { useRef } from "react";
import Loader from "../../utils/loader";


const  Post = lazy(()=>import('./Post'));

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const handleAddArtikel = () => {
    setShowModal(true);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h1>Data Article</h1>
      <button
        className="btn btn-success text-white"
        onClick={() => handleAddArtikel()}
      >
        Add Artikel
      </button>
      {showModal && (
        <Suspense fallback={<Loader/>}>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div
              className="bg-white p-8 rounded-lg max-h-[600px] overflow-auto "
              ref={modalRef}
            >
              <span
                className="absolute top-4 right-4 text-gray-400 cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                &times;
              </span>
              <Post />
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default Index;
