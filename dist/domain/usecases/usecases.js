"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerUseCase = exports.OrderUseCase = exports.UserUseCase = void 0;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const customErrors_1 = require("../../core/errors/customErrors");
class UserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllUsers() {
        return this.userRepository.findAll();
    }
    async getUserById(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new customErrors_1.NotFoundError('User not found');
        }
        return user;
    }
    async createUser(userData) {
        if (!userData.name) {
            throw new customErrors_1.ValidationError('Name is required');
        }
        if (!userData.email) {
            throw new customErrors_1.ValidationError('Email is required');
        }
        // Ensure a password is always hashed, whether provided or generated
        const passwordToHash = userData.password || (0, uuid_1.v4)();
        const hashedPassword = await bcryptjs_1.default.hash(passwordToHash, 10);
        const newUser = {
            userId: (0, uuid_1.v4)(),
            email: userData.email,
            name: userData.name,
            password: hashedPassword // Use the hashed password
        };
        return this.userRepository.create(newUser);
    }
    async updateUser(userId, userData) {
        const updatedUser = await this.userRepository.update(userId, userData);
        if (!updatedUser) {
            throw new customErrors_1.NotFoundError('User not found');
        }
        return updatedUser;
    }
    async deleteUser(userId) {
        const deleted = await this.userRepository.delete(userId);
        if (!deleted) {
            throw new customErrors_1.NotFoundError('User not found');
        }
    }
}
exports.UserUseCase = UserUseCase;
class OrderUseCase {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async getAllOrders() {
        return this.orderRepository.findAll();
    }
    async getOrderById(orderId) {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new customErrors_1.NotFoundError('Order not found');
        }
        return order;
    }
    async createOrder(orderData) {
        if (!orderData.customerId) {
            throw new customErrors_1.ValidationError('Customer ID is required');
        }
        if (!orderData.items || orderData.items.length === 0) {
            throw new customErrors_1.ValidationError('Order must contain at least one item');
        }
        const totalPrice = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const newOrder = {
            orderId: (0, uuid_1.v4)(),
            customerId: orderData.customerId,
            items: orderData.items,
            totalPrice,
            status: 'pending',
            createdAt: new Date(),
        };
        return this.orderRepository.create(newOrder);
    }
    async updateOrder(orderId, orderData) {
        const existingOrder = await this.orderRepository.findById(orderId);
        if (!existingOrder) {
            throw new customErrors_1.NotFoundError('Order not found');
        }
        if (orderData.items) {
            orderData.totalPrice = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }
        const updatedOrder = await this.orderRepository.update(orderId, orderData);
        if (!updatedOrder) {
            throw new Error('Failed to update order');
        }
        return updatedOrder;
    }
    async deleteOrder(orderId) {
        const deleted = await this.orderRepository.delete(orderId);
        if (!deleted) {
            throw new customErrors_1.NotFoundError('Order not found');
        }
    }
}
exports.OrderUseCase = OrderUseCase;
class CustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async getAllCustomers() {
        return this.customerRepository.findAll();
    }
    async getCustomerById(customerId) {
        const customer = await this.customerRepository.findById(customerId);
        if (!customer) {
            throw new customErrors_1.NotFoundError('Customer not found');
        }
        return customer;
    }
    async createCustomer(customerData) {
        if (!customerData.name) {
            throw new customErrors_1.ValidationError('Name is required');
        }
        if (!customerData.address) {
            throw new customErrors_1.ValidationError('Address is required');
        }
        const newCustomer = {
            customerId: (0, uuid_1.v4)(),
            name: customerData.name,
            address: customerData.address,
        };
        return this.customerRepository.create(newCustomer);
    }
    async updateCustomer(customerId, customerData) {
        const existingCustomer = await this.customerRepository.findById(customerId);
        if (!existingCustomer) {
            throw new customErrors_1.NotFoundError('Customer not found');
        }
        const updatedCustomer = await this.customerRepository.update(customerId, customerData);
        if (!updatedCustomer) {
            throw new Error('Failed to update customer');
        }
        return updatedCustomer;
    }
    async deleteCustomer(customerId) {
        const deleted = await this.customerRepository.delete(customerId);
        if (!deleted) {
            throw new customErrors_1.NotFoundError('Customer not found');
        }
    }
}
exports.CustomerUseCase = CustomerUseCase;
