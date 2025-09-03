import { Types } from "mongoose";
import Mongo from "../models/mongo";

export async function getCartById(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    return { err: "invalid cart id" };
  }
  const cart = await Mongo.cart.getCartById(id);
  return { res: cart };
}

export async function addToCart({ userId, items }) {
  const cartList = await Mongo.cart.addToCart({
    userId,
    items,
  });
  return cartList;
}
