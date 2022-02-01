import { IconButton } from "@mui/material";
import { DataGrid, GridColumns, GridValueGetterParams } from "@mui/x-data-grid";
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DialogStore } from '../layout/DetailsModal/BootcampModalStore'
import { DeleteModalStore } from '../layout/DeleteModal/DeleteModalStore'
import theme from "../layout/theme";
import { useState } from "react";
import { DeleteManyModalStore } from '../layout/DeleteManyModal/DeleteManyModalStore'
import SubmitButton from "components/common/form/SubmitButton";

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
                <IconButton onClick={() => DialogStore.show(params.row)} style={{ color: theme.palette.primary.main }}><InfoIcon></InfoIcon></IconButton>
                <IconButton onClick={() => { window.location.pathname = `/bootcamp/edit/${params.row.id}` }} style={{ color: theme.palette.secondary.main }}><EditIcon></EditIcon></IconButton>
                <IconButton onClick={() => DeleteModalStore.show(params.row, 'Delete bootcamper')} style={{ color: theme.palette.primary.dark }}><DeleteIcon></DeleteIcon></IconButton>
            </div >
        },
        flex: 0.15
    }
]

export default function GenericGrid({ props }) {
    const bootcampers = props.data
    const [rows, setRows] = useState([])
    return <>
        <DataGrid
            style={{ marginBottom: "1%", width: "90%", marginLeft: "10%" }}
            checkboxSelection={true}
            rows={bootcampers || []}
            columns={columns}
            pageSize={5}
            autoHeight
            autoPageSize
            disableSelectionOnClick
            onSelectionModelChange={(ids) => {
                setRows(ids)
                console.log(rows)
            }}
        >
        </DataGrid>
        <SubmitButton sx={{ bgcolor: theme.palette.primary.light, marginLeft: "10%", width: "50%" }} label={`Delete selected bootcampers (${rows.length})`} onClick={() => DeleteManyModalStore.show(rows)} disabled={rows.length === 0}></SubmitButton>
    </>
}