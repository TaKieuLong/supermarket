const Category = require("./models/Category.model.js");
const Product = require("./models/Product.model.js");
const Customer = require("./models/Customer.model.js");
const Order = require("./models/Order.model.js");
const CustomError = require("./errors/CustomError.js");
const resolvers = {
  Query: {
    categories: async () => await Category.find(),
    category: async (parent, { id }) => await Category.findById(id),
    products: async () => await Product.find().populate("category"),
    product: async (parent, { id }) =>
      await Product.findById(id).populate("category"),
    customers: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      return await Customer.find();
    },
    customer: async (parent, { id }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      return await Customer.findById(id);
    },
    orders: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      return await Order.find().populate("customer").populate("items.product");
    },
    order: async (parent, { id }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      return await Order.findById(id)
        .populate("customer")
        .populate("items.product");
    },
  },
  Mutation: {
    addCategory: async (parent, { input }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      const newCategory = new Category(input);
      return await newCategory.save();
    },
    addProduct: async (parent, { input }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      const newProduct = new Product(input);
      return await newProduct.save();
    },
    addCustomer: async (parent, { input }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      const newCustomer = new Customer(input);
      return await newCustomer.save();
    },
    addOrder: async (parent, { input }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      const newOrder = new Order(input);
      return await newOrder.save();
    },
    updateCategory: async (parent, { id, input }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      return await Category.findByIdAndUpdate(id, input, { new: true });
    },
    updateProduct: async (parent, { id, input }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      return await Product.findByIdAndUpdate(id, input, { new: true }).populate(
        "category"
      );
    },
    updateCustomer: async (parent, { id, input }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      return await Customer.findByIdAndUpdate(id, input, { new: true });
    },
    updateOrder: async (parent, { id, input }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      return await Order.findByIdAndUpdate(id, input, { new: true })
        .populate("customer")
        .populate("items.product");
    },
    deleteCategory: async (parent, { id }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      await Category.findByIdAndDelete(id);
      return true;
    },
    deleteProduct: async (parent, { id }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      await Product.findByIdAndDelete(id);
      return true;
    },
    deleteCustomer: async (parent, { id }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      await Customer.findByIdAndDelete(id);
      return true;
    },
    deleteOrder: async (parent, { id }, context) => {
      if (!context.user) {
        throw new Error("Authentication required");
      }
      await Order.findByIdAndDelete(id);
      return true;
    },
    signup: async (parent, { input }) => {
      const exitingCustomer = await Customer.findOne({ email: input.email });
      if (exitingCustomer) {
        throw new CustomError("Email already exists!", "EMAIL_ALREADY_EXITS");
      }
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const newCustomer = new Customer({
        ...input,
        password: hashedPassword,
      });
      const customer = await newCustomer.save();
      const token = jwt.sign({ id: customer._id }, "your_jwt_secret");
      return { token, customer };
    },
    signin: async (parent, { email, password }) => {
      const customer = await Customer.findOne({ email });
      if (!customer) {
        throw new CustomError("User not found", "USER_NOT_FOUND");
      }
      const valid = await bcrypt.compare(password, customer.password);
      if (!valid) {
        throw new CustomError("Incorrect password", "INCORRECT_PASSWORD");
      }
      const token = jwt.sign({ id: customer._id }, "your_jwt_secret");
      return { token, customer };
    },
  },
};

module.exports = resolvers;
