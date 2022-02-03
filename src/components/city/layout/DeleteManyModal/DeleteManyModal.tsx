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
import { DeleteManyModalStore } from './DeleteManyModalStore'
import { useTheme } from '@mui/styles';
import { AlertStore } from '../NotificationsAlert/AlertStore';
import { useQuery } from 'react-query';
import { CityResponse } from 'gql/city'
import { endpoints } from 'common/api-endpoints';


function DetailsModal() {
    const theme = useTheme()
    const { getDialogs } = DeleteManyModalStore
    const handleClose = () => DeleteManyModalStore.hide()
    const { t } = useTranslation()
    const query = useQuery<CityResponse[]>(endpoints.city.listCities.url)

    const onYesButtonClick = async (ids: any[]) => {
        try {
            ids.map(x => {
                axios.delete(
                    `http://localhost:5010/api/city/remove/${x}`
                )
            })
            DeleteManyModalStore.clear()
            AlertStore.show('Successfully removed cities', 'success')
            query.refetch()
        } catch (e) {
            AlertStore.show('An error occured', 'error')
        }
    }

    return (
        <>
            {getDialogs.map(({ ids, show }) => {
                return (
                    <Dialog
                        key={ids[0]}
                        onClose={handleClose}
                        open={show}
                        maxWidth="md"
                        PaperProps={{ elevation: 5 }}
                        BackdropProps={{ style: { opacity: 0.3 } }}>
                        <DialogTitle>Bootcampers removing</DialogTitle>
                        <DialogContent dividers>
                            <Grid item xs={12}>
                                <Typography variant="h5" style={{ textAlign: "center" }} component="h2">Are you sure you want to remove these cities?</Typography>
                                <div style={{ textAlign: "center", marginTop: "2%" }}>
                                    <Button onClick={async () => await onYesButtonClick(ids)} variant="outlined" sx={{ backgroundColor: theme.palette.secondary.main, color: 'white' }}>Yes</Button>
                                    <Button onClick={() => DeleteManyModalStore.clear()} sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.background.default }} variant="outlined" style={{ marginLeft: "1%" }}>No</Button>
                                </div>
                            </Grid>
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