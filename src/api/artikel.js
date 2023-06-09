import axios from 'axios'


const endpoint = "https://portal-berita-backend.fathullahmunadi.repl.co"


export const getArtikel = async ()=>{
    const data = await axios.get(`${endpoint}/artikel`)
    return data
}