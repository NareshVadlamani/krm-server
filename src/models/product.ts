import { model, Schema, Types } from "mongoose";
import { IProduct } from "../types";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default class Product {
  private ProductClc;

  constructor() {
    this.ProductClc = model("product", productSchema);
  }

  async getAllProducts() {
    return await this.ProductClc.find({});
  }

  async addProduct(product: IProduct) {
    const productDoc = new this.ProductClc({
      ...product,
      id: new Types.ObjectId(),
    });

    const data = await productDoc.save();

    return data;
  }

  async getProductById(id: string) {
    const product = await this.ProductClc.findById(id);
    if (!product) {
      throw new Error("product.not.found");
    }
    return product;
  }
}
