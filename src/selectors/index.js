import { createSelector } from 'reselect'
import { format, compareAsc } from 'date-fns'
import { ITEM_TYPES } from '../constants'

export const createLoadingSelector = action =>
  createSelector(state => state.loading[action], loading => loading)

export const createErrorSelector = action =>
  createSelector(state => state.error[action] || '', error => error)

export const createPostsAndSlotsSelector = () =>
  createSelector(
    (state, ownProps) => {
      const formattedPublications = ownProps.publications.map(publication => ({
        ...publication,
        type: ITEM_TYPES.PUBLICATION,
        time: format(new Date(publication.time)),
      }))
      const formattedSlots = ownProps.slots.map((s, i) => ({
        type: ITEM_TYPES.SLOT,
        num: i + 1,
        time: format(new Date(`${format(ownProps.day, 'YYYY-MM-DD')}T${s}`)),
      }))
      return [...formattedPublications, ...formattedSlots]
        .sort((a, b) => compareAsc(a.time, b.time))
        .filter(
          i =>
            !(
              (i.type === ITEM_TYPES.SLOT &&
                compareAsc(i.time, new Date()) === -1) ||
              (i.type === ITEM_TYPES.SLOT &&
                formattedPublications.map(t => t.time).includes(i.time))
            )
        )
    },
    postsAndSlots => postsAndSlots
  )
