import { useState, useContext } from "react";
import formatDateTime from "../../utils/formatDateTime";
import pisahKategori from "../../utils/pisahKategori";
import randomBg from "../../utils/randomBg";
import TextComponent from "../TextComponent";
import FunctionContext from "../FunctionContext";

const TableArtikell = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    deleteArtikelPost,
    dataArtikel,
    handleEdit,
    handleSetDataEdit,
    setMsg,
    loadingDelete
  } = useContext(FunctionContext);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = dataArtikel.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditTable = (e) => {
    handleEdit();
    handleSetDataEdit(e);
    setMsg("");
  };

  return (
    <>
      {filteredData >= 0 ? (
        <div className="w-full text-3xl font-sans text-center p-4">Anda Belum Memiliki Postingan</div>
        ) : (
      <div className="overflow-x-auto">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="m-2 input input-bordered input-info"
        />
        <table className="table table-zebra table-pin-rows">
          <thead>
            <tr className="">
              <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">
                Publisher
              </th>
              <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">
                Title
              </th>
              <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">
                Prolog
              </th>
              <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center ">
                Content
              </th>
              <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">
                Kategori
              </th>
              <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">
                Created At
              </th>
              <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">
                Updated At
              </th>
              <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">
                Image
              </th>
              <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.artikelId} className="hover">
                <td className="px-4 py-2">{item.user.username}</td>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">
                  <div className="w-[300px]">
                    <TextComponent fullText={item.prolog} />
                  </div>
                </td>
                <td className="px-4 py-2 lowercase ">
                  <div className="w-[400px]">
                    {<TextComponent fullText={item.content} />}
                  </div>
                </td>
                <td className="px-4 py-2 flex flex-wrap justify-center items-center">
                  {pisahKategori(item.kategori).map((e, i) => (
                    <div
                      key={i}
                      className={`badge text-base-200 font-semibold ${randomBg()}`}
                    >
                      {e}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2">{formatDateTime(item.createdAt)}</td>
                <td className="px-4 py-2">{formatDateTime(item.updatedAt)}</td>
                <td className="px-4 py-2">
                  <img src={item.image} alt={item.title} width={50} />
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-wrap w-max space-y-1">
                    <button
                      className="btn btn-info w-full text-base-200"
                      onClick={() => handleEditTable(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-primary w-full text-base-200"
                      onClick={(e) => deleteArtikelPost(item.artikelId, e)}
                      disabled={loadingDelete}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )};
    </>
  );
};

export default TableArtikell;
