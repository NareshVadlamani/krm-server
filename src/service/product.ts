import { Types } from "mongoose";
import Mongo from "../models/mongo";

export async function getProductById(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    return { err: "invalid product id" };
  }
  const product = await Mongo.product.getProductById(id);
  return { res: product };
}

export async function getProducts() {
  const productList = await Mongo.product.getAllProducts();
  return { res: productList };
}

export async function addProduct({
  name,
  price,
  description,
  category,
  image,
}) {
  const product = await Mongo.product.addProduct({
    name,
    price,
    description,
    category,
    image,
  });
  return product;
}
