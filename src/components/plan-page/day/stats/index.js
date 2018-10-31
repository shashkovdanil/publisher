import React from 'react'
import cn from 'classnames'
import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Comments, Followers, Likes, Shared } from '../../common/icons'
import styles from './styles.module.css'

const getPercent = (full, part) => (part / full) * 100

const Stats = ({
  comments,
  followers,
  likes,
  shared,
  className = '',
  fullStats,
}) => (
  <ul className={cn(styles.list, className)}>
    <li className={styles.item}>
      <div className={styles.progress}>
        <div className={styles['icon-container']}>
          <CircularProgressbar
            percentage={
              fullStats ? getPercent(fullStats.followers, followers) : 0
            }
            strokeWidth={50}
            textForPercentage={null}
            styles={{
              path: { strokeLinecap: 'butt' },
              text: { fill: '#000' },
            }}
          />
          <Followers />
        </div>
      </div>
      <span>+{followers}</span>
    </li>
    <li className={styles.item}>
      <div className={styles.progress}>
        <div className={styles['icon-container']}>
          <CircularProgressbar
            percentage={fullStats ? getPercent(fullStats.shared, shared) : 0}
            strokeWidth={50}
            textForPercentage={null}
            styles={{
              path: { strokeLinecap: 'butt' },
              text: { fill: '#000' },
            }}
          />
          <Shared />
        </div>
      </div>
      <span>{shared}</span>
    </li>
    <li className={styles.item}>
      <div className={styles.progress}>
        <div className={styles['icon-container']}>
          <CircularProgressbar
            percentage={fullStats ? getPercent(fullStats.likes, likes) : 0}
            strokeWidth={50}
            textForPercentage={null}
            styles={{
              path: { strokeLinecap: 'butt' },
              text: { fill: '#000' },
            }}
          />
          <Likes />
        </div>
      </div>
      <span>{likes}</span>
    </li>
    <li className={styles.item}>
      <div className={styles.progress}>
        <div className={styles['icon-container']}>
          <CircularProgressbar
            percentage={
              fullStats ? getPercent(fullStats.comments, comments) : 0
            }
            strokeWidth={50}
            textForPercentage={null}
            styles={{
              path: { strokeLinecap: 'butt' },
              text: { fill: '#000' },
            }}
          />
          <Comments />
        </div>
      </div>
      <span>{comments}</span>
    </li>
  </ul>
)

export default Stats
