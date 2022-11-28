export default {
    MuiButton: {
        defaultProps:{
            disableElevation: true,
        },
        styleOverrides:{
            root: {
                textTransform: 'initial',
                fontWeight: 600,
            }
        }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                boxShadow: 'none'
            }
        },
    },    
    MuiAppBar: {
        styleOverrides: {
            root: {
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.12)'
            }
        }
    },
    MuiTableCell: {
        styleOverrides:{
            root: {
                borderBottom: '1px solid #888888',
                "&.MuiTableCell-head": {
                    fontWeight: 600,
                },                
            }
        },
    },  
    // MuiPaper: {
    //     styleOverrides: {
    //         root: {
    //             boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    //         }
    //     }
    // }
};
