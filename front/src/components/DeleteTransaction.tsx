import styles from './DeleteTransaction.module.scss';
import { useState } from 'react';
import { ModalTransactionProps } from '../utils/interfaces';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
    Box,
    Button,
    IconButton,
    Modal,
    Tooltip
} from '@mui/material/';

const EditTransaction: React.FC<ModalTransactionProps> = ({ transaction }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteTransaction = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/transactions/${transaction.id}`);
            handleClose();
            document.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Tooltip title='Eliminar Transaccion' arrow>
                <IconButton
                    onClick={handleOpen}
                    color='error'
                    disabled={transaction.deletedAt !== null}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.paper}>
                    <h2>Eliminar Transaccion</h2>
                    <p>
                        Estas seguro de eliminar la transaccion con folio <b>{transaction.invoice}</b>?
                    </p>
                    <div className={styles.buttons}>
                        <Button onClick={handleClose} variant='outlined' color='success'>
                            Cancelar
                        </Button>
                        <Button onClick={deleteTransaction} variant='contained' color='error'>
                            Eliminar
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default EditTransaction;