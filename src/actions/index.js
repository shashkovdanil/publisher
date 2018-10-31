import nanoid from 'nanoid'
import compareAsc from 'date-fns/compare_asc'
import * as types from '../constants/action-types'
import { delay } from '../utils'

const mock = require('../mock.json')

export const getData = () => dispatch => {
  dispatch({ type: types.GET_DATA_REQUEST })
  delay(2500)
    .then(() => {
      dispatch({ type: types.GET_DATA_SUCCESS, payload: mock })
    })
    .catch(e => {
      dispatch({ type: types.GET_DATA_ERROR, payload: e.message, error: true })
    })
}

export const schedulePost = ({ time, accounts, body }, cb) => dispatch => {
  const newPost = {
    id: nanoid(16),
    status: 'scheduled',
    time,
    accounts,
    body,
    stats: {
      followers: 0,
      likes: 0,
      shared: 0,
      comments: 0,
    },
  }
  dispatch({ type: types.SCHEDULE_POST_REQUEST })
  if (compareAsc(new Date(), new Date(time)) === 1) {
    dispatch({
      type: types.SCHEDULE_POST_ERROR,
      payload: {
        message: 'Incorrect date',
      },
      error: true,
    })
    return
  }
  delay(2500)
    .then(() => {
      if (typeof cb === 'function') cb()
      dispatch({
        type: types.SCHEDULE_POST_SUCCESS,
        payload: newPost,
      })
    })
    .catch(e => {
      dispatch({
        type: types.SCHEDULE_POST_ERROR,
        payload: e.message,
        error: true,
      })
    })
}

export const editPost = (item, cb) => dispatch => {
  dispatch({ type: types.EDIT_POST_REQUEST })
  if (compareAsc(new Date(), new Date(item.time)) === 1) {
    dispatch({
      type: types.EDIT_POST_ERROR,
      payload: {
        message: 'Incorrect date',
      },
      error: true,
    })
    return
  }
  delay(2500)
    .then(() => {
      if (typeof cb === 'function') cb()
      dispatch({
        type: types.EDIT_POST_SUCCESS,
        payload: item,
      })
    })
    .catch(e => {
      dispatch({ type: types.EDIT_POST_ERROR, payload: e.message, error: true })
    })
}

export const removePost = (item, cb) => dispatch => {
  dispatch({ type: types.REMOVE_POST_REQUEST })
  delay(2500)
    .then(() => {
      if (typeof cb === 'function') cb()
      dispatch({
        type: types.REMOVE_POST_SUCCESS,
        payload: { id: item.id, time: item.time },
      })
    })
    .catch(e => {
      dispatch({
        type: types.REMOVE_POST_ERROR,
        payload: e.message,
        error: true,
      })
    })
}
