import * as React from 'react';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItem, Button, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';

export default function SearchMenu() {
    const theme = useTheme()
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <IconButton onClick={handleClick} style={{ color: "black" }}>
                {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <Button onClick={handleClick} style={{ color: "black" }} sx={{ ":hover": { color: theme.palette.primary.main } }}>Search</Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem>
                        <Button sx={{ pl: 4, ":hover": { color: theme.palette.primary.main } }} href="/bootcamp/search/name">
                            <Typography textAlign="center">Search by name</Typography>
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button sx={{ pl: 4, ":hover": { color: theme.palette.primary.main } }} href="/bootcamp/search/email">
                            <Typography textAlign="center">Search by email</Typography>
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button sx={{ pl: 4, ":hover": { color: theme.palette.primary.main } }} href="/bootcamp/search/phone">
                            <Typography textAlign="center">Search by phone</Typography>
                        </Button>
                    </ListItem>
                </List>
            </Collapse>
        </>
    );
}
