import React from 'react'
import format from 'date-fns/format'
import { number, func, instanceOf, string } from 'prop-types'
import cn from 'classnames'
import { Plus } from '../../common/icons'
import styles from './styles.module.css'

function getTitle(num) {
  switch (num) {
    case 1:
      return 'First slot'
    case 2:
      return 'Second slot'
    case 3:
      return 'Third slot'
    default:
      break
  }
}

const Slot = ({ time, num, onClick, className = '' }) => (
  <div onClick={onClick} className={cn(styles.slot, className)} role="button">
    <p className={styles.time}>{format(time, 'HH:mm')}</p>
    <p className={styles.title}>{getTitle(num)}</p>
    <Plus />
  </div>
)

Slot.propTypes = {
  time: instanceOf(Date).isRequired,
  num: number.isRequired,
  onClick: func.isRequired,
  className: string,
}

export default Slot
