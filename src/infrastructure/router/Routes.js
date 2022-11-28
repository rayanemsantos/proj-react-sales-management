import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sales from '../../view/page/sales/Sales';

const RoutesManage = () => {
	const routeList = [
		{
			path: '/',
			exact: true,
			component: <Sales/>,
		},
		{
			path: '/sales',
			exact: true,
			component: <Sales/>,
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
