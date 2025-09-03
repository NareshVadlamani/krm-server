import express, { Request, Response } from "express";
import { jaction } from "../utils/express-utils";

import { IProduct } from "../types";
import * as ProductService from "../service/product";

export function getProductRouter() {
  return express
    .Router({ mergeParams: true })
    .get("/list", jaction(getProducts))
    .get("/list/:id", jaction(getProductById))
    .post("/add-product", jaction(addProduct));
}

/**
 * @swagger
 * /product/list/{id}:
 *  get:
 *   tags:
 *    - Products
 *   summary: API to get product by ID
 *   description: API to get product by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: Product ID
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */

export async function getProductById(req: Request, res: Response) {
  const { id } = req.params;
  const result = await ProductService.getProductById(id);
  return result;
}

/**
 * @swagger
 * /product/list:
 *  get:
 *   tags:
 *    - Products
 *   summary: API to get product list
 *   description: API to get product list
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */

export async function getProducts() {
  const result = await ProductService.getProducts();
  return result;
}

/**
 * @swagger
 * /product/add:
 *  post:
 *   tags:
 *    - Products
 *   summary: API to add a new product
 *   description: API to add a new product
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        price:
 *         type: number
 *        description:
 *         type: string
 *        category:
 *         type: string
 *        image:
 *         type: string
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */

export async function addProduct(req: Request, res: Response) {
  const { name, price, description, category, image } = req.body as IProduct;
  const result = await ProductService.addProduct({
    name,
    price,
    description,
    category,
    image,
  });
  return result;
}
