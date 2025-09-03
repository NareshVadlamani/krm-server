import { Types } from "mongoose";
import Mongo from "../models/mongo";

export async function getCategoryById(id: string) {
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

export async function addCategory({ name, index, subCategories }) {
  const categoryList = await Mongo.category.addCategory({
    name,
    index,
    subCategories,
  });
  return categoryList;
}
