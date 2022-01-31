import React, { useState } from 'react';
import { Collapse, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'


export default function SubList({ title, icon, data }) {
    const [open, setOpen] = useState(false);
    const handleClick = () => setOpen(!open);

    return <>
        <ListItem button key={title}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={title} />
            <IconButton size="small" edge="start" color="inherit" onClick={handleClick}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            {data.map(x => (<>
                <ListItem button key={x}>
                    <ListItemText primary={x} />
                </ListItem>
            </>))}
        </Collapse>
    </>;
}
