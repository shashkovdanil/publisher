import React from 'react'
import { bool } from 'prop-types'

const Instagram = ({ withBg = false }) =>
  withBg ? (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="100%" y2="0%">
          <stop stopColor="#ffbc00" offset="0%" />
          <stop stopColor="#ff00ec" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g>
          <rect fill="url(#instagram-gradient)" width="10" height="10" />
          <rect
            stroke="#fff"
            strokeWidth="0.5"
            x="2.25"
            y="2.25"
            width="5.5"
            height="5.5"
            rx="1.5"
          />
          <rect
            stroke="#fff"
            strokeWidth="0.5"
            x="3.75"
            y="3.75"
            width="2.5"
            height="2.5"
            rx="1.25"
          />
          <rect fill="#fff" x="6.5" y="3" width="1" height="1" rx="0.5" />
        </g>
      </g>
    </svg>
  ) : (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <rect
              stroke="#2a2a2a"
              strokeWidth="1.5"
              x="4.75"
              y="4.75"
              width="10.5"
              height="10.5"
              rx="3"
            />
            <rect
              stroke="#2a2a2a"
              strokeWidth="1.5"
              x="7.75"
              y="7.75"
              width="4.5"
              height="4.5"
              rx="2.25"
            />
            <rect fill="#2a2a2a" x="12" y="6" width="2" height="2" rx="1" />
          </g>
        </g>
      </g>
    </svg>
  )

Instagram.propTypes = {
  withBg: bool,
}

export default Instagram
