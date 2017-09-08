import React from 'react'

export default (props) => {
  const colors = (props.done)
    ? {circle: '#bddad5', path: '#5dc2af'}
    : {circle: 'rgba(0, 0, 0, 0.1)', path: 'rgba(0, 0, 0, 0)'}
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='control toggle-done'
      onClick={props.handler}
      width='36' height='36'
      viewBox='-10 -18 100 135'
    >
      <circle cx='50' cy='50' r='50' fill='none' stroke={colors.circle} strokeWidth='3' />
      <path fill={colors.path} d='M72 25L42 71 27 56l-4 4 20 20 34-52z' />
    </svg>
  )
}
