import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ptBR from 'date-fns/locale/pt-BR';

export default function SalesDatepicker(props) {
    const { label } = props;
    const [value, setValue] = useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <LocalizationProvider 
            dateAdapter={AdapterDateFns} 
            adapterLocale={ptBR}
        >
            {label && <label>{label}</label>}
            <DateTimePicker
                className='my-2'
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} fullWidth size='small'/>}
                disableOpenPicker
            />
        </LocalizationProvider>
    );
}
