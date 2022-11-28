import React from 'react';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SalesList = () => {
    
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    };

    const headers = [
        { title: 'Nota Fiscal' },
        { title: 'Cliente' },
        { title: 'Vendedor' },
        { title: 'Data da Venda', align: 'center' },
        { title: 'Valor Total', align: 'center' },
        { title: 'Opções', align: 'center' },
    ];

    const rows = [
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
        createData('00001005', 'Jorge Lacerda dos Santos', 'Regina Souza', '19/10/2022 - 14:25', 'R$ 71,10'),
    ];

    const renderHeaderTitles = ({title, align = 'left'}) => {
        return (
            <TableCell align={align}>{title}</TableCell>
        );
    };

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
                <TableRow>
                    {headers.map((_header) => {
                        return (
                            renderHeaderTitles(_header)
                        )
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (
                <TableRow key={index}>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.calories}</TableCell>
                    <TableCell align="left">{row.fat}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">{row.protein}</TableCell>
                    <TableCell align="center">
                        <Button variant="text">Ver mais</Button>
                        <IconButton aria-label="edit" color="primary">
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="primary">
                            <DeleteIcon />
                        </IconButton>                                                                
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    );
}

export default SalesList;