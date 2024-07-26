const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
    description: String
  }

  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    category: Category!
    images: [String]
    sizes: [String]
    colors: [String]
    createdAt: String
    updatedAt: String
  }

  type Customer {
    id: ID!
    name: String!
    email: String!
    password: String!
    address: String
    phone: String
  }

  type OrderItem {
    product: Product!
    quantity: Int!
    price: Float!
  }

  type Order {
    id: ID!
    customer: Customer!
    orderDate: String
    status: String!
    items: [OrderItem!]!
    totalAmount: Float!
  }

  type Query {
    categories: [Category!]!
    category(id: ID!): Category
    products: [Product!]!
    product(id: ID!): Product
    customers: [Customer!]!
    customer(id: ID!): Customer
    orders: [Order!]!
    order(id: ID!): Order
  }

  input CategoryInput {
    name: String!
    description: String
  }

  input ProductInput {
    name: String!
    description: String
    price: Float!
    category: ID!
    images: [String]
    sizes: [String]
    colors: [String]
  }

  input CustomerInput {
    name: String!
    email: String!
    password: String!
    address: String
    phone: String
  }

  input OrderItemInput {
    product: ID!
    quantity: Int!
    price: Float!
  }

  input OrderInput {
    customer: ID!
    items: [OrderItemInput!]!
    status: String!
    totalAmount: Float!
  }

  type AuthPayload {
    token: String!
    customer: Customer!
  }

  type Mutation {
    addCategory(input: CategoryInput!): Category
    addProduct(input: ProductInput!): Product
    addCustomer(input: CustomerInput!): Customer
    addOrder(input: OrderInput!): Order
    updateCategory(id: ID!, input: CategoryInput!): Category
    updateProduct(id: ID!, input: ProductInput!): Product
    updateCustomer(id: ID!, input: CustomerInput!): Customer
    updateOrder(id: ID!, input: OrderInput!): Order
    deleteCategory(id: ID!): Boolean
    deleteProduct(id: ID!): Boolean
    deleteCustomer(id: ID!): Boolean
    deleteOrder(id: ID!): Boolean
    signup(input: CustomerInput!): AuthPayload
    signin(email: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;
