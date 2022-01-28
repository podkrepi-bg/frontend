import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
} from '@mui/material'
import axios from "axios";
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { DeleteModalStore } from './DeleteModalStore'

function DetailsModal() {
    const { getDialogs } = DeleteModalStore
    const handleClose = () => DeleteModalStore.hide()
    const { t } = useTranslation()

    const onYesButtonClick = async (id: string) => {
        axios.delete(
            `http://localhost:5010/api/bootcamp/${id}`
        ).then(() => {
            DeleteModalStore.clear()
            window.location.reload()
        })
    }

    return (
        <>
            {getDialogs.map(({ id, show, title, row }) => {
                return (
                    <Dialog
                        key={id}
                        onClose={handleClose}
                        open={show}
                        maxWidth="md"
                        PaperProps={{ elevation: 5 }}
                        BackdropProps={{ style: { opacity: 0.3 } }}>
                        {title && <DialogTitle>{title}</DialogTitle>}
                        <DialogContent dividers>
                            <Grid item xs={12}>
                                <Typography variant="h5" style={{ textAlign: "center" }} component="h2">{t('bootcamp:sure')}</Typography>
                                <div style={{ textAlign: "center", marginTop: "2%" }}>
                                    <Button onClick={async () => await onYesButtonClick(row.id)} variant="outlined">Yes</Button>
                                    <Button onClick={() => DeleteModalStore.clear()} variant="outlined">No</Button>
                                </div>
                            </Grid>
                            {/*  */}
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose} color="primary">
                                {t('common:close')}
                            </Button>
                        </DialogActions>
                    </Dialog>
                )
            })}
        </>
    )
}

export default observer(DetailsModal)


/*


export default function RemoveBootcamper() {
    return <Layout>
        <Typography variant="h5" style={{ textAlign: "center" }} component="h2">{t('bootcamp:sure')}</Typography>
        <div style={{ textAlign: "center", marginTop: "2%" }}>
            <Button onClick={async () => await onYesButtonClick()} variant="outlined">Yes</Button>
            <Button href={`/bootcamp/${id}`} style={{ marginLeft: "5%" }} variant="outlined">No</Button>
        </div>
    </Layout>
}*/