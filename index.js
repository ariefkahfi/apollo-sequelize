const {ApolloServer} = require('apollo-server')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const CarDb = require('./models/car')

const {CarModel , CarOwnerModel } = require('./models/db')

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context:{
        CarModel,
        CarOwnerModel
    },
    dataSources: ()=> ({
        carDb: new CarDb()
    })
})

apolloServer
    .listen(9696)
    .then(r=>{
        console.log(`Server run at ${r.url}, ${r.subscriptionsUrl}`)
    })
    .catch(err=>{
        console.error(err)
    })