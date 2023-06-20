import { useState, useContext } from 'react'
import FunctionContext from './FunctionContext'




const TableUsers = () => {
    const { dataUsers,handleDeleteUsers } = useContext(FunctionContext)
    const [searchTerm, setSearchTerm] = useState('');

    console.log(dataUsers)

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = dataUsers.filter((item) =>
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Username</th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Email</th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Role</th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.id} className='hover'>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>
                                <div className='flex flex-wrap w-max space-y-1'>
                                    <button className='btn btn-info w-full'>Edit</button>
                                    <button className="btn btn-warning w-full" onClick={()=>handleDeleteUsers(item.id)}>Hapus</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableUsers