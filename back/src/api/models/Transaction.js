const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('./User');

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - id
 *         - RFC
 *         - folio
 *         - fechaDeRetiro
 *         - estatus
 *         - monto
 *         - comision
 *       properties:
 *         id:
 *           type: integer
 *           description: El identificador único de la transacción.
 *         user_id:
 *           type: integer
 *           description: El identificador único del usuario asociado a la transacción.
 *         rfc:
 *           type: string
 *           description: El RFC del usuario asociado a la transacción.
 *         invoice:
 *           type: string
 *           description: El folio de la transacción.
 *         withdrawalDate:
 *           type: string
 *           format: date
 *           description: La fecha de retiro de la transacción.
 *         status:
 *           type: string
 *           enum:
 *             - PENDING
 *             - FAILED
 *             - COMPLETED
 *           description: El estado de la transacción.
 *         amount:
 *           type: number
 *           format: double
 *           description: El monto de la transacción.
 *         commission:
 *           type: number
 *           format: double
 *           description: La comisión de la transacción.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del registro.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización del registro.
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Fecha de eliminación del registro (solo si es un soft delete).
 *       example:
 *         id: 1
 *         RFC: "FFAL920101IT1"
 *         folio: "AAF23401"
 *         fechaDeRetiro: "2024-03-01"
 *         estatus: "PENDING"
 *         monto: 100.00
 *         comision: 10.00
 */

class Transaccion extends Model { }

Transaccion.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    rfc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    invoice: {
        type: DataTypes.STRING,
        allowNull: false
    },
    withdrawalDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'FAILED', 'COMPLETED'),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    commission: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deletedAt: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true,
    paranoid: true
});

module.exports = Transaccion;
