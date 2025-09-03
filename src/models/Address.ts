import { Schema, model, Document } from "mongoose";

export const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

export default class Address {
  private AddressClc;

  constructor() {
    this.AddressClc = model("address", AddressSchema);
  }

  async addAddress(address: Address) {
    const addressDoc = new this.AddressClc(address);
    const data = await addressDoc.save();
    return data;
  }

  async getAddressById(id: string) {
    const address = await this.AddressClc.findById(id);
    if (!address) {
      throw new Error("address.not.found");
    }
    return address;
  }
}
