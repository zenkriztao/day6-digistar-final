  export interface User {
    userId: string;
    email: string;
    name: string;
    password: string;
  }
  export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    orderId: string;
    customerId: string;
    items: OrderItem[];
    totalPrice: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    createdAt: Date;
  }
  
  export interface Customer {
    customerId: string;
    name: string;
    address: string;
  }