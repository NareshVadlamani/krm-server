import express, { Request, Response } from "express";
import { jaction } from "../utils/express-utils";
import { ICategory } from "../types";
import * as cartService from "../service/cart";
import exp from "constants";

export function getCartRouter() {
  return express
    .Router({ mergeParams: true })
    .get("/list", jaction(getCart))
    .post("/add-to-cart", jaction(addToCart))
    .post("/update", jaction(updateCart));
}

/**
 * @swagger
 * /cart/list:
 *  get:
 *   tags:
 *    - Cart
 *   summary: API to get cart items
 *   description: API to get cart items
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */

export async function getCart(req: Request, res: Response) {
  const { id } = req.params;
  const result = await cartService.getCartById(id);
  return result;
}

/**
 * @swagger
 * /cart/add:
 *  post:
 *   tags:
 *    - Cart
 *   summary: API to add items to cart
 *   description: API to add items to cart
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        userId:
 *         type: string
 *        items:
 *         type: array
 *         items:
 *          type: object
 *          properties:
 *           productId:
 *            type: string
 *           quantity:
 *            type: integer
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */

export async function addToCart(req: Request, res: Response) {
  const result = await cartService.addToCart(req.body);
  return result;
}

/**
 * @swagger
 * /cart/update:
 *  post:
 *   tags:
 *    - Cart
 *   summary: API to update cart items
 *   description: API to update cart items
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        cartId:
 *         type: string
 *        items:
 *         type: array
 *         items:
 *          type: object
 *          properties:
 *           productId:
 *            type: string
 *           quantity:
 *            type: integer
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */

export async function updateCart(req: Request, res: Response) {
  const result = await cartService.updateCart(req.body);
  return result;
}
