import * as React from 'react';
import { useTheme } from '@mui/material/styles'
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
import { Button, Container } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import PodkrepiLogo from 'components/brand/PodkrepiLogo';
import { context } from '../context';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
    paper: {
        height: "90%"
    }
})

export default function Nav() {
    const router = useRouter()
    const classes = useStyles()

    const store = React.useContext(context)
    const [open, setOpen] = React.useState(store.isOpen);
    const theme = useTheme()

    const handleDrawerOpen = () => {
        store.changeIsOpen(true)
        setOpen(store.isOpen);
    };

    const handleDrawerClose = () => {
        store.changeIsOpen(false)
        setOpen(store.isOpen);
    };

    return (
        <Box sx={{ display: 'flex', bgcolor: "primary.main" }}>
            <CssBaseline />
            <AppBar position="fixed" style={{ backgroundColor: theme.palette.primary.light }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton onClick={() => router.push('/')}><PodkrepiLogo /></IconButton>
                    <Typography variant="h6" noWrap component="div" style={{ textAlign: "center" }}>
                        BOOTCAMPERS MODULE
                    </Typography>
                    <ProfileMenu></ProfileMenu>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={open}
                variant='persistent'
                
                PaperProps={
                    {
                        style: {
                            height: "84.2%",
                            marginTop: "4.2%"
                        }
                    }
                }
            >
                <IconButton onClick={handleDrawerClose}>
                    <CloseIcon></CloseIcon>
                </IconButton>
                <Divider />
                <List>
                    <ListItem button sx={{ ":hover": { color: theme.palette.primary.dark } }}>
                        <IconButton sx={{ ":hover": { color: theme.palette.primary.dark } }} onClick={() => { router.push('/bootcamp') }}><ListIcon fontSize="small"></ListIcon></IconButton><Button onClick={() => { router.push('/bootcamp') }} sx={{ ":hover": { color: theme.palette.primary.main } }}>All bootcampers</Button>
                    </ListItem>
                    <ListItem sx={{ ":hover": { color: theme.palette.primary.dark } }}>
                        <IconButton sx={{ ":hover": { color: theme.palette.primary.dark } }} onClick={() => { router.push('/bootcamp/add') }}><AddIcon fontSize="small"></AddIcon></IconButton><Button onClick={() => { router.push('/bootcamp/add') }} sx={{ ":hover": { color: theme.palette.primary.main } }}>Add bootcamper</Button>
                    </ListItem>
                    <ListItem>
                        <SearchMenu />
                    </ListItem>
                </List>
            </Drawer>
        </Box >
    );

    //439CB3
}