import React from 'react'
import { Modal } from 'react-bootstrap'

export default function PanelFooter({children, ...rest}) {
  return (
    <Modal.Footer {...rest}>
        {children}
      </Modal.Footer>
  )
}
