import { useState, useEffect, useCallback } from 'react';
import { ITransaction, TransactionFilter } from '../utils/interfaces';
import axios from 'axios';
import debounce from 'lodash.debounce';

const useTransactions = (filters?: TransactionFilter) => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Here we create a debounced to avoid making a request every time the user types something
    const debouncedFetchTransactions = useCallback(debounce(async (filters: TransactionFilter) => {
        setLoading(true);
        try {
            const response = await axios.get<ITransaction[]>(
                'http://localhost:3000/api/transactions',
                { params: filters }
            );
            setTransactions(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err as Error);
            } else {
                setError(new Error('An unknown error occurred'));
            }
        } finally {
            setLoading(false);
        }
    }, 600), []);

    useEffect(() => {
        debouncedFetchTransactions(filters || {});
    }, [filters, debouncedFetchTransactions]);

    return { transactions, loading, error };
};

export default useTransactions;
