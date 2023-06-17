/* eslint-disable react/prop-types */
import { useMemo, useRef, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import formatDateTime from "../utils/formatDateTime";
import { Parser } from "html-to-react";
import PropTypes from 'prop-types'



const TableArtikel = ({ dataArtikel,deleteArtikel }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(dataArtikel);
  }, [dataArtikel]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "title", //simple recommended way to define a column
        header: "Title",
        muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
        Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
      },
      {
        accessorKey: "content", //simple recommended way to define a column
        header: "Content",
        muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
        Cell: ({ cell }) => <span>{Parser().parse(cell.getValue())}</span>, //optional custom cell render
      },
      {
        accessorKey: "kategori", //simple recommended way to define a column
        header: "Kategori",
        muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
        Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
      },
      {
        accessorKey: "createdAt", //simple recommended way to define a column
        header: "Created At",
        muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
        Cell: ({ cell }) => <span>{formatDateTime(cell.getValue())}</span>, //optional custom cell render
      },
      {
        accessorKey: "image", //simple recommended way to define a column
        header: "Image",
        muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
        Cell: ({ cell }) => <img width={50} src={cell.getValue()} />, //optional custom cell render
      },
      {
        header: "Image",
        muiTableHeadCellProps: { sx: { color: "black" } }, //optional custom props
        Cell: ({cell}) => (
          <div>
            <button className="btn btn-info" >Edit</button>
            <button className="btn btn-warning" onClick={()=>deleteArtikel(cell.row.original.artikelId)}>Hapus</button>
          </div>
        ),
      },
    ],
    []
  );
  
  
  //Or, optionally, you can get a reference to the underlying table instance
  const tableInstanceRef = useRef(null);

  return (
<div className="w-full">
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnOrdering //enable some feature
      enablePagination={false} //disable a default feature
      tableInstanceRef={tableInstanceRef} //get a reference to the underlying table instance (optional)
    />
</div>
  );
};

TableArtikel.propTypes = {
    dataArtikel:PropTypes.array.isRequired,
    deleteArtikel:PropTypes.func,
}
export default TableArtikel;
