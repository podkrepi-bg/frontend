import React from "react";
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

export default function ProfileMenu() {

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return <Box sx={{ flexGrow: 0 }} style={{ position: "relative", right: "-1000px" }}>
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
            </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Account</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Logout</Typography>
            </MenuItem>
        </Menu>
    </Box>
}