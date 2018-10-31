import React from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

const Button = ({ fetching, children, disabled, className, onClick }) => (
  <button
    disabled={disabled || fetching}
    onClick={onClick}
    className={cn(styles.button, className)}
  >
    {fetching ? 'loading...' : children}
  </button>
)

export default Button
