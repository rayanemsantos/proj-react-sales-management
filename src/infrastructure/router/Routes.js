import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SaleForm from '../../view/page/sales/SaleForm';
import Sales from '../../view/page/sales/Sales';

const RoutesManage = () => {
	const routeList = [
		{
			path: '/',
			exact: true,
			component: <SaleForm/>,
		},			
		{
			path: '/sales',
			exact: true,
			component: <Sales/>,
		},	  
		{
			path: '/sale/:id',
			exact: true,
			component: <SaleForm/>,
		},		  
		{
			path: '/commissions',
			exact: true,
			component: <></>,
		},
	];
    return (
		<Routes>
			{routeList?.map((route, index) => (
				<Route
					key={route.path + index}
					exact={!!route.exact}
					path={route.path}
					element={route.component}
				/>
			))}
		</Routes>
    );
};

export default RoutesManage;
