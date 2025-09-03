import Mongo from "../models/mongo";
import { IAddress } from "../types";
import jwt from "jsonwebtoken";
import config from "../../config";

export async function getUserList() {
  const userList = await Mongo.user.getUserList();
  return userList;
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  address?: IAddress
) {
  const user = await Mongo.user.addUser({ name, email, password, address });
  return user;
}

export async function signin(email: string, password: string) {
  const user = await Mongo.user.findByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Assuming user.password is hashed and Mongo.user.comparePassword exists
  const isMatch = await Mongo.user.comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    config.jwtSecret,
    {
      expiresIn: "1h",
    }
  );

  return { user, token };
}

export async function signup(
  name: string,
  email: string,
  password: string,
  address?: IAddress
) {
  // Check if user already exists
  const existingUser = await Mongo.user.findByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Create new user
  const user = await createUser(name, email, password, address);

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    config.jwtSecret,
    {
      expiresIn: "1h",
    }
  );

  return { user, token };
}
