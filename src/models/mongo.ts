import { MongoClient } from "mongodb";
import { connect, connection } from "mongoose";
import Category from "./category";
import User from "./user";
import Product from "./product";

let mclient: any;

export default class Mongo {
  static category: Category;
  static user: User;
  static product: Product;
  static async init() {
    if (!mclient) {
      mclient = await connect("mongodb://localhost:27017/userHobby1");

      console.log("connected");

      connection.once("open", function () {
        console.log("MongoDB database connection established successfully");
      });
    }
    Mongo.category = new Category();
    Mongo.user = new User();
    Mongo.product = new Product();
  }
}
