const {gql} = require('apollo-server');

const typeDefs = gql`
    type Item {
        name: String!
        price: Int!
        imgUrl: String!
    }
    type Receipt {
        name: String!
        price: Int!
        amount: Int!
    }
    type Query {
        getItems: [Item]!
        getReceipts: [Receipt]!
    }
    type Mutation {
        updateReceipt(name: String!, price: Int!, amount: Int!): Receipt!
    }
`;

module.exports = typeDefs;
