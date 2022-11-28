import React from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/material';
import SalesList from './SalesList';

function Sales() {

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
                    Vendas realizadas
                </Typography>  
                <Button variant='contained'>
                    Inserir nova venda
                </Button>
            </div>      

            <SalesList/>
        </Box>
    );
}

export default Sales;