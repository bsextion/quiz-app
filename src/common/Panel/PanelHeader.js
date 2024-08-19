import React from 'react'
import { Modal } from 'react-bootstrap'

export default function PanelHeader({children}) {
  return (
    <Modal.Header className="p-2">
        <Modal.Title className="w-100 mx-4 ">{children}</Modal.Title>
      </Modal.Header>
  )
}
