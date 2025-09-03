import express, { Request, Response } from "express";
import { jaction } from "../utils/express-utils";
import { ICategory } from "../types";
import * as categoryService from "../service/category";

export function getCategoryRouter() {
  return express
    .Router({ mergeParams: true })
    .get("/list", jaction(getCategories))
    .get("/list/:id", jaction(getCategoryById))
    .post("/add-category", jaction(addCategory));
}

/**
 * @swagger
 * /category/list/{id}:
 *  get:
 *   tags:
 *    - Categories
 *   summary: API to get category by ID
 *   description: API to get category by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: Category ID
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */

export async function getCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  const result = await categoryService.getCategoryById(id);
  return result;
}

/**
 * @swagger
 * /category/list:
 *  get:
 *   tags:
 *    - Categories
 *   summary: API to get category list
 *   description: API to get category list
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */

export async function getCategories(req: Request, res: Response) {
  const result = await categoryService.getCategories();
  return result;
}

/**
 * @swagger
 * /category/add:
 *  post:
 *   tags:
 *    - Categories
 *   summary: API to add a new category
 *   description: API to add a new category
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        index:
 *         type: integer
 *        subCategories:
 *         type: array
 *         items:
 *          type: string
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */

export async function addCategory(req: Request, res: Response) {
  const { name, index, subCategories } = req.body as ICategory;
  const result = await categoryService.addCategory({
    name,
    index,
    subCategories,
  });
  return result;
}
