import { Request, Response, NextFunction } from 'express';
import { UserUseCase, OrderUseCase, CustomerUseCase  } from '../../domain/usecases/usecases';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel, } from '../../domain/models/models';

export class UserController {
  private userUseCase: UserUseCase;

  constructor(userUseCase: UserUseCase) {
    this.userUseCase = userUseCase;
  }

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userUseCase.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userUseCase.getUserById(req.params.userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this.userUseCase.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedUser = await this.userUseCase.updateUser(req.params.userId, req.body);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userUseCase.deleteUser(req.params.userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ username, password: hashedPassword });
      await newUser.save();
      res.status(201).send('User registered');
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  public async login(req: Request, res: Response): Promise<void> {
    try {
        const { name, password } = req.body;
        const user = await UserModel.findOne({ name });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).send('Invalid credentials');
            return; 
        }
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
        return; 
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        return; 
    }
}

}

export class OrderController {
  private orderUseCase: OrderUseCase;

  constructor(orderUseCase: OrderUseCase) {
    this.orderUseCase = orderUseCase;
  }

  getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.orderUseCase.getAllOrders();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  };

  getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderUseCase.getOrderById(req.params.orderId);
      res.json(order);
    } catch (error) {
      next(error);
    }
  };

  createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newOrder = await this.orderUseCase.createOrder(req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  };

  updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedOrder = await this.orderUseCase.updateOrder(req.params.orderId, req.body);
      res.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  };

  deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.orderUseCase.deleteOrder(req.params.orderId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export class CustomerController {
  private customerUseCase: CustomerUseCase;

  constructor(customerUseCase: CustomerUseCase) {
    this.customerUseCase = customerUseCase;
  }

  getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customers = await this.customerUseCase.getAllCustomers();
      res.json(customers);
    } catch (error) {
      next(error);
    }
  };

  getCustomerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer = await this.customerUseCase.getCustomerById(req.params.customerId);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  };

  createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCustomer = await this.customerUseCase.createCustomer(req.body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  };

  updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedCustomer = await this.customerUseCase.updateCustomer(req.params.customerId, req.body);
      res.json(updatedCustomer);
    } catch (error) {
      next(error);
    }
  };

  deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.customerUseCase.deleteCustomer(req.params.customerId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}