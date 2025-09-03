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

export async function updateCart({ cartId, items }) {
  if (!Types.ObjectId.isValid(cartId)) {
    return { err: "invalid cart id" };
  }
  const updatedCart = await Mongo.cart.updateCart({
    cartId,
    items,
  });
  return updatedCart;
}
