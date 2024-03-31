// USERS
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     description: Fetches a list of all users.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/transactions:
 *   get:
 *     summary: Retrieve users for transactions filtering (this to follow the principle of least privilege)
 *     tags: [Users]
 *     description: Fetches a list of users with attributes relevant for transactions.
 *     responses:
 *       200:
 *         description: A list of users with specific attributes for transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the user.
 *                   name:
 *                     type: string
 *                     description: The name of the user.
 *                   rfc:
 *                     type: string
 *                     description: The Federal Taxpayers Registry code of the user.
 *                   status:
 *                     type: string
 *                     enum: [ACTIVE, LOCKED]
 *                     description: The status of the user, can be active or locked.
 */

// TRANSACTIONS
/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Retrieve all transactions with optional filters
 *     tags: [Transactions]
 *     description: Fetches a list of all transactions. Supports filtering.
 *     parameters:
 *       - in: query
 *         name: includeDeleted
 *         schema:
 *           type: boolean
 *           required: false
 *           description: Include deleted transactions in the result
 *       - in: query
 *         name: withdrawalDateStart
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date for withdrawal date filter
 *       - in: query
 *         name: withdrawalDateEnd
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for withdrawal date filter
 *       - in: query
 *         name: rfc
 *         schema:
 *           type: string
 *         required: false
 *         description: RFC to filter transactions
  *       - in: query
 *         name: invoice
 *         schema:
 *           type: string
 *         required: false
 *         description: Invoice number to filter transactions
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: false
 *         description: Transaction status to filter by
 *         possible values: [pending, completed]
 *     responses:
 *       200:
 *         description: A list of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /transactions/users:
 *   get:
 *     summary: Retrieve all transactions with user details
 *     tags: [Transactions]
 *     description: Fetches a list of all transactions including the details of the associated users.
 *     responses:
 *       200:
 *         description: A list of transactions with user details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     description: Creates a new transaction with the given body content.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: The created transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /transactions/{id}:
 *   patch:
 *     summary: Update an existing transaction
 *     tags: [Transactions]
 *     description: Updates the details of an existing transaction. Only transactions with status PENDING can be updated.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               amount:
 *                 type: number
 *               commission:
 *                 type: number
 *     responses:
 *       200:
 *         description: The updated transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     description: Deletes a transaction by ID. This is a soft delete operation.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The transaction ID to delete
 *     responses:
 *       204:
 *         description: The transaction was successfully deleted
 */
/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Retrieve all transactions with optional filters
 *     tags: [Transactions]
 *     description: Fetches a list of all transactions. Supports filtering.
 *     parameters:
 *       - in: query
 *         name: includeDeleted
 *         schema:
 *           type: boolean
 *           required: false
 *           description: Include deleted transactions in the result
 *       - in: query
 *         name: withdrawalDateStart
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date for withdrawal date filter
 *       - in: query
 *         name: withdrawalDateEnd
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for withdrawal date filter
 *       - in: query
 *         name: rfc
 *         schema:
 *           type: string
 *         required: false
 *         description: RFC to filter transactions
  *       - in: query
 *         name: invoice
 *         schema:
 *           type: string
 *         required: false
 *         description: Invoice number to filter transactions
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: false
 *         description: Transaction status to filter by
 *         possible values: [pending, completed]
 *     responses:
 *       200:
 *         description: A list of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /transactions/users:
 *   get:
 *     summary: Retrieve all transactions with user details
 *     tags: [Transactions]
 *     description: Fetches a list of all transactions including the details of the associated users.
 *     responses:
 *       200:
 *         description: A list of transactions with user details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     description: Creates a new transaction with the given body content.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: The created transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /transactions/{id}:
 *   patch:
 *     summary: Update an existing transaction
 *     tags: [Transactions]
 *     description: Updates the details of an existing transaction. Only transactions with status PENDING can be updated.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               amount:
 *                 type: number
 *               commission:
 *                 type: number
 *     responses:
 *       200:
 *         description: The updated transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     description: Deletes a transaction by ID. This is a soft delete operation.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The transaction ID to delete
 *     responses:
 *       204:
 *         description: The transaction was successfully deleted
 */
