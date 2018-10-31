import React from 'react'
import Dropdown from '../dropdown'
import styles from './styles.module.css'

const getData = (time, hour) => {
  let hours = []
  let mins = []
  for (let i = 0; i <= 24; i++) {
    let str = i.toString()
    if (str.length === 1) str = `0${str}`
    hours.push(str)
  }

  for (let i = 0; i <= 60; i++) {
    let str = i.toString()
    if (str.length === 1) str = `0${str}`
    mins.push(str)
  }

  return {
    mins,
    hours,
  }
}

const TimePicker = ({ time, hour, min, selectHour, selectMin }) => (
  <div className={styles.wrapper}>
    <Dropdown
      initial={hour}
      onSelect={selectHour}
      list={getData(time, hour).hours}
    />
    <Dropdown
      initial={min}
      onSelect={selectMin}
      list={getData(time, hour).mins}
    />
  </div>
)

export default TimePicker
