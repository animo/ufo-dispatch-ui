import GoogleMapReact from 'google-map-react'
import React from 'react'
import { ActiveResponder, Coordinate } from '../../types'
import './Map.css'

type MarkerProps = {
  lat: number
  lng: number
  emergency?: boolean
  color?: string
}

type MapProps = {
  emergency: Coordinate | null
  activeResponders: ActiveResponder[] | null
}

const Marker: React.FunctionComponent<MarkerProps> = ({ lng, lat, emergency = false }) => (
  //@ts-ignore
  <div lat={lat} lng={lng} className={emergency ? 'pin emergency-pin' : 'pin'} />
)

const Map: React.FunctionComponent<MapProps> = ({ emergency, activeResponders }) => {
  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY as string, libraries: ['places'] }}
        defaultCenter={{ lat: 52.0894, lng: 5.11 }}
        defaultZoom={13}
      >
        {emergency && <Marker lat={emergency.latitude} lng={emergency.longitude} emergency={true} />}
        {activeResponders?.map((responder) => (
          <Marker lat={responder.latitude} lng={responder.longitude} emergency={false} />
        ))}
      </GoogleMapReact>
    </div>
  )
}

export { Map }
