import { useEffect, useState } from "react";
import { artikelByTitle } from "../api/artikel";
import { PropTypes } from "prop-types";
import { useParams } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Loader from "../utils/loader";
import formatDateTime from "../utils/formatDateTime";
import pisahKategori from "../utils/pisahKategori";
import randomBg from "../utils/randomBg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { Parser } from "html-to-react";
import { useLocation } from "react-router-dom";

const ArtikelByTitle = () => {
  const { title } = useParams();
  const [dataArtikel, setDataArtikel] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const getArtikelData = async () => {
    setLoading(true);
    try {
      const data = await artikelByTitle(title);
      setDataArtikel(data.data.data);
      setLoading(false);
    } catch (error) {
      /* empty */
    }
  };

  useEffect(() => {
    getArtikelData();
  }, [location.pathname]);

  useEffect(() => {
    const componentContainer = document.getElementById("isi");
    const ol = componentContainer.querySelectorAll("ol");
    const ul = componentContainer.querySelectorAll("ul");
    const u = componentContainer.querySelectorAll("u");
    const a = componentContainer.querySelectorAll("a");
    const h1 = componentContainer.querySelectorAll("h1");
    const h2 = componentContainer.querySelectorAll("h2");
    const h3 = componentContainer.querySelectorAll("h3");

    ol.forEach((e) => {
      e.classList.add("list-decimal");
    });
    ul.forEach((e) => {
      e.classList.add("list-disc");
    });
    u.forEach((e) => {
      e.classList.add("underline-offset-1");
    });
    a.forEach((e) => {
      e.classList.add("text-blue-600");
    });
    h1.forEach((e) => {
      e.classList.add("text-2xl");
    });
    h2.forEach((e) => {
      e.classList.add("text-xl");
    });
    h3.forEach((e) => {
      e.classList.add("text-lg");
    });
  }, [dataArtikel]);

  return (
    <div id="isi">
      {loading ? (
        <Loader />
      ) : (
        dataArtikel.map((e) => (
          <HelmetProvider key={e.artikelId}>
            <Helmet>
              <title>{e.title}</title>
            </Helmet>
            <div key={e.artikelId} className="grid grid-cols-1 space-y-2 p-2">
              <div className="text-3xl font-bold">{e.title}</div>
              <div className="text-sm">{e.user.username}</div>
              <div className="grid grid-cols-2 w-full">
                <div className="flex space-x-1 flex-wrap">
                  {pisahKategori(e.kategori).map((e, i) => (
                    <div
                      className={`text-xs font-bold ${randomBg()} w-max pl-2 pr-2 flex justify-center items-center text-white rounded-full`}
                      key={i}
                    >
                      {e}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-right">
                  {formatDateTime(e.createdAt)}
                </div>
              </div>
              <div className="flex justify-center items-center">
              <LazyLoadImage src={e.image} alt={e.title} effect="blur"/>
              </div>
              <div className="p-2">{Parser().parse(e.content)}</div>
            </div>
          </HelmetProvider>
        ))
      )}
    </div>
  );
};

ArtikelByTitle.propTypes = {
  title: PropTypes.any,
};

export default ArtikelByTitle;
