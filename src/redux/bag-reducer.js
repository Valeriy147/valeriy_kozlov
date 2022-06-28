const ADD_TO_BAG = 'ADD_TO_BAG';
const ADD_ATTRIBUTE = 'ADD_ATTRIBUTE';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const DELETE = 'DELETE';

let initialState = {};

const pagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BAG:
      return {
        ...state,
        [action.id]: { ...action.attributesObj, count: 1 },
      };
    case ADD_ATTRIBUTE:
      return {
        ...state,
        [action.id]: { ...state[action.id], [action.group]: action.item },
      };
    case INCREMENT:
      return {
        ...state,
        [action.id]: { ...state[action.id], ['count']: state[action.id]['count'] + 1 },
      };
    case DECREMENT:
      return {
        ...state,
        [action.id]: { ...state[action.id], ['count']: state[action.id]['count'] - 1 },
      };
    case DELETE:
      return action.state;
    default:
      return state;
  }
};
export const addToBag = (id, attributesObj) => ({ type: ADD_TO_BAG, id, attributesObj });
export const addAttribute = (id, group, item) => ({ type: ADD_ATTRIBUTE, id, group, item });
export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const deleteItem = (state) => ({ type: DELETE, state });
export default pagesReducer;
