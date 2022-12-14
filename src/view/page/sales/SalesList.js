import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Collapse, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchSales, deleteSale } from '../../../services/sales.service';
import { formatPrice, formatDecimal } from '../../../application/util/moneyUtil';
import dateUtil from '../../../application/util/dateUtil';
import SalesDialog from '../../component/dialog/Dialog';
import feedbackService from '../../../application/service/feedbackService';

const SalesList = ({
    onClickEdit
}) => {
    const dialogInitialState = {open: false, id: null};
    const [items, setItems] = useState([]);
    const [openConfirm, setOpenConfirm] = useState(dialogInitialState);

    
    const formatDate = dateUtil.formatDatePtBr;

    function getSales(){
        fetchSales().then((res) => {
            setItems(res);
        })
    };

    function removeSale(id){
        deleteSale(id).then(() => {
            getSales();
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

    const buildTableCell = (text = '', align = 'left', style = {}) => {
        return <TableCell key={uuid()} sx={style} align={align}>{text}</TableCell>
    };

    function RowNested(props) {
        const { row } = props;
        const sumQuantity = row.sale_products.map((_sp) => _sp.quantity).reduce(
            (accumulator, currentValue) => accumulator + currentValue, 0
        );        
        const styleRow = { border: 0 };
        const styleRowTotal = { border: 0, fontWeight: 600 };

        return (
            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {productHeaders.map((_header) => {
                            return (
                                buildTableCell(_header.title, _header.align, {border: 0})
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {row.sale_products.map((rowProduct, index) => (
                    <TableRow key={index}>
                        {buildTableCell(`${rowProduct.id} - ${rowProduct.product.description}`, '', styleRow)}
                        {buildTableCell(rowProduct.quantity, 'center', styleRow)}
                        {buildTableCell(formatPrice(rowProduct.product.unit_price), 'center', styleRow)}
                        {buildTableCell(formatPrice(rowProduct.total), 'center', styleRow)}
                        {buildTableCell(`${formatDecimal(rowProduct._commission_applied)}%`, 'center', styleRow)}
                        {buildTableCell(formatPrice(rowProduct.total_commission), 'center', styleRow)}
                    </TableRow>            
                    ))}
                    <TableRow sx={{paddingTop: 5}}>
                        {buildTableCell('Total da venda', '', styleRowTotal)}
                        {buildTableCell(sumQuantity, 'center', styleRowTotal)}
                        {buildTableCell('', '', styleRowTotal)}
                        {buildTableCell(formatPrice(row.total), 'center', styleRowTotal)}
                        {buildTableCell('', '', styleRowTotal)}
                        {buildTableCell(formatPrice(row.total_commission), 'center', styleRowTotal)}
                    </TableRow>
                </TableBody>
            </Table>
        );
    };

    function Row(props){
        const { row, index } = props;
        const [open, setOpen] = useState(false);
        return (
            <>
            <TableRow key={index}>
                <TableCell align="left" style={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: '1rem'}}>{row.access_key}</TableCell>
                <TableCell align="left">{row.customer.name}</TableCell>
                <TableCell align="left">{row.seller.name}</TableCell>
                <TableCell align="center">{formatDate(new Date(row.register_datetime), 'dd/MM/yyyy HH:mm')}</TableCell>
                <TableCell align="center">{formatPrice(row.total)}</TableCell>
                <TableCell align="center">
                    <Button variant="text" onClick={() => setOpen(!open)}>Ver mais</Button>
                    <IconButton aria-label="edit" color="primary" onClick={() => onClickEdit(row.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="primary" onClick={() => setOpenConfirm({open: true, id: row.id})}>
                        <DeleteIcon />
                    </IconButton>                                                                
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0, border: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <RowNested key={uuid()} row={row}/>
                    </Collapse>
                </TableCell>
            </TableRow>    
            </>      
        )
    };

    async function handleConfirmDelete(){
        await removeSale(openConfirm.id);
        feedbackService.showSuccessMessage('Venda deletada com sucesso')
        handleCloseDialog();
    };

    function handleCloseDialog(){
        setOpenConfirm(dialogInitialState);
    };

    return (
        <>
        <SalesDialog 
            title='Remover Venda' 
            description='Deseja remover esta venda?'
            closeTitle='Não'
            confirmTitle='Sim'
            open={openConfirm.open}
            onClose={handleCloseDialog}
            handleConfirm={handleConfirmDelete}
        />
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((_header) => {
                            return (
                                buildTableCell(_header.title, _header.align)
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((row, index) => (
                        <Row key={uuid()} row={row} index={index}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}

export default SalesList;