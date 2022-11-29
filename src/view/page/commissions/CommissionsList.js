import React, { useEffect, useState } from 'react';
import { Box,  Button, Typography} from '@mui/material';
import { fetchSalesCommissions } from '../../../services/sales.service';
import dateUtil from '../../../application/util/dateUtil';
import Datepicker from '../../component/input-datepicker/Datepicker';
import { Search } from '@mui/icons-material';
import SalesTable from '../../component/table/Table';

const CommissionsList = () => {
    const headerList = [
        {
            field: 'seller',
            align: 'left',
            label: 'Vendedor',
        },
        {
            field: 'total_sales',
            align: 'center',
            label: 'Total de Vendas',
        },  
        {
            field: 'total_commission',
            align: 'center',
            label: 'Total de Comissões',
            format: 'price'
        },                
    ];

    const styleRowTotal = { border: 0, fontWeight: 600 };
    const formatDate = dateUtil.formatDate;
    const [data, setdata] = useState(null);
    const [total, setTotal] = useState(0);
    const [init, setInit] = useState(new Date());
    const [end, setEnd] = useState(new Date());


    function getSalesCommissions(){
        let initFormat = formatDate(init);
        let endFormat = formatDate(end);

        fetchSalesCommissions(initFormat, endFormat).then((res) => {
            setdata(res.results);
            setTotal(res.total);
        })
    };
    
    useEffect(() => {
        getSalesCommissions();
        return () => {
            // cleanup
        };
    }, []);

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
            {
                data && (
                    <SalesTable 
                        headers={headerList} 
                        data={data}
                        bottomRowList={[
                            { value: 'Total de Comissões do Período', style: styleRowTotal },
                            {value: '', style: styleRowTotal}, 
                            { value: total, format: 'price', align: 'center', style: styleRowTotal }
                        ]}
                    />       
                )
            }
        </Box>
    );
}

export default CommissionsList;