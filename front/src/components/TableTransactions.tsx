import styles from './TableTransactions.module.scss';
import React from 'react';
import { TableTransactionsProps } from '../utils/interfaces';
import EditTransaction from './EditTransaction';
import DeleteTransaction from './DeleteTransaction';
import CreateTransaction from './CreateTransaction';
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
                        <TableCell sx={{ width: "1rem" }} className={styles.header_table}>
                            <CreateTransaction />
                        </TableCell>
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
                        <TableCell align="center" className={styles.header_table}>
                            Monto
                        </TableCell>
                        <TableCell align="center" className={styles.header_table}>
                            Comisión
                        </TableCell>
                        <TableCell align="left" className={styles.header_table}>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row" align="center">
                                {index + 1}
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
                            <TableCell align="center">
                                {transaction.amount}
                            </TableCell>
                            <TableCell align="center">
                                {transaction.commission}
                            </TableCell>
                            <TableCell sx={{ padding: '0', width: '5rem' }}>
                                {
                                    transaction.deletedAt
                                        ? <span style={{ color: "red" }}>Eliminado</span>
                                        : <>
                                            <EditTransaction transaction={transaction} />
                                            <DeleteTransaction transaction={transaction} />
                                        </>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TablaTransacciones;
