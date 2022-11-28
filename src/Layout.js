import React from 'react';
import NavbarWrapper from './view/component/main-drawer/NavbarWrapper';

function Layout(props) {
	const { children  } = props;

	return (
            <div>
                <NavbarWrapper/>
                {children}
            </div>
	);
}
export default Layout;
