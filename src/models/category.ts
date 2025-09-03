import { model, Schema, Types } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    index: { type: Number, required: true },
    subCategories: { type: [String], required: true },
  },
  { timestamps: true }
);

interface ICategory {
  name: string;
  index: number;
  subCategories: string[];
}

export default class Category {
  private CategoryClc;

  constructor() {
    this.CategoryClc = model("category", categorySchema);
  }

  async getAllCategories() {
    return await this.CategoryClc.find({});
  }

  async addCategory(category: ICategory) {
    const categoryDoc = new this.CategoryClc({
      ...category,
      id: new Types.ObjectId(),
    });

    const data = await categoryDoc.save();

    return data;
  }

  async getCategoryById(id: string) {
    const category = await this.CategoryClc.findById(id);
    if (!category) {
      throw new Error("category.not.found");
    }
    return category;
  }
}
