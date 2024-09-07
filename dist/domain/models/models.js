"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = exports.OrderModel = exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
const orderItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});
const orderSchema = new mongoose_1.Schema({
    orderId: { type: String, required: true, unique: true },
    customerId: { type: String, required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'processing', 'completed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});
exports.OrderModel = mongoose_1.default.model("Order", orderSchema);
const customerSchema = new mongoose_1.Schema({
    customerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
});
exports.CustomerModel = mongoose_1.default.model("Customer", customerSchema);
