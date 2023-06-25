import PropTypes from "prop-types";
import { useState } from "react";

const TableStatistik = ({ dataById }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = dataById.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="m-2 input input-bordered input-info bg-base-200"
      />
      <table className="table table-zebra table-pin-rows">
        <thead>
          <tr className="">
            <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">
              Title
            </th>
            <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">
              Jumlah View
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((e, i) => (
            <tr key={i} className="hover">
              <td>{e.title}</td>
              <td className="text-center">{e.jumlah_view}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TableStatistik.propTypes = {
  dataById: PropTypes.array,
};

export default TableStatistik;
