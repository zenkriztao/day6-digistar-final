import { User, Order, Customer } from '../../core/types';
import { UserModel, OrderModel, CustomerModel } from '../models/models';

export class UserRepository {
  async findAll(): Promise<User[]> {
    return UserModel.find().exec();
  }

  async findById(userId: string): Promise<User | null> {
    return UserModel.findOne({ userId }).exec();
  }
  async create(user: User): Promise<User> {
    const newUser = new UserModel(user);
    return newUser.save();
  }

  async update(userId: string, userData: Partial<User>): Promise<User | null> {
    return UserModel.findOneAndUpdate({ userId }, userData, { new: true }).exec();
  }

  async delete(userId: string): Promise<boolean> {
    const result = await UserModel.deleteOne({ userId }).exec();
    return result.deletedCount === 1;
  }
  
}

export class OrderRepository {
  async findAll(): Promise<Order[]> {
    return OrderModel.find().exec();
  }

  async findById(orderId: string): Promise<Order | null> {
    return OrderModel.findOne({ orderId }).exec();
  }

  async create(order: Order): Promise<Order> {
    const newOrder = new OrderModel(order);
    return newOrder.save();
  }

  async update(orderId: string, orderData: Partial<Order>): Promise<Order | null> {
    return OrderModel.findOneAndUpdate({ orderId }, orderData, { new: true }).exec();
  }

  async delete(orderId: string): Promise<boolean> {
    const result = await OrderModel.deleteOne({ orderId }).exec();
    return result.deletedCount === 1;
  }
}

export class CustomerRepository {
  async findAll(): Promise<Customer[]> {
    return CustomerModel.find().exec();
  }

  async findById(customerId: string): Promise<Customer | null> {
    return CustomerModel.findOne({ customerId }).exec();
  }

  async create(customer: Customer): Promise<Customer> {
    const newCustomer = new CustomerModel(customer);
    return newCustomer.save();
  }

  async update(customerId: string, customerData: Partial<Customer>): Promise<Customer | null> {
    return CustomerModel.findOneAndUpdate({ customerId }, customerData, { new: true }).exec();
  }

  async delete(customerId: string): Promise<boolean> {
    const result = await CustomerModel.deleteOne({ customerId }).exec();
    return result.deletedCount === 1;
  }
}