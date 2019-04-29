import * as actionTypes from './actionTypes';

export function save(value) {
  return {
    type: actionTypes.SAVE,
    data: value
  };
}

export function edit(data) {
  return {
    type: actionTypes.EDIT,
    data: { id: data['id'], comment: data['comment'] }
  };
}

export function remove(data) {
  return {
    type: actionTypes.DELETE,
    data: { id: data['id'], deleted: data['deleted'] }
  };
}
