import express, { Request, Response } from "express";
import { jaction } from "../utils/express-utils";

import { Types } from "mongoose";
import Mongo from "../models/mongo";
import { ICategory } from "../types";

export function getCategoryRouter() {
  return express
    .Router({ mergeParams: true })
    .get("/list", jaction(getCategories))
    .get("/list/:id", jaction(getCategoryById))
    .post("/add-category", jaction(addCategory));
}

export async function getCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return { err: "invalid category id" };
  }
  const category = await Mongo.category.getCategoryById(id);
  return { res: category };
}

export async function getCategories() {
  const userList = await Mongo.category.getAllCategories();
  return { res: userList };
}

export async function addCategory(req: Request, res: Response) {
  const { name, index, subCategories } = req.body as ICategory;
  const categoryList = await Mongo.category.addCategory({
    name,
    index,
    subCategories,
  });
  return categoryList;
}
