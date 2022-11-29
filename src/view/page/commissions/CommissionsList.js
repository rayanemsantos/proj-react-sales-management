import React, { useEffect, useState } from 'react';
import { Box,  Button,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import { fetchSalesCommissions } from '../../../services/sales.service';
import { formatPrice } from '../../../application/util/moneyUtil';
import dateUtil from '../../../application/util/dateUtil';
import Datepicker from '../../component/input-datepicker/Datepicker';
import { Search } from '@mui/icons-material';

const CommissionsList = () => {
    const styleRowTotal = { border: 0, fontWeight: 600 };
    const formatDate = dateUtil.formatDate;
    const [data, setdata] = useState(null);
    const [init, setInit] = useState(new Date());
    const [end, setEnd] = useState(new Date());


    function getSalesCommissions(){
        let initFormat = formatDate(init);
        let endFormat = formatDate(end);

        fetchSalesCommissions(initFormat, endFormat).then((res) => {
            setdata(res);
        })
    };
    
    useEffect(() => {
        getSalesCommissions();
        return () => {
            // cleanup
        };
    }, []);

    const headers = [
        // { title: 'Cód.' },
        { title: 'Vendedor' },
        { title: 'Total de Vendas', align: 'center' },
        { title: 'Total de Comissões', align: 'center' },
    ];

    const buildTableCell = (text = '', align = 'left', style = {}) => {
        return <TableCell sx={style} align={align}>{text}</TableCell>
    };

    function Row(props){
        const { row, index } = props;
        return (
            <React.Fragment>
                <TableRow key={index}>
                    <TableCell align="left">{row.seller}</TableCell>
                    <TableCell align="center">{row.total_sales}</TableCell>
                    <TableCell align="center">{formatPrice(row.total_commission)}</TableCell>
                </TableRow> 
            </React.Fragment>          
        )
    };

    return (
        <Box     
            sx={{
                margin: 5,
            }}
          >
            <div className='flex justify-content-between my-5'>
                <Typography            
                    variant="h6" 
                    component="div" 
                    sx={{ flexGrow: 1, fontWeight: 600 }} 
                    color='primary'
                >
                    Relatório de Comissões
                </Typography>  
                <div className='flex align-items-center'>
                    <Datepicker
                        value={init}
                        actionDateSelect={setInit}
                        className='mx-2'
                    />
                    <Datepicker
                        value={end}
                        actionDateSelect={setEnd}
                        className='mx-2'
                    />    
                    <Button 
                        color='primary' 
                        variant='contained'
                        sx={{
                            minWidth: 22,
                            height: 40
                        }}
                        onClick={getSalesCommissions}
                    >
                        <Search/>
                    </Button>
                </div>
            </div>      

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
                        {data && data.results.map((row, index) => (
                            <Row row={row} index={index}/>
                        ))}
                        {
                            data && (
                                <TableRow sx={{paddingTop: 5}}>
                                    {buildTableCell('Total de Comissões do Período', '', styleRowTotal)}
                                    {buildTableCell('', '', styleRowTotal)}
                                    {buildTableCell(formatPrice(data.total), 'center', styleRowTotal)}
                                </TableRow>   
                            )
                        }                     
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default CommissionsList;