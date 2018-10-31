import React from 'react'
import { bool } from 'prop-types'

const Facebook = ({ withBg = false }) =>
  withBg ? (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <g>
          <rect fill="#4760a5" width="10" height="10" />
          <path
            d="M5.5,4 L5.5,3.4046 C5.5,3.136 5.5594,3 5.9766,3 L6.5,3 L6.5,2 L5.7,2 C4.7,2 4.3,2.6672 4.3,3.4 L4.3,4 L3.5,4 L3.5,5 L4.3,5 L4.3,8 L5.5,8 L5.5,5 L6.3812,5 L6.5,4 L5.5,4"
            fill="#fff"
          />
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
        <g fill="#2a2a2a">
          <g>
            <path d="M10.8333333,7.83333333 L10.8333333,6.841 C10.8333333,6.39333333 10.9323333,6.16666667 11.6276667,6.16666667 L12.5,6.16666667 L12.5,4.5 L11.1666667,4.5 C9.5,4.5 8.83333333,5.612 8.83333333,6.83333333 L8.83333333,7.83333333 L7.5,7.83333333 L7.5,9.5 L8.83333333,9.5 L8.83333333,14.5 L10.8333333,14.5 L10.8333333,9.5 L12.302,9.5 L12.5,7.83333333 L10.8333333,7.83333333" />
          </g>
        </g>
      </g>
    </svg>
  )

Facebook.propTypes = {
  withBg: bool,
}

export default Facebook
