import React from 'react'
import { connect } from 'react-redux'
import format from 'date-fns/format'
import { groupBy } from 'ramda'
import {
  string,
  instanceOf,
  func,
  arrayOf,
  oneOfType,
  object,
} from 'prop-types'
import cn from 'classnames'
import Profile from '../profile'
import Stats from '../stats'
import styles from './styles.module.css'

const Publication = ({
  time,
  accounts,
  body,
  status,
  stats,
  onClick,
  className = '',
  multipleAccounts,
  isUpdate,
}) => {
  const bySocialNetwork = groupBy(account => account['social-network'])
  const gruppedAccounts = bySocialNetwork(accounts)
  return (
    <div
      className={cn(styles.container, {
        [styles['is-published']]: status === 'published',
      })}
      onClick={onClick}
    >
      <div className={styles.header}>
        <p className={styles.time}>{format(time, 'HH:mm')}</p>
        <div className={styles.socials}>
          {Object.keys(gruppedAccounts).map(social => {
            if (multipleAccounts.includes(social)) {
              return gruppedAccounts[social].map(account => (
                <Profile
                  hasSeveralAccounts
                  key={account.id}
                  social={social}
                  avatarUrl={account.photo}
                />
              ))
            }
            const [account] = gruppedAccounts[social]
            return (
              <Profile
                key={account.id}
                social={social}
                avatarUrl={account.photo}
              />
            )
          })}
        </div>
      </div>
      <p className={styles.body}>{body}</p>
      {status === 'published' ? (
        <div className={styles['overflow-gradient']}>
          <Stats className={styles.stats} {...stats} />
        </div>
      ) : (
        <div className={styles['overflow-gradient']} />
      )}
    </div>
  )
}

Publication.propTypes = {
  time: instanceOf(Date).isRequired,
  accounts: arrayOf(oneOfType([string, object])).isRequired,
  body: string.isRequired,
  onClick: func.isRequired,
  className: string,
}

export default connect(state => ({
  multipleAccounts: state.data.multipleAccounts,
}))(Publication)
