import Mongo from "../models/mongo";
import { IAddress } from "../types";

export async function getUserList() {
  const userList = await Mongo.user.getUserList();
  return userList;
}

export async function createUser(
  name: string,
  email: string,
  address?: IAddress
) {
  const user = await Mongo.user.addUser({ name, email, address });
  return user;
}
