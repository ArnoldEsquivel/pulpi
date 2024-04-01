import styles from './TableTransactions.module.scss';
import React from 'react';
import { TableTransactionsProps } from '../utils/interfaces';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

const TablaTransacciones: React.FC<TableTransactionsProps> = ({ transactions }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="tabla de transacciones">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: "1rem" }} className={styles.header_table}></TableCell>
                        <TableCell align="left" className={styles.header_table}>
                            RFC
                        </TableCell>
                        <TableCell align="left" className={styles.header_table}>
                            Folio
                        </TableCell>
                        <TableCell align="left" className={styles.header_table}>
                            Fecha de retiro
                        </TableCell>
                        <TableCell align="left" className={styles.header_table}>
                            Estatus
                        </TableCell>
                        <TableCell align="left" className={styles.header_table}>
                            Monto
                        </TableCell>
                        <TableCell align="left" className={styles.header_table}>
                            Comisión
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell component="th" scope="row">
                                {transaction.id}
                            </TableCell>
                            <TableCell align="left">
                                {transaction.rfc}
                            </TableCell>
                            <TableCell align="left">
                                {transaction.invoice}
                            </TableCell>
                            <TableCell align="left">
                                {String(transaction.withdrawalDate)}
                            </TableCell>
                            <TableCell align="left">
                                {transaction.status}
                            </TableCell>
                            <TableCell align="left">
                                {transaction.amount}
                            </TableCell>
                            <TableCell align="left">
                                {transaction.commission}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TablaTransacciones;
