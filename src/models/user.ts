import { json } from "express";
import { model, Schema, Types } from "mongoose";
const hobbyId = {
  id: { type: Schema.Types.ObjectId, ref: "Hobby" },
};

const user = new Schema({
  name: { type: String, required: true },
  hobbies: [hobbyId],
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

  async addUser(userName: string) {
    const _id = new Types.ObjectId();
    const userModel = new this.UserClc({ _id, name: userName, hobbies: [] });
    await userModel.save();
  }

  async findById(id: string) {
    const data = await this.UserClc.find({ _id: id });
    return data;
  }

  async updateUserHobbies(_id: string, hobbyId: string) {
    this.UserClc.findOneAndUpdate(
      { _id },
      {
        $push: {
          hobbies: hobbyId,
        },
      },
      {
        new: true,
      },
      (err, res) => {
        if (err) {
          console.log("Error.updateUserHobbies", err);
        } else {
          console.log("hobby added to the user");
        }
      }
    );
  }
}
