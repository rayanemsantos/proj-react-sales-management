import * as React from 'react';
import { TextField } from '@mui/material';

export default function SalesInput(props) {
    const { label, placeholder = '', ...rest } = props;

    return (
        <>
        {label && <label>{label}</label>}
            <TextField
                className='my-2'
                required
                placeholder={placeholder}
                size="small"
                fullWidth 
                {...rest}
            /> 
        </>
    );
}
