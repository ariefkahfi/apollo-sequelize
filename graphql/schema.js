const {gql} = require('apollo-server')


module.exports = gql(`
    type Car {
        carId: Int!
        carName: String!
        carOwner: Owner
    }

    type Owner {
        ownerId: String!
        ownerName: String!
        ownerAddress: String!
        ownerAge: Int!
        ownerCar: Car
    }


    input OwnerInput {
        ownerId: String
        ownerName: String!
        ownerAddress: String!
        ownerAge: Int!
    }

    input CarInput {
        carName: String!
        carOwner: OwnerInput
    }

    type Query {
        allCar: [Car]
        allOwner: [Owner]
        findCar(carId: Int!): Car
    }

    type Mutation {
        saveCar(carInput: CarInput!): Boolean
        setCarOwner(carId: Int! , ownerId: String!): Boolean
        saveOwner(ownerInput: OwnerInput!): Boolean
    }
`)