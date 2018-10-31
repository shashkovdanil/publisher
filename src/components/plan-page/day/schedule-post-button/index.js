import React from 'react'
import { func, string } from 'prop-types'
import cn from 'classnames'
import { Plus } from '../../common/icons'
import styles from './styles.module.css'

const SchedulePostButton = ({ onClick, className = '' }) => (
  <div onClick={onClick} className={cn(styles.button, className)} role="button">
    <p>Schedule post on this day</p>
    <Plus />
  </div>
)

SchedulePostButton.propTypes = {
  onClick: func.isRequired,
  className: string,
}

export default SchedulePostButton
