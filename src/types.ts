export type Ingredient_t = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export enum OrderStatus_t {
  BEING_COOKED,
  COOKED,
  BEING_DELIVERED,
  DELIVERED,
}

export type OrderDetails_t = {
  id: number;
  status: OrderStatus_t;
  message: string;
};
