import React, {useState, useEffect} from 'react';
import { Button, Typography, Divider } from '@mui/material';
import { CircularProgress} from '@mui/material';
import { Box } from '@mui/material';
import Select from '../../component/input-select/Select';
import Datepicker from '../../component/input-datepicker/Datepicker';
import Input from '../../component/input/Input';
import { formatPrice } from '../../../application/util/moneyUtil';
import dateUtil from '../../../application/util/dateUtil';
import { fetchCustomer } from '../../../services/customer.service';
import { fetchSeller } from '../../../services/seller.service';
import { fetchProducts } from '../../../services/product.service';
import { fetchNewSale, fetchSaveSale, fetchSale } from '../../../services/sales.service';
import useRouter from '../../../application/hook/useRouter';
import SalesTable from '../../component/table/Table';

import './sales.scss'
import feedbackService from '../../../application/service/feedbackService';

function SaleForm() {
    const styleRowProduct = { border: 0 };
    const router = useRouter();
    const { id } = router.params;
    const isEditing = id !== 'new';
    const formatDate = dateUtil.formatDate;

    const headerList = [
        {
            field: 'description',
            nested: 'product.description',
            align: 'left',
            label: 'Produtos/Serviço',
            style: styleRowProduct
        },
        {
            field: 'quantity',
            align: 'center',
            label: 'Quantidade',
            style: styleRowProduct
        },  
        {
            field: 'unit_price',
            nested: 'product.unit_price',
            align: 'center',
            label: 'Preço unitário',
            format: 'price',
            style: styleRowProduct
        }, 
        {
            field: 'total',
            align: 'center',
            label: 'Total',
            format: 'price',
            style: styleRowProduct
        }, 
        { label: '', align: 'center', style: styleRowProduct },                       
    ];

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
        handleSelectOptions();
        if (id !== 'new'){
            fetchSale(id).then((res) => {
                setForm({
                    ...res,
                    customer: {label: res.customer.name, value: res.customer.id},
                    seller: {label: res.seller.name, value: res.seller.id},
                    products: res.sale_products,
                });
                setTotal(res.total);
            })
        }
    }, [router.params]);

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

        calculateTotal(newProductList);

        handleChange('products',  newProductList);
        handleCleanCurrentProduct();
    };

    function calculateTotal(newProductList){
        const sumTotal = newProductList.map((_sp) => parseFloat(_sp.total)).reduce(
            (accumulator, currentValue) => accumulator + currentValue, 0
        );       
        
        setTotal(sumTotal);
    };

    function handleRemoveProduct(i){
        let newProductList = form.products.filter((_p, index) => index !== i);
        calculateTotal(newProductList);
        handleChange('products',  newProductList);
    };

    async function handleSave(){
        let newProducts = form.products.filter(_p => _p.id === '').map((_p) => ({
            quantity: parseInt(_p.quantity),
            product: _p.product.id
        }));

        let products = form.products.filter(_p => _p.id !== '').map((_p) => ({
            id: _p.id,
            quantity: _p.quantity,
            product: _p.product.id
        }));

        let payload = {
            customer: form.customer.value,
            seller: form.seller.value,
            products: [...newProducts, ...products]
        }
        if (!isEditing){
            payload['register_datetime'] = formatDate(form.register_datetime, 'yyyy-MM-dd HH:mm:ss')
        }
        setLoading(true);
        try {
            isEditing ? await fetchSaveSale(form.id, payload) : await fetchNewSale(payload)
            setTimeout(() => {
                setLoading(false);
                navToSales();
                isEditing ? feedbackService.showSuccessMessage('Venda alterada com sucesso') : feedbackService.showSuccessMessage('Venda registrada com sucesso')
            }, 1500);            
        } catch (error) {
            console.log(error)
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
                margin: { sm: 5},
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
                <div className='col-md-7 col-12'>
                    <div className='flex align-items-end'>
                        <div className='row align-items-end'>
                            <div className='col-md-6 col-12'>
                                <Select
                                    placeholder='Digite o código ou nome do produto'
                                    label='Buscar pelo código de barras ou descrição'
                                    options={products.map((_c) => {return {value: _c.id, label: _c.description}})}
                                    callback={(ev) => handleCurrentProduct('product', ev)}     
                                    value={currentProduct.product}                           
                                />                        
                            </div>
                            <div className='col-md-4 col-12'>
                                <Input
                                    label='Quantidade de itens'
                                    placeholder='0'
                                    type="number"
                                    value={currentProduct.quantity}
                                    onChange={(ev) => handleCurrentProduct('quantity', ev.target.value)}
                                />                                        
                            </div>
                            <div className='col-md-2 col-6'>
                                <Button
                                    variant='contained' 
                                    className='my-2'
                                    disabled={currentProduct.product == '' || currentProduct.quantity == 0}
                                    onClick={handleAddProduct}
                                    fullWidth
                                >
                                    Adicionar
                                </Button>
                            </div>
                        </div>
                    </div>

                    {
                        form && (
                            <SalesTable 
                                headers={headerList} 
                                data={form.products}
                                callbackDelete={handleRemoveProduct}
                            />       
                        )
                    }
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
                            actionDateSelect={(ev) => handleChange('register_datetime', ev)}
                            disableOpenPicker
                            isDatetime
                            disabled={isEditing}
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
                                {loading ?  <CircularProgress size={20}/> : 'Finalizar'}
                            </Button>                        
                        </div> 
                    </div>                
                </div>
            </div>
        </Box>
    );
}

export default SaleForm;