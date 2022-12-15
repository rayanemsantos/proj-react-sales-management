import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ptBR from 'date-fns/locale/pt-BR';

export default function SalesDatepicker(props) {
    const { label, value, className = 'my-2', disableOpenPicker = false, isDatetime = false, disabled = false, actionDateSelect} = props;

    const [selectedDate, setSelectedDate] = useState(value);

    useEffect(() => {
        setSelectedDate(value);
    }, [value]);

    const handleChange = (newValue) => {
        setSelectedDate(newValue);
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
                        value={selectedDate}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} fullWidth size='small'/>}
                        disableOpenPicker={disableOpenPicker}
                        disabled={disabled}
                    />
                ) : (
                    <DatePicker
                        className={`${className} my-2`}
                        value={selectedDate}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} fullWidth size='small'/>}
                        disableOpenPicker={disableOpenPicker}
                    />
                )
            }
        </LocalizationProvider>
    );
}
