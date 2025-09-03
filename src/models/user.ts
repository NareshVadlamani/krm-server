import { json } from "express";
import { model, Schema, Types } from "mongoose";
import { AddressSchema } from "./Address";
import { IUser } from "../types";

const user = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: AddressSchema },
});

export default class User {
  UserClc: any;
  constructor() {
    this.UserClc = model("user", user);
  }
  async getUserList() {
    const users = await this.UserClc.find({});
    if (users.length) return users as string;
    else throw new Error(`no.user.found.`);
  }

  async addUser(user: IUser) {
    const _id = new Types.ObjectId();
    const userModel = new this.UserClc({
      _id,
      name: user.name,
      email: user.email,
      address: user.address,
    });
    await userModel.save();
  }

  async findById(email: string) {
    const data = await this.UserClc.find({ email });
    return data;
  }

  async updateUser(email: string, user: IUser) {
    const data = await this.UserClc.findOneAndUpdate({ email }, user, {
      new: true,
    });
    return data;
  }
}
