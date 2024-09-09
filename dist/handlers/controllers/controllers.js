"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = exports.OrderController = exports.UserController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../../domain/models/models");
class UserController {
    constructor(userUseCase) {
        this.getAllUsers = async (req, res, next) => {
            try {
                const users = await this.userUseCase.getAllUsers();
                res.json(users);
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserById = async (req, res, next) => {
            try {
                const user = await this.userUseCase.getUserById(req.params.userId);
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.createUser = async (req, res, next) => {
            try {
                const newUser = await this.userUseCase.createUser(req.body);
                res.status(201).json(newUser);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateUser = async (req, res, next) => {
            try {
                const updatedUser = await this.userUseCase.updateUser(req.params.userId, req.body);
                res.json(updatedUser);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteUser = async (req, res, next) => {
            try {
                await this.userUseCase.deleteUser(req.params.userId);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        };
        this.userUseCase = userUseCase;
    }
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            // Validation
            if (!name || !email || !password) {
                res.status(400).json({ message: 'Name, email, and password are required' });
            }
            // Check if user exists
            const existingUser = await models_1.UserModel.findOne({ name, email, password });
            if (existingUser) {
                res.status(409).json({ message: 'User already exists' });
            }
            // Hash password
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            // Create new user
            const newUser = new models_1.UserModel({ name, email, password: hashedPassword });
            await newUser.save();
            // Respond
            res.status(201).json({ message: 'User registered successfully' });
        }
        catch (error) {
            next(error);
            console.log(error);
        }
    }
    async login(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await models_1.UserModel.findOne({ name, email, password });
            if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
                res.status(401).send('Invalid credentials');
                return;
            }
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token });
            return;
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
    }
}
exports.UserController = UserController;
class OrderController {
    constructor(orderUseCase) {
        this.getAllOrders = async (req, res, next) => {
            try {
                const orders = await this.orderUseCase.getAllOrders();
                res.json(orders);
            }
            catch (error) {
                next(error);
            }
        };
        this.getOrderById = async (req, res, next) => {
            try {
                const order = await this.orderUseCase.getOrderById(req.params.orderId);
                res.json(order);
            }
            catch (error) {
                next(error);
            }
        };
        this.createOrder = async (req, res, next) => {
            try {
                const newOrder = await this.orderUseCase.createOrder(req.body);
                res.status(201).json(newOrder);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateOrder = async (req, res, next) => {
            try {
                const updatedOrder = await this.orderUseCase.updateOrder(req.params.orderId, req.body);
                res.json(updatedOrder);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteOrder = async (req, res, next) => {
            try {
                await this.orderUseCase.deleteOrder(req.params.orderId);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        };
        this.orderUseCase = orderUseCase;
    }
}
exports.OrderController = OrderController;
class CustomerController {
    constructor(customerUseCase) {
        this.getAllCustomers = async (req, res, next) => {
            try {
                const customers = await this.customerUseCase.getAllCustomers();
                res.json(customers);
            }
            catch (error) {
                next(error);
            }
        };
        this.getCustomerById = async (req, res, next) => {
            try {
                const customer = await this.customerUseCase.getCustomerById(req.params.customerId);
                res.json(customer);
            }
            catch (error) {
                next(error);
            }
        };
        this.createCustomer = async (req, res, next) => {
            try {
                const newCustomer = await this.customerUseCase.createCustomer(req.body);
                res.status(201).json(newCustomer);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateCustomer = async (req, res, next) => {
            try {
                const updatedCustomer = await this.customerUseCase.updateCustomer(req.params.customerId, req.body);
                res.json(updatedCustomer);
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteCustomer = async (req, res, next) => {
            try {
                await this.customerUseCase.deleteCustomer(req.params.customerId);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        };
        this.customerUseCase = customerUseCase;
    }
}
exports.CustomerController = CustomerController;
