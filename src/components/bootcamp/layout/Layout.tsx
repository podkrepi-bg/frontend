import React from 'react'
import { ThemeProvider } from '@mui/styles';
import { Container } from "@mui/material";
import Footer from "./Footer";
import Nav from './Header/Nav';
import BootcampModal from './DetailsModal/BootcampModal';
import DeleteModal from './DeleteModal/DeleteModal';
import DeleteManyModal from './DeleteManyModal/DeleteManyModal';
import theme from './theme';
import DrawerContext from './context'
import AlertComponent from './NotificationsAlert/AlertComponent';

export default function BootcampersLayout({ children }: React.PropsWithChildren<{}>) {

    return <DrawerContext>
        <ThemeProvider theme={theme}>
            <Container>
                <Nav />
                {children}
                <Footer title="BOOTCAMPERS MODULE of pokrepi.bg" description='All rights reserved'></Footer>
                <BootcampModal></BootcampModal>
                <DeleteModal></DeleteModal>
                <DeleteManyModal></DeleteManyModal>
                <AlertComponent></AlertComponent>
            </Container>
        </ThemeProvider>
    </DrawerContext>
}