import { Button } from 'evergreen-ui'
import React, { useState } from 'react'
import { api } from '../../api'
import { Dialog, Form, Map } from '../../components'
import { StatusIndicator } from '../../components'
import { useInterval } from '../../hooks'
import { EmergencyResponse } from '../../types'
import './Home.css'

const Home: React.FunctionComponent = () => {
  const [isSideSheetShown, setIsSideSheetShown] = useState(false)
  const [hasEmergency, setHasEmergency] = useState(true)
  const [emergencyResponse, setEmergencyResponse] = useState<EmergencyResponse | null>(null)

  useInterval(async () => {
    console.log('call')
    const emergencyResp = await api.emergencyById(1)
    console.log(emergencyResp)
    setEmergencyResponse(emergencyResp)
  }, 20000)

  return (
    <>
      <Form
        isShown={isSideSheetShown}
        setIsShown={setIsSideSheetShown}
        setHasEmergency={setHasEmergency}
        setEmergencyResponse={setEmergencyResponse}
      />
      <Dialog hasEmergency={hasEmergency}>
        {hasEmergency && emergencyResponse ? (
          <div className="dialog-content-container">
            <h4>{emergencyResponse.type.definition}</h4>
            <ul>
              {emergencyResponse.potentialResponders?.map((responder) => (
                <li key={responder.id}>
                  {responder.connectionId} - <StatusIndicator state={responder.state} />
                </li>
              ))}
            </ul>
            <Button className="dialog-button" onClick={() => setHasEmergency(false)} intent="danger" size="large">
              ONGEVAL BEEINDIGEN
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsSideSheetShown(true)} intent="danger" size="large">
            NIEUW ONGEVAL
          </Button>
        )}
      </Dialog>
      <Map />
    </>
  )
}

export { Home }
