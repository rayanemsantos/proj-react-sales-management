import React, { useState } from 'react';
import {
	Box,
	SwipeableDrawer,
} from '@mui/material';
import NavItems from './NavItems';
import Header from '../header/Header';
import './main-drawer.scss';
import { useNavigate } from 'react-router-dom';

const NavbarWrapper = () => {
	const navigate = useNavigate();
	const drawerWidth = 273;
	const [open, setOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState('');

    const toggleDrawer = () => {
		setOpen(!open);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			
			<Header toggleDrawer={toggleDrawer} currentPage={currentPage}/>

			<SwipeableDrawer
				anchor='left'
				open={open}
				onOpen={null}
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
				<NavItems 
					navigate={navigate} 
					toggleDrawer={toggleDrawer}
					onChangePage={setCurrentPage}
				/>										
			</SwipeableDrawer>			
	  </Box>			
	);
};

export default NavbarWrapper;