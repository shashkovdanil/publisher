import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { groupBy } from 'ramda'
import cn from 'classnames'
import { format, setHours, setMinutes } from 'date-fns'
import onClickOutside from 'react-onclickoutside'
import { Button, TimePicker } from '../../common'
import { Cross } from '../../common/icons'
import Profile from '../profile'
import { MODAL_TYPES } from '../../../../constants'
import { schedulePost, editPost, removePost } from '../../../../actions'
import {
  createLoadingSelector,
  createErrorSelector,
} from '../../../../selectors'
import styles from './styles.module.css'

class ModalContent extends React.PureComponent {
  state = {
    selectedAccounts: this.props.selectedAccounts,
    body: this.props.body,
    time: this.props.time,
  }

  selectAccount = account => {
    this.setState(prevState => {
      if (prevState.selectedAccounts.find(i => i.id === account.id)) {
        return {
          selectedAccounts: prevState.selectedAccounts.filter(
            i => i.id !== account.id
          ),
        }
      }
      return {
        selectedAccounts: [...prevState.selectedAccounts, account],
      }
    })
  }

  onChange = e => {
    this.setState({
      body: e.target.value,
    })
  }

  schedulePost = event => {
    event.preventDefault()
    const { dispatch, onClose } = this.props
    const { time, body, selectedAccounts } = this.state
    dispatch(
      schedulePost(
        {
          accounts: selectedAccounts,
          time,
          body,
        },
        onClose
      )
    )
  }

  removePost = event => {
    event.preventDefault()
    const { dispatch, onClose, item } = this.props
    dispatch(removePost(item, onClose))
  }

  editPost = event => {
    event.preventDefault()
    const { dispatch, onClose, item } = this.props
    const { time, body, selectedAccounts } = this.state
    dispatch(
      editPost(
        {
          ...item,
          accounts: selectedAccounts,
          time,
          body,
        },
        onClose
      )
    )
  }

  handleClickOutside = () => {
    const { loaders, onClose } = this.props
    if (Object.values(loaders).some(i => i === true)) return
    onClose()
  }

  renderButtons = () => {
    const { type, loaders, errors } = this.props
    const { selectedAccounts, body } = this.state
    const isDisabled = !selectedAccounts.length || !body
    switch (type) {
      case MODAL_TYPES.NEW:
      case MODAL_TYPES.SLOT:
        return (
          <div className={cn(styles.buttons, styles['single-button'])}>
            <Button
              onClick={e => {
                this.schedulePost(e)
              }}
              disabled={isDisabled}
              fetching={loaders.schedule}
            >
              Schedule post
            </Button>
            {errors &&
              errors.schedule && (
                <span className={styles.error}>{errors.schedule}</span>
              )}
          </div>
        )
      case MODAL_TYPES.EDIT:
        return (
          <div className={styles.buttons}>
            <Button
              disabled={loaders.remove}
              onClick={e => {
                this.removePost(e)
              }}
              className={styles['remove-button']}
              fetching={loaders.remove}
            >
              Remove
            </Button>
            <Button
              onClick={e => {
                this.editPost(e)
              }}
              disabled={isDisabled || loaders.edit}
              className={styles.button}
              fetching={loaders.edit}
            >
              Edit
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const { accounts, item } = this.props
    const { selectedAccounts, time, body } = this.state
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>{item.title}</h3>
          <button onClick={this.handleClickOutside} className={styles.close}>
            <Cross />
          </button>
        </div>
        <form className={styles.form}>
          <div className={styles['when-block']}>
            <span className={styles.when}>When to publish:</span>{' '}
            <span className={styles.date}>{format(time, 'MMMM, D, ddd')}</span>{' '}
            <span className={styles.at}>at</span>
            <TimePicker
              time={item.time}
              hour={format(time, 'HH')}
              min={format(time, 'mm')}
              selectHour={hour =>
                this.setState(prevState => ({
                  time: format(setHours(prevState.time, hour)),
                }))
              }
              selectMin={min =>
                this.setState(prevState => ({
                  time: format(setMinutes(prevState.time, min)),
                }))
              }
            />
            <span className={styles.utc}>
              UTC +{Math.abs(new Date().getTimezoneOffset() / 60)}
            </span>
          </div>
          <div className={styles.post}>
            <div className={styles.accounts}>
              {Object.keys(accounts).map(social => {
                if (accounts[social].length > 1) {
                  return accounts[social].map(account => (
                    <div
                      key={account.id}
                      className={
                        !!selectedAccounts.find(i => i.id === account.id)
                          ? styles['is-selected']
                          : styles['not-selected']
                      }
                      onClick={() => this.selectAccount(account)}
                    >
                      <Profile
                        hasSeveralAccounts
                        key={account.id}
                        social={social}
                        avatarUrl={account.photo}
                      />
                    </div>
                  ))
                }
                const [account] = accounts[social]
                return (
                  <div
                    key={account.id}
                    className={
                      !!selectedAccounts.find(i => i.id === account.id)
                        ? styles['is-selected']
                        : styles['not-selected']
                    }
                    onClick={() => this.selectAccount(account)}
                  >
                    <Profile
                      key={account.id}
                      social={social}
                      avatarUrl={account.photo}
                    />
                  </div>
                )
              })}
            </div>
            <textarea
              name="body"
              value={body}
              onChange={this.onChange}
              placeholder="Text and links"
              className={styles.body}
            />
          </div>
          {this.renderButtons()}
        </form>
      </div>
    )
  }
}

const bySocialNetwork = groupBy(account => account['social-network'])

const scheduleLoadingSelector = createLoadingSelector('SCHEDULE_POST')
const editLoadingSelector = createLoadingSelector('EDIT_POST')
const removeLoadingSelector = createLoadingSelector('REMOVE_POST')

const scheduleErrorSelector = createErrorSelector('SCHEDULE_POST')

const mapStateToProps = (state, ownProps) => ({
  loaders: {
    schedule: scheduleLoadingSelector(state),
    edit: editLoadingSelector(state),
    remove: removeLoadingSelector(state),
  },
  errors: {
    schedule: scheduleErrorSelector(state),
  },
  accounts: bySocialNetwork(state.data.accounts),
  selectedAccounts: ownProps.item.accounts || [],
  time: ownProps.item.time,
  body: ownProps.item.body || '',
  item: ownProps.item,
})

export default compose(
  connect(mapStateToProps),
  onClickOutside
)(ModalContent)
