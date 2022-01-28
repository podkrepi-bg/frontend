import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColumns, GridValueGetterParams } from "@mui/x-data-grid";
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useBootcampersList } from 'common/hooks/bootcamp'
import BootcampersLayout from "./layout/Layout";
import { useTranslation } from "next-i18next";
import { DialogStore } from "./layout/DetailsModal/BootcampModalStore";
import { DeleteModalStore } from "./layout/DeleteModal/DeleteModalStore";
import GenericGrid from "./utils/Grid";


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

export default function BootcampPage() {
    const { t } = useTranslation()
    const info = useBootcampersList()
    const isLoading = info.isLoading
    const bootcampers = info.data

    return <BootcampersLayout>
        <Grid item style={{ marginTop: "10%" }}>
            <Typography variant="h3">{t('nav.bootcamp.bootcampers')}</Typography>
        </Grid>
        <Grid>
            {isLoading && <CircularProgress size="large" />}
            <GenericGrid props={{ data: bootcampers || [] }} />
        </Grid>
    </BootcampersLayout>
}