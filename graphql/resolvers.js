const uniqid = require('uniqid')

module.exports = {
    Car:{
        carId(obj) {
            return obj.car_id
        },
        carName(obj){
            return obj.car_name
        },
        carOwner(obj, _ , {dataSources}){
            return dataSources.carDb.getCarOwner(obj.car_id)
        }
    },
    Owner:{
        ownerId(obj){
            return obj.owner_id
        },
        ownerName(obj){
            return obj.owner_name
        },
        ownerAddress(obj){
            return obj.owner_address
        },
        ownerAge(obj){
            return obj.owner_age
        },
        ownerCar(obj , _ , {dataSources}){
            return dataSources.carDb.getCar(obj.car_id)
        }
    },
    Query:{ 
        async allOwner(_ , __ , {CarOwnerModel}){
            return CarOwnerModel.findAll()
        },
        async allCar(_ , __ , ctx){
            const listCar = await ctx.dataSources.carDb.listCar()
            return listCar
        },
        async findCar(_ , {carId} , ctx){
            const getCar = await ctx.dataSources.carDb.getCar(carId)
            return getCar
        }
    },
    Mutation:{ 
        async saveCar(_ , {carInput} , ctx) {
            const saveCar = await ctx.dataSources.carDb.saveCar(carInput.carName)
            return saveCar
        },
        async setCarOwner(_ , {carId, ownerId} , {dataSources}){
            return dataSources.carDb.setCarOwner(carId , ownerId)
        },
        async saveOwner(_ , {ownerInput}, {CarOwnerModel}) {
            ownerInput.ownerId = uniqid('OW_')
            try{
                await CarOwnerModel.create({
                    owner_id: ownerInput.ownerId,
                    owner_name:ownerInput.ownerName,
                    owner_address:ownerInput.ownerAddress,
                    owner_age:ownerInput.ownerAge
                })
                return true
            }catch(e){
                return false
            }
        }
    }
}