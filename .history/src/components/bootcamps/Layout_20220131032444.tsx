import React from 'react'
import { Container } from "@mui/material";
import Footer from "./Footer";
import Nav from './Header/Nav';
import BootcampModal from './DetailsModal/BootcampModal';
import DeleteModal from './DeleteModal/DeleteModal';

export default function BootcampersLayout({ children }) {
    return <Container>
        {children}
        <Footer></Footer>
    </Container>
}
