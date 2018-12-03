const Sequelize = require('sequelize')
const sequelize = new Sequelize('graphql_db','arief','arief',{
    operatorsAliases:false,
    dialect:'mysql'
})

const CarModel = sequelize.define('car',{
    car_id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    car_name:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    tableName:'car',
    timestamps:false
})


const CarOwnerModel = sequelize.define('car_owner',{
    owner_id: {
        type:Sequelize.STRING,
        primaryKey:true
    },
    owner_name: {
        type:Sequelize.STRING,
        allowNull:false
    },
    owner_address: {
        type:Sequelize.STRING,
        allowNull:false
    },
    owner_age:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    car_id:{
        type:Sequelize.INTEGER,
        unique:true,
        references:{
            model:'car',
            key:'car_id'
        }
    }
},{
    tableName:'car_owner',
    timestamps:false,
    name:{
        singular:'CarOwner'
    },
})


CarModel.hasOne(CarOwnerModel,{
    foreignKey:'car_id',
    onDelete:'CASCADE'
})
sequelize.sync()

module.exports = {
    CarModel,
    CarOwnerModel
}
