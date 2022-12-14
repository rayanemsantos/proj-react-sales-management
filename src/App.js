import React from 'react';
import {
    BrowserRouter
} from "react-router-dom";
import RoutesManage from './infrastructure/router/routes';
import Layout from './Layout';
import Theme from './resource/style/theme';

import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const App = () => {
    return (
        <Theme>
            <BrowserRouter>
                <Layout>
                    <RoutesManage/>
                    <ToastContainer
                        closeOnClick
                        draggable
                        newestOnTop
                        hideProgressBar
                        autoClose={5000}
                        transition={Zoom}
                        position='bottom-right'
                        theme='colored'
                    />      
                </Layout>
            </BrowserRouter>
        </Theme>
    );
}

export default App;