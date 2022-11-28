import React, { useEffect, useState } from 'react';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchSales } from '../../../services/sales.service';
import { formatPrice } from '../../../application/util/moneyUtil';
import dateUtil from '../../../application/util/dateUtil';

const SalesList = () => {
    const [items, setItems] = useState([]);

    const formatDate = dateUtil.formatDatePtBr;
    
    function getSales(){
        fetchSales().then((res) => {
            setItems(res);
        })
    };
    useEffect(() => {
        getSales();
        return () => {
            // cleanup
        };
    }, []);

    const headers = [
        { title: 'Nota Fiscal' },
        { title: 'Cliente' },
        { title: 'Vendedor' },
        { title: 'Data da Venda', align: 'center' },
        { title: 'Valor Total', align: 'center' },
        { title: 'Opções', align: 'center' },
    ];

    const renderHeaderTitles = ({title, align = 'left'}) => {
        return (
            <TableCell align={align}>{title}</TableCell>
        );
    };

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
                <TableRow>
                    {headers.map((_header) => {
                        return (
                            renderHeaderTitles(_header)
                        )
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
                {items.map((row, index) => (
                <TableRow key={index}>
                    <TableCell align="left">{row.access_key}</TableCell>
                    <TableCell align="left">{row.customer.name}</TableCell>
                    <TableCell align="left">{row.seller.name}</TableCell>
                    <TableCell align="center">{formatDate(new Date(row.register_datetime), 'dd/MM/yyyy HH:MM')}</TableCell>
                    <TableCell align="center">{formatPrice(row.total)}</TableCell>
                    <TableCell align="center">
                        <Button variant="text">Ver mais</Button>
                        <IconButton aria-label="edit" color="primary">
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="primary">
                            <DeleteIcon />
                        </IconButton>                                                                
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    );
}

export default SalesList;