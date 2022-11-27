import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import components from './theme/components';

const themeName = 'sales-management';

const palette = {
	primary: { main: '#00585E' },
	secondary: { main: '#2B7D83' },
	default: { main: '#00585E' },
}

const theme = createTheme({ themeName, palette, components })

export default function Theme({ children }) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
