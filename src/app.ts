import express from 'express';
import bodyParser from 'body-parser';
import { connectDatabase } from './core/config/database';
import { errorMiddleware } from './core/middlewares/middlewares';
import { userRouter } from './routes/userRoutes';
import { orderRouter } from './routes/orderRoutes';
import { customerRouter } from './routes/customerRoutes';
import { CustomerRepository, OrderRepository, UserRepository } from './domain/repositories/repositories';
import { CustomerUseCase, OrderUseCase, UserUseCase } from './domain/usecases/usecases';
import { UserController, OrderController, CustomerController } from './handlers/controllers/controllers';

const app = express();

// Middleware
app.use(bodyParser.json());

// Database connection
connectDatabase();

// Setup dependencies

const userRepository = new UserRepository();
const orderRepository = new OrderRepository();
const customerRepository = new CustomerRepository();

const userUseCase = new UserUseCase(userRepository);
const orderUseCase = new OrderUseCase(orderRepository);
const customerUseCase = new CustomerUseCase(customerRepository);

const userController = new UserController(userUseCase);
const orderController = new OrderController(orderUseCase);
const customerController = new CustomerController(customerUseCase);


// Routes
app.use('/api/users', userRouter(userController));
app.use('/api/orders', orderRouter(orderController));
app.use('/api/customers', customerRouter(customerController));


// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
