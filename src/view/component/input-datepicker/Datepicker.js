import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ptBR from 'date-fns/locale/pt-BR';

export default function SalesDatepicker(props) {
    const { label, className = 'my-2', disableOpenPicker = false, isDatetime = false, disabled = false, actionDateSelect} = props;
    const [value, setValue] = useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
        if (actionDateSelect) actionDateSelect(newValue);
    };

    return (
        <LocalizationProvider 
            dateAdapter={AdapterDateFns} 
            adapterLocale={ptBR}
        >
            {label && <label>{label}</label>}
            {
                isDatetime ? (
                    <DateTimePicker
                        className={`${className} my-2`}
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} fullWidth size='small'/>}
                        disableOpenPicker={disableOpenPicker}
                        disabled={disabled}
                    />
                ) : (
                    <DatePicker
                        className={`${className} my-2`}
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} fullWidth size='small'/>}
                        disableOpenPicker={disableOpenPicker}
                    />
                )
            }
        </LocalizationProvider>
    );
}
