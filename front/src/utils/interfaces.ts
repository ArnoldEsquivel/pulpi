export interface IUser {
    id: number;
    rfc: string;
    name: string;
    last_name: string;
    status: 'ACTIVE' | 'LOCKED';
    createdAt: Date | string;
    updatedAt: Date | string | null;
    deletedAt: Date | string | null;
}

export interface ITransaction {
    id: number;
    user_id: number;
    rfc: string;
    invoice: string;
    withdrawalDate: Date | string;
    status: 'PENDING' | 'FAILED' | 'COMPLETED';
    amount: number;
    commission: number;
    createdAt: Date | string;
    updatedAt: Date | string | null;
    deletedAt: Date | string | null;
}

export interface TransactionFilter {
    withdrawalDateStart?: string;
    withdrawalDateEnd?: string;
    rfc?: string;
    invoice?: string;
    status?: string;
    includeDeleted?: boolean;
}

export interface TableTransactionsProps {
    transactions: ITransaction[];
}