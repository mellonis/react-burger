import { v4 } from 'uuid';
import { IngredientType } from '../../types';
import * as apiModule from '../api';
import {
  addIngredient,
  burgerReducer,
  fetchIngredients,
  InitialState_t,
  moveIngredient,
  placeAnOrder,
  removeIngredient,
} from './burger';

jest.mock('../api', () => ({
  fetchIngredients: jest.fn(),
  placeAnOrder: jest.fn(),
}));
jest.mock('uuid');

const aBun = Object.freeze({
  _id: '60d3b41abdacab0026a733c6',
  name: 'Краторная булка N-200i',
  type: IngredientType.bun,
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
});
const anotherBun = Object.freeze({
  _id: '60d3b41abdacab0026a733c7',
  name: 'Флюоресцентная булка R2-D3',
  type: IngredientType.bun,
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  __v: 0,
});
const aSauce = Object.freeze({
  _id: '60d3b41abdacab0026a733cc',
  name: 'Соус Spicy-X',
  type: IngredientType.sauce,
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
});

describe('burger reducer', () => {
  const initialState = Object.freeze({
    actualIngredients: [],
    idToActualIngredientsCountMap: {},
    idToIngredientMap: {},
    ingredients: [],
    ingredientsError: null,
    ingredientsRequest: true,
    orderDetails: null,
    orderDetailsError: null,
    orderDetailsRequest: false,
    totalAmount: 0,
  });

  afterAll(() => {
    jest.unmock('uuid');
    jest.unmock('../api');
  });

  it('has initial state', () => {
    expect(burgerReducer(undefined, { type: 'some action' })).toEqual(
      initialState
    );
  });

  describe('fetchIngredients', () => {
    it('updates state with fetchIngredients result (pending)', () => {
      const state = burgerReducer(initialState, {
        type: 'burger/fetchIngredients/pending',
      });

      expect(state.ingredientsRequest).toEqual(true);
    });

    it('updates state with placeAnOrder result (rejected)', () => {
      const error = Symbol('error');
      const state = burgerReducer(initialState, {
        type: 'burger/fetchIngredients/rejected',
        error,
      });

      expect(state.ingredientsRequest).toEqual(false);
      expect(state.ingredientsError).toEqual(error);
    });

    it('correctly calls fetchIngredients', async () => {
      const action = fetchIngredients();
      const dispatch = jest.fn();
      const getState = jest.fn();

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'burger/fetchIngredients/pending',
        'burger/fetchIngredients/fulfilled',
      ]);
      expect(apiModule.fetchIngredients).toHaveBeenCalledTimes(1);
    });
  });

  describe('placeAnOrder', () => {
    it("doesn't call placeAnOrder if ingredient list is empty", async () => {
      const action = placeAnOrder([]);
      const dispatch = jest.fn();
      const getState = jest.fn();

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'burger/placeAnOrder/pending',
        'burger/placeAnOrder/rejected',
      ]);
      expect(apiModule.placeAnOrder).toHaveBeenCalledTimes(0);
    });

    it("doesn't call placeAnOrder if not authenticated", async () => {
      const action = placeAnOrder([aBun._id, aSauce._id, aBun._id]);
      const dispatch = jest.fn();
      const getState = jest.fn();

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'burger/placeAnOrder/pending',
        'burger/placeAnOrder/rejected',
      ]);
      expect(apiModule.placeAnOrder).toHaveBeenCalledTimes(0);
    });

    it('correctly call placeAnOrder', async () => {
      const ingredientIds = [aBun._id, aSauce._id, aSauce._id, aBun._id];
      const action = placeAnOrder(ingredientIds);
      const dispatch = jest.fn();
      const getState = jest.fn();

      document.cookie = `accessSchema=accessSchema`;
      document.cookie = `accessToken=accessToken`;

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'burger/placeAnOrder/pending',
        'burger/placeAnOrder/fulfilled',
      ]);
      expect(apiModule.placeAnOrder).toHaveBeenCalledTimes(1);
      expect((apiModule.placeAnOrder as jest.Mock).mock.calls[0][0]).toEqual({
        auth: { accessSchema: 'accessSchema', accessToken: 'accessToken' },
        ingredients: ingredientIds,
      });
    });

    it('updates state with placeAnOrder result (pending)', () => {
      const state = burgerReducer(initialState, {
        type: 'burger/placeAnOrder/pending',
      });

      expect(state.orderDetailsRequest).toEqual(true);
    });

    it('updates state with placeAnOrder result (rejected)', () => {
      const error = Symbol('error');
      const state = burgerReducer(initialState, {
        type: 'burger/placeAnOrder/rejected',
        error,
      });

      expect(state.orderDetailsRequest).toEqual(false);
      expect(state.orderDetailsError).toEqual(error);
    });

    it('updates state with placeAnOrder result', () => {
      const orderDetails = Symbol('order details');

      const state = burgerReducer(initialState, {
        type: 'burger/placeAnOrder/fulfilled',
        payload: orderDetails,
      });

      expect(state.orderDetails).toEqual(orderDetails);
    });
  });

  describe('burger constructor', () => {
    const fetchedIngredients = [aBun, anotherBun, aSauce];
    let state: InitialState_t;

    beforeEach(async () => {
      (apiModule.fetchIngredients as jest.Mock).mockResolvedValueOnce(
        fetchedIngredients
      );

      state = JSON.parse(JSON.stringify(initialState));

      const action = fetchIngredients();
      const dispatch = jest.fn((action) => {
        state = burgerReducer(state, action);
      });
      const getState = jest.fn();

      await action(dispatch, getState, undefined);

      let i = 1;

      (v4 as jest.Mock).mockImplementation(() => String(i++));
    });

    it('simulate fetching', () => {
      expect(apiModule.fetchIngredients).toHaveBeenCalledTimes(1);
      expect(state.ingredients).toEqual(fetchedIngredients);
      expect(Object.keys(state.idToIngredientMap)).toEqual(
        fetchedIngredients.map(({ _id: id }) => id)
      );
      expect(Object.values(state.idToIngredientMap)).toEqual(
        fetchedIngredients
      );
    });

    it('handles addIngredient action (a bun)', async () => {
      state = burgerReducer(state, addIngredient(aBun));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);
      expect(state.totalAmount).toEqual(aBun.price * 2);
    });

    it('handles addIngredient action (a bun) twice', async () => {
      state = burgerReducer(state, addIngredient(aBun));
      state = burgerReducer(state, addIngredient(anotherBun));

      expect(state.actualIngredients).toEqual([
        { id: '3', isLocked: true, refId: anotherBun._id, type: 'top' },
        { id: '4', isLocked: true, refId: anotherBun._id, type: 'bottom' },
      ]);
      expect(state.totalAmount).toEqual(anotherBun.price * 2);
    });

    it('handles removeIngredient (a bun)', async () => {
      state = burgerReducer(state, addIngredient(aBun));
      state = burgerReducer(state, removeIngredient(aBun._id));

      expect(state.actualIngredients.length).toEqual(2);
    });

    it('handles addIngredient action (not a bun, without a bun)', async () => {
      state = burgerReducer(state, addIngredient(aSauce));

      expect(state.actualIngredients).toEqual([]);
      expect(state.totalAmount).toEqual(0);
    });

    it('handles addIngredient action (not a bun, with a bun)', async () => {
      state = burgerReducer(state, addIngredient(aBun));
      state = burgerReducer(state, addIngredient(aSauce));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '3', refId: aSauce._id },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);
      expect(state.totalAmount).toEqual(aBun.price * 2 + aSauce.price);
    });

    it('handles moveIngredient action', () => {
      state = burgerReducer(state, addIngredient(aBun));
      state = burgerReducer(state, addIngredient(aSauce));
      state = burgerReducer(state, addIngredient(aSauce));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '3', refId: aSauce._id },
        { id: '4', refId: aSauce._id },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);

      state = burgerReducer(state, moveIngredient([1, 2]));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '4', refId: aSauce._id },
        { id: '3', refId: aSauce._id },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);

      state = burgerReducer(state, moveIngredient([1, 2]));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '3', refId: aSauce._id },
        { id: '4', refId: aSauce._id },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);

      state = burgerReducer(state, moveIngredient([1, 1]));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '3', refId: aSauce._id },
        { id: '4', refId: aSauce._id },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);
    });

    it('handles moveIngredient action (swap with a bun)', () => {
      state = burgerReducer(state, addIngredient(aBun));
      state = burgerReducer(state, addIngredient(aSauce));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '3', refId: aSauce._id },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);

      state = burgerReducer(state, moveIngredient([0, 1]));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '3', refId: aSauce._id },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);

      state = burgerReducer(state, moveIngredient([1, 0]));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '3', refId: aSauce._id },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);

      state = burgerReducer(state, moveIngredient([1, 2]));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '3', refId: aSauce._id },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);

      state = burgerReducer(state, moveIngredient([2, 1]));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '3', refId: aSauce._id },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);
    });

    it('handles removeIngredient action (keep buns)', () => {
      state = burgerReducer(state, addIngredient(aBun));
      state = burgerReducer(state, addIngredient(aSauce));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '3', refId: aSauce._id },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);

      state = burgerReducer(state, removeIngredient('1'));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '3', refId: aSauce._id },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);

      state = burgerReducer(state, removeIngredient('2'));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '3', refId: aSauce._id },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);
    });

    it('handles removeIngredient action', () => {
      state = burgerReducer(state, addIngredient(aBun));
      state = burgerReducer(state, addIngredient(aSauce));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '3', refId: aSauce._id },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);

      state = burgerReducer(state, removeIngredient('3'));

      expect(state.actualIngredients).toEqual([
        { id: '1', isLocked: true, refId: aBun._id, type: 'top' },
        { id: '2', isLocked: true, refId: aBun._id, type: 'bottom' },
      ]);
    });
  });
});
