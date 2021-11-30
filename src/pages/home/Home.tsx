import { Button } from 'evergreen-ui'
import React, { useState } from 'react'
import { Dialog, Form, Map } from '../../components'
import './Home.css'

const Home: React.FunctionComponent = () => {
  const [isSideSheetSown, setIsSideSheetSown] = useState(false)
  const [hasEmergency, setHasEmergency] = useState(false)

  return (
    <>
      <Form isShown={isSideSheetSown} setIsShown={setIsSideSheetSown} setHasEmergency={setHasEmergency} />
      <Dialog hasEmergency={hasEmergency}>
        {hasEmergency ? (
          <Button onClick={() => setHasEmergency(false)} intent="danger" size="large">
            ONGEVAL BEEINDIGEN
          </Button>
        ) : (
          <Button onClick={() => setIsSideSheetSown(true)} intent="danger" size="large">
            NIEUW ONGEVAL
          </Button>
        )}
      </Dialog>
      <Map />
    </>
  )
}

export { Home }
