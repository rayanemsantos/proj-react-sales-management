import React from 'react';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
    IconButton
} from '@mui/material';
import { PointOfSale, ArrowForwardIos, Calculate } from '@mui/icons-material';

import './list-item.scss';

const NavItems = ({ navigate, toggleDrawer }) => {
    const goTo = (path) => {
        toggleDrawer()
        navigate(`${path}`)
    };

    const routes = [
        {
            title: 'Vendas',
            icon: <PointOfSale color='secondary'/>,
            path: '/sales'

        },
        {
            title: 'Comissões',
            icon: <Calculate color='secondary'/>,
            path: '/comissions'
        }
    ];

    const renderListItem = (listItem) => {
        return (
            <ListItem
                button
                key={listItem.title}
                className='list-item'
                onClick={() => goTo(listItem.path)}
                secondaryAction={
                    <IconButton edge="end" aria-label="push">
                        <ArrowForwardIos />
                    </IconButton>
                }                
            >
                <ListItemIcon>
                    {listItem.icon}
                </ListItemIcon>
                <ListItemText color='secondary' primary={listItem.title} />            
            </ListItem>
        );
    };

	return (
        <List dense>
            {routes.map((item) => {
                return (
                    renderListItem(item)
                );
            })}
        </List>
	);
};

export default NavItems;