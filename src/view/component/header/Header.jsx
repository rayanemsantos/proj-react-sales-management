import React from 'react';
import {
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderNavBarBrand from './HeaderNavBarBrand';
import './header.scss';

const Header = ({toggleDrawer, currentPage = 'Vendas'}) => {
	return (
        <AppBar 
            position='absolute'
            sx={{
                zIndex:'9999'
            }}			
        >
        <Toolbar className='app-main-header'>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer}
                className='header-toggle-button'
            >
                <MenuIcon color='primary'/>
            </IconButton>
            
            <HeaderNavBarBrand/>            

            <Typography 
                variant="h5" 
                component="div" 
                sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }} 
                color='primary'
                className='header-title'
            >
                {currentPage}
            </Typography>

        </Toolbar>
    </AppBar>		
	);
};

export default Header;