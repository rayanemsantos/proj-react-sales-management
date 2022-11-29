import React from 'react';
import Select from 'react-select';

const customStyles = {
    control: base => ({
      ...base,
      minHeight: 44,
      height: 44,
    })
};

export default function SalesSelect(props) {
    const { placeholder = 'Selecione', 
            options = [], 
            label, 
            callback, ...rest } = props;

    const handleData = (event) => {
        if (callback) callback(event);
    };

    return (
        <>
            {label && <label>{label}</label>}
            <Select 
                className='my-2'
                options={options} 
                placeholder={placeholder}
                styles={customStyles}
                onChange={(e) => handleData(e)}
                {...rest}
            />        
        </>
    );
}
