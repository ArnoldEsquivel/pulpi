const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - id
 *         - RFC
 *         - nombre
 *         - apellidos
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: El identificador único del usuario.
 *         RFC:
 *           type: string
 *           description: El Registro Federal de Contribuyentes del usuario.
 *         nombre:
 *           type: string
 *           description: El nombre del usuario.
 *         apellidos:
 *           type: string
 *           description: Los apellidos del usuario.
 *         status:
 *           type: string
 *           enum:
 *             - ACTIVE
 *             - LOCKED
 *           description: El estado del usuario, puede ser activo o bloqueado.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: La fecha y hora en que se creó el registro del usuario.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: La fecha y hora de la última actualización del registro del usuario.
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: La fecha y hora en que se eliminó el registro del usuario, si aplica.
 *       example:
 *         id: 1
 *         RFC: "FFAL920101HDFABC01"
 *         nombre: "Juan"
 *         apellidos: "Pérez López"
 *         status: "ACTIVE"
 *         createdAt: "2024-01-01T10:00:00.000Z"
 *         updatedAt: "2024-01-02T15:00:00.000Z"
 *         deletedAt: null
 */

class Usuario extends Model { }

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    RFC: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'LOCKED'),
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
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    paranoid: true
});

module.exports = Usuario;