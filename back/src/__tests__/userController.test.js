const { getAllUsers, getUsersForTransactions } = require('../api/controllers/userController');
const userService = require('../api/services/userService');

jest.mock('../api/services/userService', () => ({
    getAll: jest.fn(),
    getForTransations: jest.fn()
}));

describe('User Controllers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getAllUsers calls userService.getAll and returns all users', async () => {
        const mockReq = {};
        const mockRes = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };
        const mockUsers = [
            { id: 1, name: "Arnold", rfc: "FFAL920101HDFABC01", status: "ACTIVE" }
        ];

        userService.getAll.mockResolvedValue(mockUsers);

        await getAllUsers(mockReq, mockRes);

        expect(userService.getAll).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
    });

    test('getAllUsers handles errors correctly', async () => {
        const mockReq = {};
        const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const errorMessage = 'Error fetching users';

        userService.getAll.mockRejectedValue(new Error(errorMessage));

        await getAllUsers(mockReq, mockRes);

        expect(userService.getAll).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith(errorMessage);
    });

    test('getUsersForTransactions calls userService.getForTransations and returns specific user data', async () => {
        const mockReq = {};
        const mockRes = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };
        const mockUsers = [
            { id: 1, name: "Arnold", rfc: "FFAL920101HDFABC01", status: "ACTIVE" }
        ];

        userService.getForTransations.mockResolvedValue(mockUsers);

        await getUsersForTransactions(mockReq, mockRes);

        expect(userService.getForTransations).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
    });

    test('getUsersForTransactions handles errors correctly', async () => {
        const mockReq = {};
        const mockRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const errorMessage = 'Error fetching users for transactions';

        userService.getForTransations.mockRejectedValue(new Error(errorMessage));

        await getUsersForTransactions(mockReq, mockRes);

        expect(userService.getForTransations).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith(errorMessage);
    });
});