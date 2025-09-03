import express, { Request, Response } from "express";
import { jaction } from "../utils/express-utils";
import { ICategory } from "../types";
import * as orderService from "../service/order";

export function getOrderRouter() {
  return express
    .Router({ mergeParams: true })
    .get("/:id", jaction(getOrderById))
    .get("/list", jaction(getAllOrders))
    .post("/place-order", jaction(placeOrder));
}

async function getOrderById(req: Request, res: Response) {
  const orderId = req.params.id;
  const order = await orderService.getOrderById(orderId);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  res.json(order);
}
async function getAllOrders(req: Request, res: Response) {
  const orders = await orderService.getAllOrders();
  res.json(orders);
}

async function placeOrder(req: Request, res: Response) {
  const orderData = req.body;
  try {
    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: "Failed to place order" });
  }
}
