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
      width={400}
      backgroundColor="white"
      className="dialog-container"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {hasEmergency ? <div /> : <Text>Er is geen ongeval bezig.</Text>}
      <Pane position="absolute" bottom={15} right={15}>
        {children}
      </Pane>
    </Pane>
  )
}

export { Dialog }
