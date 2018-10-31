import React from 'react'

const Cross = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <path
        d="M12,11.2928932 L19,4.29289322 L19.7071068,5 L12.7071068,12 L19.7071068,19 L19,19.7071068 L12,12.7071068 L5,19.7071068 L4.29289322,19 L11.2928932,12 L4.29289322,5 L5,4.29289322 L12,11.2928932 Z"
        id="cross-path"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="cross-mask" fill="#fff">
        <use xlinkHref="#cross-path" />
      </mask>
      <use fill="#9b9b9b" fillRule="nonzero" xlinkHref="#cross-path" />
      <g mask="url(#cross-mask)" fill="#2a2a2a">
        <rect width="24" height="24" />
      </g>
    </g>
  </svg>
)

export default Cross
