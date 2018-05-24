import _ from 'lodash';
import { UPDATE_DATA, UPDATE_TRANSACTION } from 'constants/action-types';
import data from '../static/data';

const initialState = {
  transactions: data,
  backup: data,
};

export default function app(state = initialState, action) {
  let updatedBackup;
  let index;
  switch (action.type) {
    case UPDATE_DATA:
      return { ...state, transactions: action.payload };
    case UPDATE_TRANSACTION:
      index = _.findIndex(state.backup, (e) => e.id === action.payload.id);
      updatedBackup = state.backup;
      updatedBackup[index].emotion = action.payload.emotion;
      return { ...state, backup: updatedBackup };
    default:
      return state;
  }
}
