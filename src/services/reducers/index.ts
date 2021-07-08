import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActualIngredient_t,
  ActualIngredientType,
  Ingredient_t,
  IngredientType,
  OrderDetails_t,
} from '../../types';
import { v4 as uuidv4 } from 'uuid';

const generateIngredientId = () => uuidv4();

const initialState: {
  actualIngredients: ActualIngredient_t[];
  detailedIngredient: Ingredient_t | null;
  idToIngredientMap: { [key: string]: Ingredient_t };
  idToActualIngredientsCountMap: { [key: string]: number };
  ingredients: Ingredient_t[];
  orderDetails: OrderDetails_t | null;
  totalAmount: number;
} = {
  actualIngredients: [],
  detailedIngredient: null,
  idToActualIngredientsCountMap: {},
  idToIngredientMap: {},
  ingredients: [],
  orderDetails: null,
  totalAmount: 0,
};

type InitialState_t = typeof initialState;

const calcTotal = ({
  actualIngredients,
  idToIngredientMap,
}: InitialState_t) => {
  const ingredientIds = actualIngredients.map(({ refId }) => refId);

  return ingredientIds.reduce((result, refId) => {
    const { price } = idToIngredientMap[refId]!;

    return result + price;
  }, 0);
};

const buildIdToActualIngredientsCountMap = ({
  actualIngredients,
}: InitialState_t): InitialState_t['idToActualIngredientsCountMap'] =>
  actualIngredients.reduce((map, actualIngredient) => {
    if (Object.prototype.hasOwnProperty.call(map, actualIngredient.refId)) {
      map[actualIngredient.refId] += 1;
    } else {
      map[actualIngredient.refId] = 1;
    }

    return map;
  }, {} as InitialState_t['idToActualIngredientsCountMap']);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addIngredient(state, { payload: ingredient }: PayloadAction<Ingredient_t>) {
      const { actualIngredients } = state;
      const { _id, type } = ingredient;

      if (type === IngredientType.bun) {
        const [topBun, bottomBun] = [
          ActualIngredientType.top,
          ActualIngredientType.bottom,
        ].map((type) => ({
          id: generateIngredientId(),
          type,
          isLocked: true,
          refId: _id,
        }));

        state.actualIngredients = [
          topBun,
          ...actualIngredients.slice(1, -1),
          bottomBun,
        ];
      } else {
        const newValue = [...actualIngredients];

        newValue.splice(-1, 0, {
          id: generateIngredientId(),
          refId: _id,
        });

        state.actualIngredients = newValue;
      }

      state.totalAmount = calcTotal(state);
      state.idToActualIngredientsCountMap = buildIdToActualIngredientsCountMap(
        state
      );
    },
    removeIngredient(
      state,
      { payload: idToRemove }: PayloadAction<ActualIngredient_t['id']>
    ) {
      const { actualIngredients } = state;
      const removableIngredients = state.actualIngredients.slice(1, -1);

      if (removableIngredients.map(({ id }) => id).includes(idToRemove)) {
        state.actualIngredients = [
          actualIngredients[0],
          ...removableIngredients.filter(({ id }) => id !== idToRemove),
          actualIngredients[actualIngredients.length - 1],
        ];
        state.totalAmount = calcTotal(state);
        state.idToActualIngredientsCountMap = buildIdToActualIngredientsCountMap(
          state
        );
      }
    },
    resetDetailedIngredient(state) {
      state.detailedIngredient = null;
    },
    resetOrderDetails(state) {
      state.orderDetails = null;
    },
    setDetailedIngredient(state, action: PayloadAction<Ingredient_t>) {
      state.detailedIngredient = action.payload;
    },
    setIngredients(
      state,
      { payload: ingredients }: PayloadAction<Ingredient_t[]>
    ) {
      state.ingredients = ingredients;
      state.idToIngredientMap = {};
      ingredients.forEach((ingredient) => {
        state.idToIngredientMap[ingredient._id] = ingredient;
      });
    },
    setOrderDetails(state, action: PayloadAction<OrderDetails_t>) {
      state.orderDetails = action.payload;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  resetDetailedIngredient,
  resetOrderDetails,
  setDetailedIngredient,
  setIngredients,
  setOrderDetails,
} = appSlice.actions;
export default appSlice.reducer;
