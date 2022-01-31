import React from 'react';
import { Box, TextField } from '@mui/material'

export default function EditField({ value, label, setElement }) {
    return <>
        <Box sx={{ display: 'inline', mr: 4 }}>
            <TextField
                id={value}
                label={label}
                value={value}
                onChange={(e) => setElement(e.target.value)}
                required
                size="small"
                sx={{ mb: 4 }}
            />
        </Box>
    </>;
}
