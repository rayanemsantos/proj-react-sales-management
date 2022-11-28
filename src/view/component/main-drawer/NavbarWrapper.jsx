import React, { useState } from 'react';
import {
	Box,
	SwipeableDrawer,
} from '@mui/material';
import NavItems from './NavItems';
import Header from '../header/Header';
import './main-drawer.scss';

const NavbarWrapper = () => {
	const drawerWidth = 273;
	const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
		setOpen(!open);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			
			<Header toggleDrawer={toggleDrawer}/>
			
			<SwipeableDrawer
				anchor='left'
				open={open}
				onClose={toggleDrawer}
				BackdropProps={{ invisible: true }}
				PaperProps={{
					sx: { 
						width: drawerWidth,
						paddingTop: 10,
					},
					className: 'main-drawer'
				}}
			>				
				<NavItems/>										
			</SwipeableDrawer>			
	  </Box>			
	);
};

export default NavbarWrapper;