import { Pane } from 'evergreen-ui'
import React from 'react'
import './Dialog.css'

const Dialog: React.FunctionComponent = ({ children }) => {
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
      {children}
    </Pane>
  )
}

export { Dialog }
