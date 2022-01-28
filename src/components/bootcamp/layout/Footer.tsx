import React from "react";
import {
    AppBar,
    Toolbar,
    Typography
} from "@mui/material";
import PodkrepiLogo from "components/brand/PodkrepiLogo";
const Footer = () => <>
    <div>
        <footer style={{
            height: '100%',
            overflow: 'hidden',
            width: '100%', backgroundColor: "#46dbf2"
        }}>
            <PodkrepiLogo></PodkrepiLogo>
            <Typography variant="caption">©2022</Typography>
            <Typography variant="caption">All rights reserved</Typography>
        </footer>
    </div>
</>

export default Footer;