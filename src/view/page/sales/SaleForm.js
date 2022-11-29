import React, {useState, useEffect} from 'react';
import { Button, Typography, Divider } from '@mui/material';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress} from '@mui/material';
import { Box } from '@mui/material';
import Select from '../../component/input-select/Select';
import Datepicker from '../../component/input-datepicker/Datepicker';
import Input from '../../component/input/Input';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatPrice } from '../../../application/util/moneyUtil';
import dateUtil from '../../../application/util/dateUtil';
import { fetchCustomer } from '../../../services/customer.service';
import { fetchSeller } from '../../../services/seller.service';
import { fetchProducts } from '../../../services/product.service';
import { fetchNewSale } from '../../../services/sales.service';
import useRouter from '../../../application/hook/useRouter';

import './sales.scss'

function SaleForm() {
    const router = useRouter();
    const formatDate = dateUtil.formatDate;

    const initialCurrentProduct = {
        product: null,
        quantity: 0,
    };

    const initialState = {
        "seller": '',
        "customer": '',
        "register_datetime": new Date(),
        "products": [],
    }

    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(initialCurrentProduct);
    const [customers, setCustomers] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [form, setForm] = useState(initialState);

    async function handleSelectOptions(){
        const resCustomer = await fetchCustomer();
        const resSeller = await fetchSeller();
        const resProducts = await fetchProducts();

        setCustomers(resCustomer);
        setSellers(resSeller);
        setProducts(resProducts);
    };

    useEffect(() => {
        handleSelectOptions()
    }, []);

    const productHeaders = [
        { title: 'Produtos/Serviço' },
        { title: 'Quantidade', align: 'center' },
        { title: 'Preço unitário', align: 'center' },
        { title: 'Total', align: 'center' },
        { title: '', align: 'center' },
    ];

    function TableProducts(props) {
        const { callbackDelete } = props;
        const styleRow = { border: 0 };

        const buildTableCell = (text = '', align = 'left', style = {}) => {
            return <TableCell sx={style} align={align}>{text}</TableCell>
        };

        return (
            <TableContainer component={Paper}>
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
                        {form.products.map((rowProduct, index) => (
                        <TableRow key={index}>
                            {buildTableCell(`${rowProduct.product.description}`, '', styleRow)}
                            {buildTableCell(rowProduct.quantity, 'center', styleRow)}
                            {buildTableCell(formatPrice(rowProduct.product.unit_price), 'center', styleRow)}
                            {buildTableCell(formatPrice(rowProduct.total), 'center', styleRow)}
                            <IconButton aria-label="delete" color="primary" onClick={() => callbackDelete(index)}>
                                <DeleteIcon />
                            </IconButton>                               
                        </TableRow>            
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    function handleChange(field, value){
        setForm((prev) => { return {...prev, [field]: value} });
    };   
    
    function handleCurrentProduct(field, value) {
        setCurrentProduct((prev) => { return {...prev, [field]: value} });
    };

    function handleCleanCurrentProduct(){
        setCurrentProduct(initialCurrentProduct);
    };

    function handleAddProduct(){
        const product = products.find((_p) => _p.id === currentProduct.product.value);
        
        let newProductList = [...form.products];
        let quantity = currentProduct.quantity;

        newProductList.push({
            product: product, 
            quantity: quantity,
            total: quantity * product.unit_price
        });

        const sumTotal = newProductList.map((_sp) => _sp.total).reduce(
            (accumulator, currentValue) => accumulator + currentValue, 0
        );       
        
        setTotal(sumTotal);

        handleChange('products',  newProductList);
        handleCleanCurrentProduct();
    };

    function handleRemoveProduct(i){
        let newProductList = form.products.filter((_p, index) => index !== i);
        handleChange('products',  newProductList);
    };

    async function handleSave(){
        let payload = {
            customer: form.customer.value,
            seller: form.seller.value,
            register_datetime: formatDate(form.register_datetime, 'yyyy-MM-dd HH:mm:ss'),
            products: form.products.map((_p) => ({
                quantity: parseInt(_p.quantity),
                product: _p.product.id
            }))
        }
        setLoading(true);
        try {
            await fetchNewSale(payload);   
            navToSales();
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    function navToSales(){
        router.goToPage('/sales');
    };
    
    function canBeSubmitted(){
        return(
            form.customer !== '' &&
            form.seller !== '' &&
            form.products.length > 0
        );
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
                    sx={{ flexGrow: 1 }} 
                >
                    Produtos
                </Typography>  
            </div>      
            <div className='row'>
                <div className='col-md-7'>
                    <div className='flex align-items-end'>
                        <div className='col-md-6'>
                            <Select
                                placeholder='Digite o código ou nome do produto'
                                label='Buscar pelo código de barras ou descrição'
                                options={products.map((_c) => {return {value: _c.id, label: _c.description}})}
                                callback={(ev) => handleCurrentProduct('product', ev)}     
                                value={currentProduct.product}                           
                            />                        
                        </div>
                        <div className='col-md-5'>
                            <Input
                                label='Quantidade de itens'
                                placeholder='0'
                                value={currentProduct.quantity}
                                onChange={(ev) => handleCurrentProduct('quantity', ev.target.value)}
                            />                                        
                        </div>
                        <div className='col-md-1'>
                            <Button
                                variant='contained' 
                                className='my-2'
                                disabled={currentProduct.product == '' || currentProduct.quantity === 0}
                                onClick={handleAddProduct}
                            >
                                Adicionar
                            </Button>
                        </div>
                    </div>

                    <TableProducts callbackDelete={handleRemoveProduct}/>
                </div>

                <div className='col-md-1'>
                    <Divider orientation='vertical'/>
                </div>

                <div className='col-md-4 form-right-content'>
                    <div>
                        <div className='flex justify-content-between my-5'>
                            <Typography            
                                variant="h6" 
                                component="div" 
                                sx={{ flexGrow: 1 }} 
                            >
                                Dados da venda
                            </Typography>  
                        </div>
                        <Datepicker
                            label='Data e Hora da Venda'
                            value={form.register_datetime}
                        />
                        <Select
                            currentValue={form.seller}
                            placeholder='Selecione o nome'
                            label='Escolha um vendedor'
                            options={sellers.map((_c) => {return {value: _c.id, label: _c.name}})}
                            value={form.seller}
                            callback={(ev) => handleChange('seller', ev)}
                        />
                        <Select
                            placeholder='Selecione o nome'
                            label='Escolha um cliente'
                            options={customers.map((_c) => {return {value: _c.id, label: _c.name}})}
                            value={form.customer} 
                            callback={(ev) => handleChange('customer', ev)}
                        />      
                    </div>

                    <div className='mx-3'>
                        <div className='flex justify-content-between my-5'>
                            <Typography variant="span"  sx={{ fontWeight: 600 }}>
                                Valor total da venda: 
                            </Typography>             
                            <Typography variant="h5"  sx={{ fontWeight: 600 }}>
                                {formatPrice(total)}
                            </Typography>                                          
                        </div> 
                        <div className='flex justify-content-between'>
                            <Button variant='contained' onClick={navToSales}>
                                Cancelar
                            </Button>
                            <Button 
                                variant='contained' 
                                onClick={handleSave}
                                disabled={!canBeSubmitted()}>
                                {loading ?  <CircularProgress/> : 'Finalizar'}
                            </Button>                        
                        </div> 
                    </div>                
                </div>
            </div>
        </Box>
    );
}

export default SaleForm;