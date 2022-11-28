import React from 'react';
import {
    BrowserRouter
} from "react-router-dom";
import RoutesManage from './infrastructure/router/routes';
import Layout from './Layout';
import Theme from './resource/style/theme';

const App = () => {
    return (
        <Theme>
            <BrowserRouter>
                <Layout>
                    <RoutesManage/>
                </Layout>
            </BrowserRouter>
        </Theme>
    );
}

export default App;