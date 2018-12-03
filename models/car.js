const {DataSource} = require('apollo-datasource')


class CarDataSource extends DataSource {
    initialize(config){
        this.CarModel = config.context.CarModel
        this.CarOwnerModel = config.context.CarOwnerModel
    }


    async saveCar(carName) {
        try {
            await this.CarModel.create({car_name: carName})
            return true
        }catch(e){
            return false
        }
    }


    async setCarOwner(carId , ownerId) {
        try {
            await this.CarOwnerModel.update({
                car_id:carId
            },{
                where:{
                    owner_id:ownerId
                }
            })
            return true
        }catch(e){
            return false
        }
    }

    async getCarOwner(carId) {
        const gCar = await this.getCar(carId)
        const gCarOwner = await gCar.getCarOwner()
        return gCarOwner
    }

    getCar(carId){
        return this.CarModel.findByPk(carId)
    }

    listCar(){
        return this.CarModel.findAll()
    }
}

module.exports = CarDataSource
