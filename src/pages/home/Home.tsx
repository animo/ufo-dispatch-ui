import { Button } from 'evergreen-ui'
import React, { useState } from 'react'
import { api } from '../../api'
import { Dialog, Form, Map, StatusIndicator } from '../../components'
import { useInterval } from '../../hooks'
import { EmergencyResponse } from '../../types'
import './Home.css'

const POLL_RATE = 2000

const Home: React.FunctionComponent = () => {
  const [isSideSheetShown, setIsSideSheetShown] = useState(false)
  const [emergency, setEmergency] = useState<EmergencyResponse | null>(null)

  useInterval(async () => {
    if (emergency) {
      setEmergency(await api.emergencyById(emergency.id))
    }
  }, POLL_RATE)

  return (
    <>
      <Form isShown={isSideSheetShown} setIsShown={setIsSideSheetShown} setEmergency={setEmergency} />
      <Dialog>
        {emergency ? (
          <div className="dialog-content-container">
            <h4>{emergency.type.definition}</h4>
            <ul>
              {emergency.potentialResponders?.map((responder) => (
                <li key={responder.id}>
                  {responder.connectionId} - <StatusIndicator state={responder.state} />
                </li>
              ))}
            </ul>
            <Button className="dialog-button" onClick={() => setEmergency(null)} intent="danger" size="large">
              ONGEVAL BEEINDIGEN
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsSideSheetShown(true)} intent="danger" size="large">
            NIEUW ONGEVAL
          </Button>
        )}
      </Dialog>
      {
        <Map
          activeResponders={emergency?.activeResponders ?? []}
          emergency={emergency ? { latitude: emergency.latitude, longitude: emergency.longitude } : null}
        />
      }
    </>
  )
}

export { Home }
