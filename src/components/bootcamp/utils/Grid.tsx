import { IconButton } from "@mui/material";
import { DataGrid, GridColumns, GridValueGetterParams } from "@mui/x-data-grid";
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DialogStore } from '../layout/DetailsModal/BootcampModalStore'
import { DeleteModalStore } from '../layout/DeleteModal/DeleteModalStore'


const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
        field: 'MyName',
        headerName: 'Name',
        valueGetter: (p) => `${p.row.MyName}`,
        flex: 1,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        renderCell: (params: GridValueGetterParams) => {
            return <div>
                <IconButton onClick={() => DialogStore.show(params.row)}><InfoIcon></InfoIcon></IconButton>
                <IconButton onClick={() => { window.location.pathname = `/bootcamp/edit/${params.row.id}` }}><EditIcon></EditIcon></IconButton>
                <IconButton onClick={() => DeleteModalStore.show(params.row, 'Delete bootcamper')}><DeleteIcon></DeleteIcon></IconButton>
            </div >
        },
        flex: 0.15
    }
]

export default function GenericGrid({ props }) {
    const bootcampers = props.data

    return <DataGrid
        rows={bootcampers || []}
        columns={columns}
        pageSize={5}
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
    >
    </DataGrid>
}