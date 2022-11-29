import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import { formatPrice } from '../../../application/util/moneyUtil';
import dateUtil from '../../../application/util/dateUtil';

const SalesTable = (props) => {
    const { headers = [], data = [], bottomRowList = []} = props;
    const formatDate = dateUtil.formatDate;

    const formatedField = (field, format) => {
        switch (format) {
            case 'price':
                return field ? formatPrice(field) : '';
            default:
                return field
        }
    };

    const getField = (item, field) => {
        let value = item[field['field']]
        // if (field['nested']) {
        //     label = getNestedPropertyValue(item, field['nested'])
        // }
        value = formatedField(value, field['format'])
        return {value, align: field['align']}

    };

    const buildTableCell = (text = '', align = 'left', style = {}) => {
        return <TableCell sx={style} align={align}>{text}</TableCell>
    };

    function Row(props){
        const { row, index } = props;
        return (
            <React.Fragment>
                <TableRow key={index}>
                    {headers.map((field) => {
                        const { value, align} = getField(row, field);
                        return buildTableCell(value, align)
                    })}
                </TableRow> 
            </React.Fragment>          
        )
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((_header) => {
                            return (
                                buildTableCell(_header.label, _header.align)
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <Row row={row} index={index}/>
                    ))}
                    {bottomRowList && bottomRowList.length && (
                        <TableRow>
                            {bottomRowList.map((_bottomRow) => {
                                const bottomValue = formatedField(_bottomRow.value, _bottomRow['format'])
                                return buildTableCell(bottomValue, _bottomRow.align, _bottomRow.style)
                            })}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SalesTable;