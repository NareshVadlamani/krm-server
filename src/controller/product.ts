import express, { Request, Response } from "express";
import { jaction } from "../utils/express-utils";

import { Types } from "mongoose";
import Mongo from "../models/mongo";
import { ICategory, IProduct } from "../types";

export function getProductRouter() {
  return express
    .Router({ mergeParams: true })
    .get("/list", jaction(getProducts))
    .get("/list/:id", jaction(getProductById))
    .post("/add-product", jaction(addProduct));
}

export async function getProductById(req: Request, res: Response) {
  const { id } = req.params;
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

export async function addProduct(req: Request, res: Response) {
  const { name, price, description, category, image } = req.body as IProduct;
  const product = await Mongo.product.addProduct({
    name,
    price,
    description,
    category,
    image,
  });
  return product;
}
