const {
    getAllTransactions,
    getAllTransactionsWithUsers,
    createTransaction,
    updateTransaction,
    deleteTransaction
} = require('../api/controllers/transactionController');

const transactionService = require('../api/services/transactionService');

jest.mock('../api/services/transactionService', () => ({
    getAll: jest.fn(),
    getAllWithUsers: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
}));

describe('Transaction Controllers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getAllTransactions calls transactionService.getAll and returns data', async () => {
        const mockReq = { query: {} };
        const mockRes = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };
        const mockTransactions = [{ id: 1, rfc: 'FFAL920101IT1' }];

        transactionService.getAll.mockResolvedValue(mockTransactions);

        await getAllTransactions(mockReq, mockRes);

        expect(transactionService.getAll).toHaveBeenCalledWith({});
        expect(mockRes.json).toHaveBeenCalledWith(mockTransactions);
    });

    test('getAllTransactionsWithUsers calls transactionService.getAllWithUsers and returns data', async () => {
        const mockReq = {};
        const mockRes = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };
        const mockTransactions = [{ id: 1, rfc: 'FFAL920101IT1', user: { id: 1, name: 'Arnold' } }];

        transactionService.getAllWithUsers.mockResolvedValue(mockTransactions);

        await getAllTransactionsWithUsers(mockReq, mockRes);

        expect(transactionService.getAllWithUsers).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalledWith(mockTransactions);
    });

    test('createTransaction creates a new transaction and returns the transaction', async () => {
        const mockReq = { body: { user_id: 1, amount: 100 } };
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };
        const mockNewTransaction = { id: 2, rfc: 'FFAL920101IT1', amount: 100 };

        transactionService.create.mockResolvedValue(mockNewTransaction);

        await createTransaction(mockReq, mockRes);

        expect(transactionService.create).toHaveBeenCalledWith(mockReq.body);
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(mockNewTransaction);
    });

    test('updateTransaction updates a transaction and returns the updated transaction', async () => {
        const mockReq = { params: { id: 1 }, body: { amount: 200 } };
        const mockRes = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };
        const mockUpdatedTransaction = { id: 1, rfc: 'FFAL920101IT1', amount: 200 };

        transactionService.update.mockResolvedValue(mockUpdatedTransaction);

        await updateTransaction(mockReq, mockRes);

        expect(transactionService.update).toHaveBeenCalledWith(1, mockReq.body);
        expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedTransaction);
    });

    test('deleteTransaction deletes a transaction and returns success', async () => {
        const mockReq = { params: { id: 1 } };
        const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        transactionService.delete.mockResolvedValue({});

        await deleteTransaction(mockReq, mockRes);

        expect(transactionService.delete).toHaveBeenCalledWith(1);
        expect(mockRes.status).toHaveBeenCalledWith(204);
        expect(mockRes.send).toHaveBeenCalled();
    });

});
