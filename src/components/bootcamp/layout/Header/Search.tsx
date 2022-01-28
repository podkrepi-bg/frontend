import * as React from 'react';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItem, Button, IconButton } from '@mui/material';

export default function SearchMenu() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <IconButton onClick={handleClick} style={{ color: "black" }}>
                {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <Button onClick={handleClick} style={{ color: "black" }}>Search</Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem>
                        <Button sx={{ pl: 4 }} href="/bootcamp/search/name">
                            Search by name
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button sx={{ pl: 4 }} href="/bootcamp/search/email">
                            Search by email
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button sx={{ pl: 4 }} href="/bootcamp/search/phone">
                            Search by phone
                        </Button>
                    </ListItem>
                </List>
            </Collapse>
        </>
    );
}
