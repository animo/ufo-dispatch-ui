import { Pane, Text } from 'evergreen-ui'
import React from 'react'
import './Dialog.css'

interface DialogProps {
  hasEmergency: boolean
}

const Dialog: React.FunctionComponent<DialogProps> = ({ children, hasEmergency }) => {
  return (
    <Pane
      minHeight={200}
      minWidth={400}
      backgroundColor="white"
      className="dialog-container"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {hasEmergency ? <div /> : <Text>Er is geen ongeval bezig.</Text>}
      {children}
    </Pane>
  )
}

export { Dialog }
