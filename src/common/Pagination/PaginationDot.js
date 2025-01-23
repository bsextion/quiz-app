import React from 'react'

export default function PaginationDot({color, active, ...rest }) {

  return (
    <div className={`dot w-3 h-3 ${color} ${active}`} {...rest}></div>
  )
}
