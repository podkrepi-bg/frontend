import React from 'react';
import { Box, TextField } from '@mui/material'

export default function CarField({ value, label, setElement, type }) {
    return <>
        <Box sx={{ display: 'inline', mr: 4 }}>
            <TextField
                id={value?.toString()}
                label={label}
                value={value}
                onChange={(e) => setElement(e.target.value)}
                required
                size="small"
                sx={{ mb: 4 }}
                type={type || 'text'}
            />
        </Box>
    </>;
}
