const ACTIVE = 'ACTIVE';
const SET_DATA = 'SET_DATA';
const SET_BIG_PHOTO = 'SET_BIG_PHOTO';
const OPEN_CURRENCY = 'OPEN_CURRENCY';
const CURRENCY = 'CURRENCY';
const ADD_ATTRIBUTES = 'ADD_ATTRIBUTES';
const CLEAN_ATTRIBUTES = 'CLEAN_ATTRIBUTES';
const CHANGE_ATTRIBUTES = 'CHANGE_ATTRIBUTES';
const DELETE = 'DELETE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';

let initialState = {
  modal: false,
  bigPhoto: '',
  attributes: {},
  openCurrency: false,
  currency: '$ USD',
  totalCount: 0,
};

const pagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE:
      return {
        ...state,
        modal: action.modalActive,
      };
    case SET_DATA:
      return { ...state, data: action.data };
    case SET_BIG_PHOTO:
      return { ...state, bigPhoto: action.num };
    case OPEN_CURRENCY:
      return { ...state, openCurrency: action.open };
    case CURRENCY:
      return { ...state, currency: action.currencyValue };
    case ADD_ATTRIBUTES:
      return {
        ...state,
        attributes: { ...state.attributes, [action.attributes.id]: action.attributes.items[0].id },
      };
    case CLEAN_ATTRIBUTES:
      return { ...state, attributes: [] };
    case CHANGE_ATTRIBUTES:
      return {
        ...state,
        attributes: { ...state.attributes, [action.attribute]: action.item },
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.count,
      };

    default:
      return state;
  }
};
export const active = (modalActive) => ({ type: ACTIVE, modalActive });
export const setData = (data) => ({ type: SET_DATA, data });
export const setBigPhoto = (num) => ({ type: SET_BIG_PHOTO, num });
export const currencyField = (open) => ({ type: OPEN_CURRENCY, open });
export const setCurrency = (currencyValue) => ({ type: CURRENCY, currencyValue });
export const cleanAttributes = () => ({ type: CLEAN_ATTRIBUTES });
export const changeAttributes = (attribute, item) => ({ type: CHANGE_ATTRIBUTES, attribute, item });
export const addAttributes = (attributes) => ({
  type: ADD_ATTRIBUTES,
  attributes,
});
export const deleteItem = (id) => ({ type: DELETE, id });
export const setTotalCount = (count) => ({ type: SET_TOTAL_COUNT, count });

export default pagesReducer;
