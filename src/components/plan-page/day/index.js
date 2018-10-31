import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  format,
  isToday,
  isTomorrow,
  isEqual,
  addDays,
  addMinutes,
  setHours,
  setMinutes,
} from 'date-fns'
import cn from 'classnames'
import Publication from './publication'
import Slot from './slot'
import SchedulePostButton from './schedule-post-button'
import Stats from './stats'
import ModalContent from './modal-content'
import withModal from './with-modal'
import { editPost } from '../../../actions'
import { createPostsAndSlotsSelector } from '../../../selectors'
import { MODAL_TYPES } from '../../../constants'
import styles from './styles.module.css'

function formatDate(day) {
  if (isToday(day)) return 'Today'
  else if (isTomorrow(day)) return 'Tomorrow'
  else return format(day, 'D MMMM')
}

class Day extends React.Component {
  constructor(props) {
    super(props)
    this.trigger = React.createRef()
    this.modal = React.createRef()
    this.content = React.createRef()
    this.state = {
      type: null,
      item: null,
      currentTime: format(new Date(), 'YYYY-MM-DDTHH:mm'),
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.checkCurrentTime, 30000)
  }

  shouldComponentUpdate(props, state) {
    if (state.currentTime !== this.state.currentTime) {
      return false
    }
    return true
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  checkCurrentTime = () => {
    this.setState(
      {
        currentTime: format(new Date(), 'YYYY-MM-DDTHH:mm'),
      },
      this.updateStatus
    )
  }

  updateStatus = () => {
    const { postsAndSlots, dispatch } = this.props
    postsAndSlots.forEach(item => {
      if (
        isEqual(
          format(item.time, 'YYYY-MM-DDTHH:mm'),
          this.state.currentTime
        ) &&
        item.status === 'scheduled'
      ) {
        dispatch(
          editPost({
            ...item,
            status: 'published',
          })
        )
      }
    })
  }

  showModal = (event, type, item) => {
    event.preventDefault()
    const modal = this.modal.current
    const trigger = event.currentTarget
    this.setState(
      {
        type,
        item,
      },
      () => {
        this.props.showModal(trigger, modal)
      }
    )
  }

  hideModal = () => {
    const modal = this.modal.current
    const content = this.content.current
    this.setState(
      {
        type: null,
        item: null,
      },
      () => {
        this.props.hideModal(modal, content)
      }
    )
  }

  render() {
    const { day, stats, postsAndSlots, fullStats } = this.props
    const { item, type } = this.state
    const isActive = isToday(day) || isTomorrow(day)
    return (
      <>
        <section className={styles.container}>
          <div className={styles.header}>
            <div className={styles.day}>
              <h1>{formatDate(day)}</h1>
              <span>{format(day, 'dddd')}</span>
            </div>
            {!isTomorrow(day) && <Stats fullStats={fullStats} {...stats} />}
          </div>
          <div className={styles.grid}>
            {postsAndSlots.map(item => {
              if (item.type === 'slot') {
                if (isActive)
                  return (
                    <Slot
                      className={styles.trigger}
                      key={item.time}
                      num={item.num}
                      time={new Date(item.time)}
                      onClick={event => {
                        this.showModal(event, MODAL_TYPES.SLOT, {
                          ...item,
                          title: 'New post',
                        })
                      }}
                    />
                  )
                return null
              }
              return (
                <Publication
                  key={item.id}
                  time={new Date(item.time)}
                  className={styles.trigger}
                  accounts={item.accounts}
                  body={item.body}
                  status={item.status}
                  stats={item.stats}
                  onClick={event => {
                    this.showModal(event, MODAL_TYPES.EDIT, {
                      ...item,
                      title: 'Edit post',
                    })
                  }}
                />
              )
            })}
            {isActive && (
              <SchedulePostButton
                className={styles.trigger}
                onClick={event => {
                  this.showModal(event, MODAL_TYPES.NEW, {
                    time: isToday(day)
                      ? addMinutes(new Date(), 1)
                      : addDays(setHours(setMinutes(new Date(), 0), 0), 1),
                    title: 'New post',
                  })
                }}
              />
            )}
          </div>
        </section>
        <div
          ref={this.modal}
          className={cn(styles.modal, styles['modal-bg'])}
          role="dialog"
          aria-hidden="true"
        >
          <div className={styles['modal-content']} ref={this.content}>
            {item && (
              <ModalContent onClose={this.hideModal} item={item} type={type} />
            )}
          </div>
        </div>
      </>
    )
  }
}

const postsAndSlotsSelector = createPostsAndSlotsSelector()

const mapStateToProps = (state, ownProps) => ({
  postsAndSlots: postsAndSlotsSelector(state, ownProps),
  isOpenModal: state.ui.isOpenModal,
  fullStats: state.data.fullStats,
})

export default compose(
  connect(mapStateToProps),
  withModal
)(Day)
