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
  id: ActualIngredient_t['id'];
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
