import { useContext } from "react";
import FunctionContext from "./FunctionContext";

const TableLog = () => {
    const { dataLog, page, setPage, totalPage } = useContext(FunctionContext)

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra table-pin-rows">
                <thead >
                    <tr className=''>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">IP Address </th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Browser</th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Current Page</th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">City</th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Region</th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Country</th>
                    </tr>
                </thead>
                <tbody>
                    {dataLog.map((e, i) => (
                        <tr key={i} className='hover'>
                            <td>{e.ipAddress}</td>
                            <td>{e.browser}</td>
                            <td>{e.currentPage}</td>
                            <td>{e.city}</td>
                            <td>{e.region}</td>
                            <td>{e.country}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={6}>
                            <button className={`btn btn-info w-full text-base-100 ${page > totalPage ? 'hidden' : ''}`} onClick={() => setPage(page + 1)}>Load More</button>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default TableLog