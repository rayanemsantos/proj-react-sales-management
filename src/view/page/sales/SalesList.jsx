import React, { useEffect, useState } from 'react';
import { Collapse, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchSales } from '../../../services/sales.service';
import { formatPrice, formatDecimal } from '../../../application/util/moneyUtil';
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

    const productHeaders = [
        { title: 'Produtos/Serviço' },
        { title: 'Quantidade', align: 'center' },
        { title: 'Preço unitário', align: 'center' },
        { title: 'Total do Produto', align: 'center' },
        { title: '% de Comissão', align: 'center' },
        { title: 'Comissão', align: 'center' },
    ];

    const renderHeaderTitles = ({title, align = 'left'}) => {
        return (
            <TableCell sx={{border: 0}} align={align}>{title}</TableCell>
        );
    };

    function RowNested(props) {
        const { row } = props;
        const sumQuantity = row.sale_products.map((_sp) => _sp.quantity).reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );        
        return (
            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {productHeaders.map((_header) => {
                            return (
                                renderHeaderTitles(_header)
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {row.sale_products.map((rowProduct, index) => (
                    <TableRow key={index}>
                        <TableCell sx={{border: 0}} align="left">{rowProduct.id} - {rowProduct.product.description}</TableCell>
                        <TableCell sx={{border: 0}} align="center">{rowProduct.quantity}</TableCell>
                        <TableCell sx={{border: 0}} align="center">{formatPrice(rowProduct.product.unit_price)}</TableCell>
                        <TableCell sx={{border: 0}} align="center">{formatPrice(rowProduct.total)}</TableCell>
                        <TableCell sx={{border: 0}} align="center">{formatDecimal(rowProduct._commission_applied)}%</TableCell>
                        <TableCell sx={{border: 0}} align="center">{formatPrice(rowProduct.total_commission)}</TableCell>
                    </TableRow>            
                    ))}
                    <TableRow sx={{paddingTop: 5}}>
                        <TableCell sx={{border: 0, fontWeight: 600}} align="left">Total da venda</TableCell>
                        <TableCell sx={{border: 0, fontWeight: 600}} align="center">{sumQuantity}</TableCell>
                        <TableCell sx={{border: 0, fontWeight: 600}} align="center"></TableCell>
                        <TableCell sx={{border: 0, fontWeight: 600}} align="center">{formatPrice(row.total)}</TableCell>
                        <TableCell sx={{border: 0, fontWeight: 600}} align="center"></TableCell>
                        <TableCell sx={{border: 0, fontWeight: 600}} align="center">{formatPrice(row.total_commission)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    };

    function Row(props){
        const { row, index } = props;
        const [open, setOpen] = useState(false);
        return (
            <React.Fragment>
                <TableRow key={index}>
                    <TableCell align="left">{row.access_key}</TableCell>
                    <TableCell align="left">{row.customer.name}</TableCell>
                    <TableCell align="left">{row.seller.name}</TableCell>
                    <TableCell align="center">{formatDate(new Date(row.register_datetime), 'dd/MM/yyyy HH:MM')}</TableCell>
                    <TableCell align="center">{formatPrice(row.total)}</TableCell>
                    <TableCell align="center">
                        <Button variant="text" onClick={() => setOpen(!open)}>Ver mais</Button>
                        <IconButton aria-label="edit" color="primary">
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="primary">
                            <DeleteIcon />
                        </IconButton>                                                                
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ padding: 0, border: 0 }} colSpan={12}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <RowNested row={row}/>
                        </Collapse>
                    </TableCell>
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
                                renderHeaderTitles(_header)
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((row, index) => (
                        <Row row={row} index={index}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SalesList;