import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { User, Order, Customer } from '../../core/types';
import { NotFoundError, ValidationError } from '../../core/errors/customErrors';
import { UserRepository, OrderRepository, CustomerRepository } from '../repositories/repositories';

export class UserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    if (!userData.name) {
      throw new ValidationError('Name is required');
    }
    if (!userData.email) {
      throw new ValidationError('Email is required');
    }

    // Ensure a password is always hashed, whether provided or generated
    const passwordToHash = userData.password || uuidv4();
    const hashedPassword = await bcrypt.hash(passwordToHash, 10);

    const newUser: User = {
      userId: uuidv4(),
      email: userData.email,
      name: userData.name,
      password: hashedPassword // Use the hashed password
    };
  
    return this.userRepository.create(newUser);
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    const updatedUser = await this.userRepository.update(userId, userData);
    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    const deleted = await this.userRepository.delete(userId);
    if (!deleted) {
      throw new NotFoundError('User not found');
    }
  }
}

export class OrderUseCase {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundError('Order not found');
    }
    return order;
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    if (!orderData.customerId) {
      throw new ValidationError('Customer ID is required');
    }
    if (!orderData.items || orderData.items.length === 0) {
      throw new ValidationError('Order must contain at least one item');
    }

    const totalPrice = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder: Order = {
      orderId: uuidv4(),
      customerId: orderData.customerId,
      items: orderData.items,
      totalPrice,
      status: 'pending',
      createdAt: new Date(),
    };

    return this.orderRepository.create(newOrder);
  }

  async updateOrder(orderId: string, orderData: Partial<Order>): Promise<Order> {
    const existingOrder = await this.orderRepository.findById(orderId);
    if (!existingOrder) {
      throw new NotFoundError('Order not found');
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

  async deleteOrder(orderId: string): Promise<void> {
    const deleted = await this.orderRepository.delete(orderId);
    if (!deleted) {
      throw new NotFoundError('Order not found');
    }
  }
}

export class CustomerUseCase {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async getCustomerById(customerId: string): Promise<Customer> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new NotFoundError('Customer not found');
    }
    return customer;
  }

  async createCustomer(customerData: Partial<Customer>): Promise<Customer> {
    if (!customerData.name) {
      throw new ValidationError('Name is required');
    }
    if (!customerData.address) {
      throw new ValidationError('Address is required');
    }

    const newCustomer: Customer = {
      customerId: uuidv4(),
      name: customerData.name,
      address: customerData.address,
    };

    return this.customerRepository.create(newCustomer);
  }

  async updateCustomer(customerId: string, customerData: Partial<Customer>): Promise<Customer> {
    const existingCustomer = await this.customerRepository.findById(customerId);
    if (!existingCustomer) {
      throw new NotFoundError('Customer not found');
    }

    const updatedCustomer = await this.customerRepository.update(customerId, customerData);
    if (!updatedCustomer) {
      throw new Error('Failed to update customer');
    }

    return updatedCustomer;
  }

  async deleteCustomer(customerId: string): Promise<void> {
    const deleted = await this.customerRepository.delete(customerId);
    if (!deleted) {
      throw new NotFoundError('Customer not found');
    }
  }
}

