import mongoose, { Schema, Document } from "mongoose";
import { User, Order, OrderItem, Customer } from "../../core/types";

const userSchema = new Schema<User & Document>({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<User & Document>("User", userSchema);

const orderItemSchema = new Schema<OrderItem>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new Schema<Order & Document>({
  orderId: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  items: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export const OrderModel = mongoose.model<Order & Document>("Order", orderSchema);

const customerSchema = new Schema<Customer & Document>({
  customerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
});

export const CustomerModel = mongoose.model<Customer & Document>("Customer", customerSchema);