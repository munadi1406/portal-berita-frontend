import { useEffect } from "react"
import PropTypes from 'prop-types'
import { getUsers,deleteUsers, updateRole, } from "../../api/users"
import HelmetTitle from '../../utils/HelmetTitle'
import TableUsers from "../../components/user/TableUsers"
import FunctionContext from "../../components/FunctionContext"
import { useState } from "react"
import Modal from "../../components/Modal"




const Users = ({ navbarTitle }) => {

    const [dataUsers,setDataUsers] = useState([])
    const [modal,setModal] = useState(false)
    const [msg,setMsg] = useState("")


    const getUsersData = async () => {
        try {
            const data = await getUsers()
            setDataUsers(data.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        navbarTitle("Users")
        getUsersData()
    }, [])

    const handleDeleteUsers = async (id)=>{
        try {
            const deleteUser = await deleteUsers(id)
            setMsg(deleteUser.data.message)
            setModal(true)
            getUsersData()
        } catch (error) {
            console.log(error)
        }
    }

    const closeModal  = ()=>{
        setModal(false)
    }

    const updateRoleUser = async (id,role)=>{
        setMsg('')
        try {
            const {data} = await updateRole(id,role)
            setMsg(data.msg)
            setModal(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <HelmetTitle title="Data Users" />
            <Modal active={modal} msg={msg} closeModal={closeModal}/>
            <div>
                <div className="text-3xl">Data Users</div>
                <FunctionContext.Provider value={{dataUsers,handleDeleteUsers,updateRoleUser}}>
                    <TableUsers />
                </FunctionContext.Provider>
            </div>
        </div>
    )
}

Users.propTypes = {
    navbarTitle: PropTypes.func
}

export default Users