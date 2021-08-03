import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidV4 } from 'uuid';
import {
  ActualIngredient_t,
  ActualIngredientType,
  Ingredient_t,
  IngredientType,
  OrderDetails_t,
} from '../../types';
import {
  fetchIngredients as apiFetchIngredients,
  placeAnOrder as apiPlaceAnOrder,
} from '../api';

const generateIngredientId = () => uuidV4();

const initialState: Readonly<{
  actualIngredients: ActualIngredient_t[];
  detailedIngredient: Ingredient_t | null;
  idToIngredientMap: { [key: string]: Ingredient_t };
  idToActualIngredientsCountMap: { [key: string]: number };
  ingredients: Ingredient_t[];
  ingredientsError: unknown | null;
  ingredientsRequest: boolean;
  orderDetails: OrderDetails_t | null;
  orderDetailsError: unknown | null;
  orderDetailsRequest: boolean;
  totalAmount: number;
}> = {
  actualIngredients: [],
  detailedIngredient: null,
  idToActualIngredientsCountMap: {},
  idToIngredientMap: {},
  ingredients: [],
  ingredientsError: null,
  ingredientsRequest: true,
  orderDetails: null,
  orderDetailsError: null,
  orderDetailsRequest: false,
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

export const fetchIngredients = createAsyncThunk(
  'burger/fetchIngredients',
  apiFetchIngredients
);

export const placeAnOrder = createAsyncThunk(
  'burger/placeAnOrder',
  async (ingredients: Ingredient_t['_id'][]) => {
    if (ingredients.length === 0) {
      throw new Error(
        'Unable to place an order for the empty ingredients list'
      );
    }

    return apiPlaceAnOrder(ingredients);
  }
);

const slice = createSlice({
  name: 'burger',
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
      state.idToActualIngredientsCountMap =
        buildIdToActualIngredientsCountMap(state);
    },
    moveIngredient(
      state,
      { payload: [fromIndex, toIndex] }: PayloadAction<[number, number]>
    ) {
      const { actualIngredients: actualIngredientsFromState } = state;
      const actualIngredients = [...actualIngredientsFromState];

      actualIngredients.splice(
        toIndex,
        0,
        actualIngredients.splice(fromIndex, 1)[0]
      );

      state.actualIngredients = actualIngredients;
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
        state.idToActualIngredientsCountMap =
          buildIdToActualIngredientsCountMap(state);
      }
    },
    resetDetailedIngredient(state) {
      state.detailedIngredient = null;
    },
    resetOrderDetails(state) {
      if (!state.orderDetailsRequest) {
        Object.assign(state, {
          orderDetails: null,
          orderDetailsError: null,
          orderDetailsRequest: false,
        });
      }
    },
    setDetailedIngredient(state, action: PayloadAction<Ingredient_t>) {
      state.detailedIngredient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        Object.assign(state, {
          ...initialState,
          ingredientsRequest: true,
        });
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, { payload: ingredients }: PayloadAction<Ingredient_t[]>) => {
          const idToIngredientMap: InitialState_t['idToIngredientMap'] = {};

          ingredients.forEach((ingredient) => {
            idToIngredientMap[ingredient._id] = ingredient;
          });

          Object.assign(state, {
            idToIngredientMap,
            ingredients,
            ingredientsRequest: false,
          });
        }
      )
      .addCase(
        fetchIngredients.rejected,
        (
          state,
          { error }: PayloadAction<unknown, string, unknown, unknown>
        ) => {
          Object.assign(state, {
            ingredientsError: error,
            ingredientsRequest: false,
          });
        }
      );
    builder
      .addCase(placeAnOrder.pending, (state) => {
        Object.assign(state, {
          orderDetails: null,
          orderDetailsError: null,
          orderDetailsRequest: true,
        });
      })
      .addCase(
        placeAnOrder.fulfilled,
        (state, { payload: orderDetails }: PayloadAction<OrderDetails_t>) => {
          Object.assign(state, {
            orderDetails,
            orderDetailsRequest: false,
          });
        }
      )
      .addCase(
        placeAnOrder.rejected,
        (
          state,
          { error }: PayloadAction<unknown, string, unknown, unknown>
        ) => {
          Object.assign(state, {
            orderDetailsError: error,
            orderDetailsRequest: false,
          });
        }
      );
  },
});

const { reducer } = slice;

export { reducer as burgerReducer };

export const {
  addIngredient,
  moveIngredient,
  removeIngredient,
  resetDetailedIngredient,
  resetOrderDetails,
  setDetailedIngredient,
} = slice.actions;
