import * as types from 'actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
  data: [{
    bac_id: 'No data',
    chart_data:[]}],
  drawing_idx: 0,
  status: {
    add: false,
    del: false,
    run: false
  }
};

export default function bacteria(state, action) {
    if(typeof state === "undefined")
      state = initialState;

    switch (action.type) {
      case types.SELECT_DATA:
        return update(state, {
          drawing_idx: {$set: action.idx}
        });
      case types.CHANGE_DATA:
        return update(state, {
          data: {$set: action.state},
          drawing_idx: {$set: 0}
        });
      case types.WAITING_ADD:
        return update(state, {
          status: {
            add: {$set: action.state}
          }
        });
      case types.WAITING_DEL:
        return update(state, {
          status: {
            del: {$set: action.state}
          }
        });
      case types.WAITING_RUN:
        return update(state, {
          status: {
            run: {$set: action.state}
          }
        });
      default:
        return state;
    }
}
