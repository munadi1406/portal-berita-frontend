import { useState, useContext } from 'react'
import FunctionContext from '../FunctionContext'




const TableUsers = () => {
    const { dataUsers,handleDeleteUsers,updateRoleUser } = useContext(FunctionContext)
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = dataUsers.filter((item) =>
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleSelect = async (id,e)=>{
        await updateRoleUser(id,e.target.value)
    }

    const handleDelete = async (id,e) =>{
        e.target.innerHTML = "Loading..."
        await handleDeleteUsers(id)
        e.target.innerHTML = "Hapus"
    }

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
                            <td><select className='select select-info text-info bg-base-200 w-full' onChange={(e)=>handleSelect(item.id,e)} defaultValue={item.role} >
                                <option value="admin" >Admin</option>
                                <option value="publisher" >Publisher</option>
                            </select></td>
                            <td>
                                <div className='flex justify-center items-center w-full space-y-1'>
                                    <button className="btn btn-primary text-white w-full" onClick={(e)=>handleDelete(item.id,e)}>Hapus</button>
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