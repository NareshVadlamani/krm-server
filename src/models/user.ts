import { json } from "express";
import { model, Schema, Types } from "mongoose";
import { AddressSchema } from "./Address";
import { IUser } from "../types";
const bcrypt = require("bcryptjs");

const user = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: AddressSchema },
  password: { type: String, required: true },
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
      password: user.password,
    });
    const savedUser = await userModel.save();

    return savedUser;
  }

  async findByEmail(email: string) {
    const data = await this.UserClc.find({ email });
    return data;
  }

  async updateUser(email: string, user: IUser) {
    const data = await this.UserClc.findOneAndUpdate({ email }, user, {
      new: true,
    });
    return data;
  }

  async comparePassword(email: string, password: string) {
    const user = await this.UserClc.findOne({ email });
    if (!user) throw new Error("user.not.found");
    // Assuming password is hashed using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  }
}
