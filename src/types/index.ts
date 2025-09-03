export type ICategory = {
  name: string;
  index: number;
  subCategories: string[];
};

export type IProduct = {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type ICart = {
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
};

export type IOrder = {
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  address: IAddress;
  paymentMethod: string;
  paymentStatus: boolean;
};

export type IAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type IUser = {
  name: string;
  email: string;
  address: IAddress;
  password: string;
};
