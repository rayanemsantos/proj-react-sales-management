import React from 'react';
import { withRouter } from './infrastructure/router/withRouter';

import NavbarWrapper from './view/component/main-drawer/NavbarWrapper';

function Layout(props) {
	const { children  } = props;
	return (
        <div>
            <NavbarWrapper/>
            <main className='main-content offset-header-height'>
                {children}
            </main>
        </div>
	);
}
export default Layout;
