"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = exports.OrderRepository = exports.UserRepository = void 0;
const models_1 = require("../models/models");
class UserRepository {
    async findAll() {
        return models_1.UserModel.find().exec();
    }
    async findById(userId) {
        return models_1.UserModel.findOne({ userId }).exec();
    }
    async create(user) {
        const newUser = new models_1.UserModel(user);
        return newUser.save();
    }
    async update(userId, userData) {
        return models_1.UserModel.findOneAndUpdate({ userId }, userData, { new: true }).exec();
    }
    async delete(userId) {
        const result = await models_1.UserModel.deleteOne({ userId }).exec();
        return result.deletedCount === 1;
    }
}
exports.UserRepository = UserRepository;
class OrderRepository {
    async findAll() {
        return models_1.OrderModel.find().exec();
    }
    async findById(orderId) {
        return models_1.OrderModel.findOne({ orderId }).exec();
    }
    async create(order) {
        const newOrder = new models_1.OrderModel(order);
        return newOrder.save();
    }
    async update(orderId, orderData) {
        return models_1.OrderModel.findOneAndUpdate({ orderId }, orderData, { new: true }).exec();
    }
    async delete(orderId) {
        const result = await models_1.OrderModel.deleteOne({ orderId }).exec();
        return result.deletedCount === 1;
    }
}
exports.OrderRepository = OrderRepository;
class CustomerRepository {
    async findAll() {
        return models_1.CustomerModel.find().exec();
    }
    async findById(customerId) {
        return models_1.CustomerModel.findOne({ customerId }).exec();
    }
    async create(customer) {
        const newCustomer = new models_1.CustomerModel(customer);
        return newCustomer.save();
    }
    async update(customerId, customerData) {
        return models_1.CustomerModel.findOneAndUpdate({ customerId }, customerData, { new: true }).exec();
    }
    async delete(customerId) {
        const result = await models_1.CustomerModel.deleteOne({ customerId }).exec();
        return result.deletedCount === 1;
    }
}
exports.CustomerRepository = CustomerRepository;
