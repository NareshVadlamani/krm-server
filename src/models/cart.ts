import { model, Schema, Types } from "mongoose";
import { ICart, ICategory } from "../types";

const cartSchema = new Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default class Cart {
  private CartClc;

  constructor() {
    this.CartClc = model("cart", cartSchema);
  }

  async addToCart(cart: ICart) {
    const cartDoc = new this.CartClc({
      ...cart,
      id: new Types.ObjectId(),
    });
    const data = await cartDoc.save();
    return data;
  }

  async getCartById(id: string) {
    const cart = await this.CartClc.findById(id);
    if (!cart) {
      throw new Error("cart.not.found");
    }
    return cart;
  }
}
