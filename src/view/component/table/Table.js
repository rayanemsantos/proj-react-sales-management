import React from 'react';
import { v4 as uuid } from 'uuid';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatPrice } from '../../../application/util/moneyUtil';
import dateUtil from '../../../application/util/dateUtil';

const SalesTable = (props) => {
    const { headers = [], data = [], bottomRowList = [], loading = false, callbackDelete} = props;
    const formatDate = dateUtil.formatDate;

    const formatedField = (field, format) => {
        switch (format) {
            case 'price':
                return field ? formatPrice(field) : '';
            default:
                return field
        }
    };

    function getNestedPropertyValue(object, nestedProperty) {
        let obj = object;
        const split = nestedProperty.split('.');
        for (let z = 0; z < split.length; z++) {
            try {
                obj = obj[split[z]];
            }
            catch (e) {
                obj = ''
            }
        }
        return obj;
    };

    const getField = (item, field) => {
        let value = item[field['field']]
        if (field['nested']) {
            value = getNestedPropertyValue(item, field['nested'])
        }
        value = formatedField(value, field['format'])
        return {value, align: field['align'], style: field['style']}

    };

    const buildTableCell = (text = '', align = 'left', style = {}) => {
        return <TableCell key={uuid()} sx={style} align={align}>{text}</TableCell>
    };

    function Row(props){
        const { row, index } = props;
        return (
            <TableRow key={index}>
                {headers.map((field) => {
                    const { value, align, style } = getField(row, field);
                    return buildTableCell(value, align, style)
                })}
                {callbackDelete ? (
                    <IconButton aria-label="delete" color="primary" onClick={() => callbackDelete(index)}>
                        <DeleteIcon />
                    </IconButton>
                ) : null}                    
            </TableRow>         
        )
    };

    const renderTableLastRow = () => {
        return (
            bottomRowList && bottomRowList.length ? (
                <TableRow>
                    {bottomRowList.map((_bottomRow, index) => {
                        const bottomValue = formatedField(_bottomRow.value, _bottomRow['format'])
                        return buildTableCell(bottomValue, _bottomRow.align, _bottomRow.style)
                    })}
                </TableRow>
            ) : null
        )
    };

    const renderLoadingTable = () => {
        return (
            <TableRow>
                <TableCell colSpan={12} sx={{border: 0}}>
                    <Box sx={{ width: '100%', marginTop: 2, marginBottom: 2 }}>
                        <LinearProgress/>
                    </Box>
                </TableCell>
          </TableRow>
        );
    }

    const renderEmptyList = () => {
        return (<TableRow>{buildTableCell('Nenhum resultado encontrado', 'left', {border: 0})}</TableRow>);
    };

    const renderTableData = () => {
        return (
            data.map((row, index) => (
                <Row key={index} row={row} index={index}/>
            ))
        )
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">      
                <TableHead>
                    <TableRow>
                        {headers.map((_header) => {
                            return (
                                buildTableCell(_header.label, _header.align, _header.style)
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.length ? (
                            <>
                                {renderTableData()}
                                {renderTableLastRow()}
                            </>
                        ) : (        
                            loading ? (
                                renderLoadingTable()
                            ) : (
                                renderEmptyList()
                            )
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SalesTable;