import PropTypes from 'prop-types'

export default function pisahKategori(kategori) {
    const parts = kategori.split(",");
    return parts
}

pisahKategori.propTypes = {
    kategori:PropTypes.array.isRequired
}
