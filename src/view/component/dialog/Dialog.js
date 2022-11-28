import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';

export default function SalesDialog(props) {
    const { title = '', 
            description = '', 
            closeTitle = 'Cancelar',  
            confirmTitle = 'Confirmar', 
            open = false, 
            onClose,
            handleConfirm } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth='sm'
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <Divider/>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined' color='secondary'>{closeTitle}</Button>
                <Button onClick={handleConfirm} variant='contained' color='secondary' autoFocus>
                    {confirmTitle}
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
