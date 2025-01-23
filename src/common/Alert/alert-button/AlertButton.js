import React from 'react'
import { Button } from 'react-bootstrap'

export default function AlertButton({children, ...rest}) {
  return (
    <Button {...rest}>{children}</Button>
  )
}
