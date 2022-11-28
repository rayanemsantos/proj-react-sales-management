import React from 'react';
import { createTheme, ThemeProvider, CssBaseline, StyledEngineProvider } from '@mui/material';
import components from './theme/components';
import './theme.scss';

const themeName = 'sales-management';

const palette = {
	primary: { main: '#00585E' },
	secondary: { main: '#2B7D83' },
	default: { main: '#00585E' },
	custom: { danger: '#BE0000'}
}

const theme = createTheme({ themeName, palette, components })

export default function Theme({ children }) {
	return (
		<ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
                <CssBaseline />			
				{children}
			</StyledEngineProvider>
		</ThemeProvider>
	)
}
