import { Types } from "mongoose";
import Mongo from "../models/mongo";

export async function getOrderById(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    return { err: "invalid order id" };
  }
  const order = await Mongo.order.getOrderById(id);
  return { res: order };
}

export async function getAllOrders() {
  const orderList = await Mongo.order.getAllOrders();
  return orderList;
}

export async function createOrder({
  userId,
  items,
  address,
  paymentMethod,
  paymentStatus,
}) {
  const order = await Mongo.order.createOrder({
    userId,
    items,
    address,
    paymentMethod,
    paymentStatus,
  });
  return order;
}
