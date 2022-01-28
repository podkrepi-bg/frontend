import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import ListItem from '@mui/material/ListItem';
import ProfileMenu from './ProfileMenu';
import SearchMenu from './Search';
import { Button } from '@mui/material';
import PodkrepiLogo from 'components/brand/PodkrepiLogo';

export default function Nav() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" style={{ backgroundColor: "#46dbf2" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton href="/"><PodkrepiLogo /></IconButton>
                    <Typography variant="h6" noWrap component="div" style={{ textAlign: "center" }}>
                        Bootcampers Module
                    </Typography>
                    <ProfileMenu></ProfileMenu>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={open}
            >
                <IconButton onClick={handleDrawerClose}>
                    <CloseIcon></CloseIcon>
                </IconButton>
                <Divider />
                <List>
                    <ListItem button>
                        <IconButton href="/bootcamp"><ListIcon fontSize="small"></ListIcon></IconButton><Button style={{ color: "black" }} href="/bootcamp">All bootcampers</Button>
                    </ListItem>
                    <ListItem>
                        <IconButton href="/bootcamp/add"><AddIcon fontSize="small"></AddIcon></IconButton><Button style={{ color: "black" }} href="/bootcamp/add">Add bootcamper</Button>
                    </ListItem>
                    <ListItem>
                        <SearchMenu />
                    </ListItem>
                </List>
            </Drawer>
        </Box >
    );
}