export interface AdditionalAction {
  title: string;
  url: string;
  urlTitle: string;
}

export enum ActualIngredientType {
  top = 'top',
  bottom = 'bottom',
}

export type ActualIngredient_t = {
  id: string;
  refId: string;
  isLocked?: boolean;
  type?: ActualIngredientType;
};

export enum DraggableTypes {
  ingredient = 'ingredient',
  actualIngredient = 'actualIngredient',
}

export enum IngredientType {
  bun = 'bun',
  sauce = 'sauce',
  main = 'main',
}

export type Ingredient_t = {
  _id: string;
  name: string;
  type: IngredientType;
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

export type IngredientDragItem = {
  refId: Ingredient_t['_id'];
  type: IngredientType;
};

export type ActualIngredientDragItem = {
  index: number;
};

export enum OrderStatus_t {
  created = 'created',
  pending = 'pending',
  done = 'done',
}

export type OrderDetails_t = {
  id: number;
  status: OrderStatus_t;
  message: string;
};

export interface User {
  email: string;
  name: string;
}

export interface RefreshTokensResponse {
  accessSchema: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserResponse {
  user: User;
}

export type AuthUserResponse = RefreshTokensResponse & UserResponse;

export interface Order {
  _id: string;
  ingredients: string[];
  status: OrderStatus_t;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}
