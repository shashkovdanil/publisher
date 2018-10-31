import format from 'date-fns/format'
import addDays from 'date-fns/add_days'
import { merge } from 'ramda'
import {
  GET_DATA_SUCCESS,
  SCHEDULE_POST_SUCCESS,
  EDIT_POST_SUCCESS,
  REMOVE_POST_SUCCESS,
} from '../constants/action-types'

const today = format(new Date(), 'YYYY-MM-DD')
const tomorrow = format(addDays(new Date(), 1), 'YYYY-MM-DD')

const EMPTY_DAY = {
  publications: [],
  stats: {
    followers: 0,
    likes: 0,
    shared: 0,
    comments: 0,
  },
}

const INITIAL_STATE = {
  days: {
    [today]: EMPTY_DAY,
    [tomorrow]: EMPTY_DAY,
  },
  accounts: [],
  multipleAccounts: [],
  slots: [],
  fullStats: {
    followers: 0,
    likes: 0,
    shared: 0,
    comments: 0,
  },
}

function data(state = INITIAL_STATE, action) {
  const { type, payload } = action
  switch (type) {
    case GET_DATA_SUCCESS: {
      const accsSocial = payload.settings.accounts.map(i => i['social-network'])
      const sorted = accsSocial.sort()
      let multiple = []
      for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i + 1] === sorted[i]) {
          multiple.push(sorted[i])
        }
      }
      return {
        days: merge(state.days, payload.days),
        accounts: payload.settings.accounts,
        multipleAccounts: multiple,
        slots: payload.settings.slots,
        fullStats: payload['total-stats'],
      }
    }
    case SCHEDULE_POST_SUCCESS: {
      const day = format(payload.time, 'YYYY-MM-DD')
      return {
        ...state,
        days: {
          ...state.days,
          [day]: {
            ...state.days[day],
            publications: [...state.days[day].publications, payload],
          },
        },
      }
    }
    case EDIT_POST_SUCCESS: {
      const day = format(payload.time, 'YYYY-MM-DD')
      return {
        ...state,
        days: {
          ...state.days,
          [day]: {
            ...state.days[day],
            publications: state.days[day].publications.map(
              publication =>
                publication.id === payload.id
                  ? {
                      ...payload,
                    }
                  : publication
            ),
          },
        },
      }
    }
    case REMOVE_POST_SUCCESS: {
      const day = format(payload.time, 'YYYY-MM-DD')
      return {
        ...state,
        days: {
          ...state.days,
          [day]: {
            ...state.days[day],
            publications: state.days[day].publications.filter(
              i => i.id !== payload.id
            ),
          },
        },
      }
    }
    default:
      return state
  }
}

export default data
