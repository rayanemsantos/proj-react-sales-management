import React from 'react';
import Button from '@mui/material/Button';

function Layout(props) {
	const { children  } = props;

	return (
            <div>
                <Button variant="contained">Contained</Button>
                {children}
            </div>
	);
}
export default Layout;
