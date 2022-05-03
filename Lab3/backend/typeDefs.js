const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String!
    email: String!
    firstName: String!
    lastName: String!
    address: String!
    city: String!
    state: String!
    zip: String!
    phone: String!
    image: String!
    role: String!
  }

  type Item {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    image: String!
    category: String!
    quantity: Int!
  }

  type Favourite {
    _id: ID!
    userId: ID!
    itemId: ID!
  }

  type Cart {
    _id: ID!
    userId: ID!
    itemId: ID!
  }

  type Purchased {
    _id: ID!
    userId: ID!
    itemId: ID!
  }

  type Query {
    getUsers: [User]
    getUser(_id: ID!): User
    getItems: [Item]
    getItem(_id: ID!): Item
    getFavourites: [Favourite]
    getFavourite(_id: ID!): Favourite
    getCart: [Cart]
    getCartItem(_id: ID!): Cart
    getPurchased: [Purchased]
    getPurchasedItem(_id: ID!): Purchased
  }

  type Mutation {
    addUser(
      username: String!
      password: String!
      email: String!
      firstName: String!
      lastName: String!
      address: String!
      city: String!
      state: String!
      zip: String!
      phone: String!
      image: String!
      role: String!
    ): User
    addItem(
      name: String!
      description: String!
      price: Float!
      image: String!
      category: String!
      quantity: Int!
    ): Item
    addFavourite(userId: ID!, itemId: ID!): Favourite
    addCart(userId: ID!, itemId: ID!): Cart
    addPurchased(userId: ID!, itemId: ID!): Purchased
    deleteUser(_id: ID!): User
    deleteItem(_id: ID!): Item
    deleteFavourite(_id: ID!): Favourite
    deleteCart(_id: ID!): Cart
    deletePurchased(_id: ID!): Purchased
    updateUser(
      _id: ID!
      username: String
      password: String
      email: String
      firstName: String
      lastName: String
      address: String
      city: String
      state: String
      zip: String
      phone: String
      image: String
      role: String
    ): User
    updateItem(
      _id: ID!
      name: String
      description: String
      price: Float
      image: String
      category: String
      quantity: Int
    ): Item
    updateFavourite(_id: ID!, userId: ID, itemId: ID): Favourite
    updateCart(_id: ID!, userId: ID, itemId: ID): Cart
    updatePurchased(_id: ID!, userId: ID, itemId: ID): Purchased
  }
`;

module.exports = typeDefs;
