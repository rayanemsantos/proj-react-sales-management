export default {
    MuiButton: {
        defaultProps:{
            disableElevation: true,
        }
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.12)'
            }
        }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
            }
        }
    }
};
