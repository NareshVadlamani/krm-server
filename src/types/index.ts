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
