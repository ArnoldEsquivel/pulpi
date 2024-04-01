import styles from './FilterTransactions.module.scss';
import React, { useState } from 'react';
import TableTransactions from '../components/TableTransactions';
import useTransactions from '../hooks/useTransactions';
import { TableTransactionsProps } from '../utils/interfaces';
import { SelectChangeEvent } from '@mui/material/Select';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
    TextField,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Switch,
    Tooltip
} from '@mui/material';

const FilterTransactions = (ComponenteTabla: React.ComponentType<TableTransactionsProps>) => {
    return () => {
        const [filtro, setFiltro] = useState({
            withdrawalDateStart: '',
            withdrawalDateEnd: '',
            rfc: '',
            invoice: '',
            status: '',
            includeDeleted: false,
        });

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setFiltro((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

        const handleSelectChange = (event: SelectChangeEvent<string>) => {
            const { name, value } = event.target;
            setFiltro((prev) => ({
                ...prev,
                [name as string]: value,
            }));
        }

        const handleIncludeDeleted = () => {
            setFiltro((prev) => ({
                ...prev,
                includeDeleted: !prev.includeDeleted,
            }));
        }

        const deleteFilter = () => {
            setFiltro({
                withdrawalDateStart: '',
                withdrawalDateEnd: '',
                rfc: '',
                invoice: '',
                status: '',
                includeDeleted: false,
            });
        }

        const { transactions, loading, error } = useTransactions(filtro);

        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <h2>Filtros</h2>
                </div>
                <FormGroup className={styles.filter}>
                    <TextField
                        size='small'
                        className={styles.text_field}
                        label="Fecha de inicio"
                        type="date"
                        name="withdrawalDateStart"
                        value={filtro.withdrawalDateStart}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: '10rem' }}
                    />
                    <TextField
                        size='small'
                        className={styles.text_field}
                        label="Fecha de fin"
                        type="date"
                        name="withdrawalDateEnd"
                        value={filtro.withdrawalDateEnd}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: '10rem' }}
                    />
                    <TextField
                        size='small'
                        className={styles.text_field}
                        label="RFC"
                        placeholder="FFAL92010IT1"
                        name="rfc"
                        value={filtro.rfc}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: '10rem' }}
                    />
                    <TextField
                        size='small'
                        className={styles.text_field}
                        label="Folio"
                        placeholder="AAF00000"
                        name="invoice"
                        value={filtro.invoice}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: '10rem' }}
                    />
                    <FormControl>
                        <InputLabel>Estatus</InputLabel>
                        <Select
                            size='small'
                            name="status"
                            value={filtro.status}
                            onChange={handleSelectChange}
                            label="Estatus"
                            sx={{ width: '9rem' }}
                        >
                            <MenuItem value="PENDING">Pendiente</MenuItem>
                            <MenuItem value="FAILED">Fallida</MenuItem>
                            <MenuItem value="COMPLETED">Completada</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        value={filtro.includeDeleted}
                        control={<Switch color="success" />}
                        label="Incluir eliminadas"
                        labelPlacement="top"
                        onChange={handleIncludeDeleted}
                        className={styles.switch}
                    />
                    <Tooltip title="Borrar filtros" placement="bottom">
                        <IconButton onClick={deleteFilter} color='error'>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Tooltip>
                </FormGroup>
                <div className={styles.table_container}>
                    <div className={styles.table}>
                        {
                            loading
                                ? <p>Cargando</p>
                                : error
                                    ? <p>Woops! Algo salió mal, por favor borra los filtros</p>
                                    : transactions.length === 0
                                        ? <p>No hay transacciones con esos filtros, prueba otra combinación</p>
                                        : <ComponenteTabla transactions={transactions} />
                        }
                    </div>
                </div>
            </div>
        );
    };
}

export default FilterTransactions(TableTransactions);
