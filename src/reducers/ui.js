import { OPEN_MODAL, CLOSE_MODAL } from '../constants/action-types'

const INITIAL_STATE = {
  isOpenModal: false,
}

function ui(state = INITIAL_STATE, action) {
  if (action.type === OPEN_MODAL) {
    return {
      ...state,
      isOpenModal: true,
    }
  } else if (action.type === CLOSE_MODAL) {
    return {
      ...state,
      isOpenModal: false,
    }
  }
  return state
}

export default ui
