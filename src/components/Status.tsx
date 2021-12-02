import React from 'react'
import { PotentialResponderState } from '../types'
import { StatusIndicator as SI } from 'evergreen-ui'

interface StatusIndicatorProps {
  state: PotentialResponderState
}

const StatusIndicator: React.FunctionComponent<StatusIndicatorProps> = ({ state }) => {
  // default color
  let color = 'disabled'

  console.log(state)

  switch (state) {
    case PotentialResponderState.Active:
      color = 'success'
      break
    case PotentialResponderState.Acknowledged:
      color = 'warning'
      break
    case PotentialResponderState.ProofRequested:
      color = 'warning'
      break
    case PotentialResponderState.ProofVerified:
      color = 'warning'
      break
  }

  return <SI color={color} />
}

export { StatusIndicator }
