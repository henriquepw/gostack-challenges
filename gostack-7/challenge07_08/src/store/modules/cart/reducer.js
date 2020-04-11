import produce from 'immer';

function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        draft.push(action.product);
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const index = draft.findIndex(p => p.id === action.id);

        if (index >= 0) draft.splice(index, 1);
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS':
      return produce(state, draft => {
        const index = draft.findIndex(p => p.id === action.id);

        if (index >= 0) draft[index].amount = Number(action.amount);
      });
    default:
      return state;
  }
}

export default cart;
