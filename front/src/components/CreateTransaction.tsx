import styles from './CreateTransaction.module.scss';
import { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { UserSelect } from '../utils/interfaces';
import {
    Box,
    Button,
    IconButton,
    Modal,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    TextField,
    Tooltip
} from '@mui/material/';

const CreateTransaction = () => {
    const [open, setOpen] = useState(false);
    const [transaction, setTransaction] = useState({
        user_id: 0,
        rfc: '',
        withdrawalDate: new Date().toISOString().split('T')[0],
        amount: null as number | null,
        commission: null as number | null,
        status: 'PENDING',
    });
    const [users, setUsers] = useState<UserSelect[]>([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users/transactions');
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUsers();
    }, []);

    const handleUserChange = (user: UserSelect) => {
        setTransaction((prev) => ({
            ...prev,
            user_id: user.id,
            rfc: user.rfc,
        }));
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTransaction((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const createTransaction = async () => {
        try {
            await axios.post('http://localhost:3000/api/transactions', transaction);
            handleClose();
            document.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Tooltip title='Agregar Transaccion' arrow>
                <IconButton
                    onClick={handleOpen}
                    color='success'
                >
                    <AddCircleIcon />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.paper}>
                    <h2>Crear Transaccion</h2>
                    <FormControl className={styles.form}>
                        <FormControl size='small' sx={{ width: '9rem' }}>
                            <InputLabel>Usuario</InputLabel>
                            <Select
                                size='small'
                                name="user"
                                label="Estatus"
                                defaultValue={0}
                            >
                                <MenuItem value={0} disabled><em>Seleccionar</em></MenuItem>
                                {users.map((user, index) => (
                                    <MenuItem
                                        onClick={() => handleUserChange(user)}
                                        key={index}
                                        value={index + 1}
                                        disabled={user.status === 'LOCKED'}
                                    >
                                        {user.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                    </FormControl>
                    <div className={styles.buttons}>
                        <Button onClick={handleClose} variant='outlined' color='error'>
                            Cancelar
                        </Button>
                        <Button onClick={createTransaction} variant='contained' color='success'>
                            Crear
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default CreateTransaction;