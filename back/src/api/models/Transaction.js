const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaccion:
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
 *         RFC:
 *           type: string
 *           description: El RFC del usuario asociado a la transacción.
 *         folio:
 *           type: string
 *           description: El folio de la transacción.
 *         fechaDeRetiro:
 *           type: string
 *           format: date
 *           description: La fecha de retiro de la transacción.
 *         estatus:
 *           type: string
 *           enum:
 *             - PENDING
 *             - FAILED
 *             - COMPLETED
 *           description: El estado de la transacción.
 *         monto:
 *           type: number
 *           format: double
 *           description: El monto de la transacción.
 *         comision:
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
    RFC: {
        type: DataTypes.STRING,
        allowNull: false
    },
    folio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaDeRetiro: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    estatus: {
        type: DataTypes.ENUM('PENDING', 'FAILED', 'COMPLETED'),
        allowNull: false
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    comision: {
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
        allowNull: false
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
