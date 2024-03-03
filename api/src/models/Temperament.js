const { DataTypes} = require('sequelize');

module.exports = (sequalize) => {

    sequalize.define('temperament', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        }

    },{timestamps: false})
}