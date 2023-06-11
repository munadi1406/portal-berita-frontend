import { useState } from "react";
import { addKategori } from "../api/kategori";
import { KategoriData } from "../utils/imports";


export default function AddKategori() {
    const [Kategori,setKategori] = useState("")
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const data = await addKategori(Kategori);
            KategoriData.receiveMessage('Pesan baru');
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {/* Open the modal using ID.showModal() method */}
            <button className="btn btn-neutral" onClick={() => window.my_modal_2.showModal()}>
                Add Kategori
            </button>
            <dialog id="my_modal_2" className="modal">
                <form method="dialog" className="modal-box">
                    <div className=" flex justify-center items-center flex-col">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <div className="flex flex-col w-full gap-2">
                            <h3 className="font-bold text-lg">Kategori</h3>
                            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full " value={Kategori} onChange={(e)=>setKategori(e.target.value)}/>
                            <button className="btn btn-primary" type="submit" onClick={(e)=>handleSubmit(e)}>Tambah Kategori</button>
                        </div>
                    </div>
                </form>
            </dialog>
        </>
    );


}
