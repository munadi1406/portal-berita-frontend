import { useContext } from "react"
import FunctionContext from './FunctionContext'
import { useState } from "react";

const TableStatistik = () => {

    const {dataById} = useContext(FunctionContext)
    const [searchTerm, setSearchTerm] = useState('');


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
        className="m-2 input input-bordered input-info"
    />
    <table className="table table-zebra table-pin-rows">
        <thead >
            <tr className=''>
                <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Title</th>
                <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Jumlah View</th>
            </tr>
        </thead>
        <tbody>
            {filteredData.map((e,i) => (
                <tr key={i} className='hover'>
                    <td>{e.title}</td>
                    <td>{e.jumlah_view}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
  )
}

export default TableStatistik