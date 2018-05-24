import { UPDATE_DATA, UPDATE_TRANSACTION } from 'constants/action-types';


export function updateData(data) {
  return {
    type: UPDATE_DATA,
    payload: data
  };
}

export function updateTransaction(data) {
  return {
    type: UPDATE_TRANSACTION,
    payload: data
  };
}
