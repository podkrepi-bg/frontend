import React from 'react'
import { Container } from "@mui/material";
import Footer from "./Footer";
import Nav from './Header/Nav';
import BootcampModal from './DetailsModal/BootcampModal';
import DeleteModal from './DeleteModal/DeleteModal';
import { ThemeProvider } from '@mui/styles';
import theme from './theme';

export default function BootcampersLayout({ children }) {
    return <ThemeProvider theme={theme}>
        <Container>
            <Nav />
            {children}
            <Footer title="BOOTCAMPERS MODULE of pokrepi.bg" description='All rights reserved'></Footer>
            <BootcampModal></BootcampModal>
            <DeleteModal></DeleteModal>
        </Container>
    </ThemeProvider>
}