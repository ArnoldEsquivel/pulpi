import styles from './EditTransaction.module.scss';
import { useState } from 'react';
import { ModalTransactionProps } from '../utils/interfaces';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import {
    Box,
    Button,
    IconButton,
    Modal,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    SelectChangeEvent,
    TextField,
    Tooltip
} from '@mui/material/';

const EditTransaction: React.FC<ModalTransactionProps> = ({ transaction }) => {
    const [open, setOpen] = useState(false);
    const [transactionData, setTransactionData] = useState({});
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTransactionData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setTransactionData((prev) => ({
            ...prev,
            [name as string]: value,
        }));
    }

    const updateTransaction = async () => {
        try {
            await axios.patch(`http://localhost:3000/api/transactions/${transaction.id}`, transactionData);
            handleClose();
            document.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Tooltip title='Editar Transaccion' arrow>
                <IconButton
                    onClick={handleOpen}
                    color='success'
                    disabled={transaction.status === 'COMPLETED' || transaction.deletedAt !== null}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.paper}>
                    <h2>Editar Transaccion</h2>
                    <FormControl className={styles.form}>
                        <TextField
                            size='small'
                            className={styles.text_field}
                            label="Monto"
                            type="number"
                            name="amount"
                            defaultValue={transaction.amount}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: '9rem' }}
                        />
                        <TextField
                            size='small'
                            className={styles.text_field}
                            label="Comision"
                            type="number"
                            name="commission"
                            defaultValue={transaction.commission}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: '9rem' }}
                        />
                        <FormControl size='small' sx={{ width: '9rem' }}>
                            <InputLabel>Estatus</InputLabel>
                            <Select
                                size='small'
                                name="status"
                                defaultValue={transaction.status}
                                onChange={handleSelectChange}
                                label="Estatus"
                            >
                                <MenuItem value="PENDING">Pendiente</MenuItem>
                                <MenuItem value="FAILED">Fallida</MenuItem>
                                <MenuItem value="COMPLETED">Completada</MenuItem>
                            </Select>
                        </FormControl>
                    </FormControl>
                    <div className={styles.buttons}>
                        <Button onClick={handleClose} variant='outlined' color='error'>
                            Cancelar
                        </Button>
                        <Button onClick={updateTransaction} variant='contained' color='success'>
                            Guardar
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default EditTransaction;