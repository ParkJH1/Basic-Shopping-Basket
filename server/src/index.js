const {ApolloServer, gql, AuthenticationError, ForbiddenError} = require('apollo-server');
const {createStore, createReceipt} = require('./database');
const {createMockStore} = require('./mockDataWriter');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const {ItemAPI} = require('./dataSources/itemAPI');
const {ReceiptAPI} = require('./dataSources/receiptAPI');

const store = createStore(true);
const receipt = createReceipt(true);

const context = async ({ req }) => {
    await createMockStore(store);
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        itemAPI: new ItemAPI(store),
        receiptAPI: new ReceiptAPI(receipt),
    }),
    context
});

server.listen().then(({ url }) => {
    console.log(`Listening at ${url}`);
});
