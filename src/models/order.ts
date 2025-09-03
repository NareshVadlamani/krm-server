import { model, Schema, Types } from "mongoose";
import { IOrder } from "../types";
import { AddressSchema } from "./Address";

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    address: { type: AddressSchema, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default class Order {
  private OrderClc;

  constructor() {
    this.OrderClc = model("order", orderSchema);
  }

  async createOrder(order: IOrder) {
    const orderDoc = new this.OrderClc({
      ...order,
      id: new Types.ObjectId(),
    });
    const data = await orderDoc.save();
    return data;
  }

  async getOrderById(id: string) {
    const order = await this.OrderClc.findById(id);
    if (!order) {
      throw new Error("order.not.found");
    }
    return order;
  }

  async getAllOrders() {
    const orders = await this.OrderClc.find();
    return orders;
  }
}
