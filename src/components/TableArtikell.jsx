import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { convert } from 'html-to-text'
import formatDateTime from '../utils/formatDateTime';
import pisahKategori from '../utils/pisahKategori';
import randomBg from '../utils/randomBg';


const TableArtikell = ({ data,deleteArtikel}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dataArtikell, setDataArtikel] = useState([])

    useEffect(() => {
        setDataArtikel(data)
    }, [data])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = dataArtikell.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const HtmltoText = (e) => {
        const content = convert(e);
        const maxLength = 75; // Panjang maksimum konten yang ingin ditampilkan
        const truncatedTitle =
            content.length > maxLength ? content.slice(0, maxLength) + "..." : content;
        return truncatedTitle
    };
    return (
        <div className="overflow-x-auto">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="m-2 input input-bordered input-info"
            />
            <table className="table table-md table-zebra table-pin-rows table-pin-cols">
                <thead >
                    <tr className=''>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Publisher</th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Title</th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Prolog</th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Content</th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Kategori</th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Created At</th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Image</th>
                        <th className="px-4 py-2 text-lg border-b-2 bg-info text-base-100 border border-white text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.id} className='hover'>
                            <td className="px-4 py-2">{item.user.username}</td>
                            <td className="px-4 py-2">{item.title}</td>
                            <td className="px-4 py-2">ini prolog</td>
                            <td className="px-4 py-2 lowercase">{HtmltoText(item.content)}</td>
                            <td className="px-4 py-2 flex flex-wrap justify-center items-center">{
                                pisahKategori(item.kategori).map((e,i)=>(
                                    <div key={i} className={`badge text-white ${randomBg()}`}>{e}</div>
                                ))
                            }</td>
                            <td className="px-4 py-2">{formatDateTime(item.createdAt)}</td>
                            <td className="px-4 py-2"><img src={item.image} alt={item.title} width={50} /></td>
                            <td className="px-4 py-2">
                                <div className='flex flex-wrap w-max space-y-1'>
                                    <button className='btn btn-info w-full'>Edit</button>
                                    <button className="btn btn-warning w-full" onClick={()=>deleteArtikel(item.artikelId)}>Hapus</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

TableArtikell.propTypes = {
    data: PropTypes.array.isRequired,
    deleteArtikel:PropTypes.func
}

export default TableArtikell;
