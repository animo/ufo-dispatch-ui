import GoogleMapReact from 'google-map-react'
import React from 'react'
import './Map.css'

const Map: React.FunctionComponent = () => (
  <div className="map-container">
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY as string, libraries: ['places'] }}
      defaultCenter={{ lat: 52, lng: 5 }}
      defaultZoom={13}
    />
  </div>
)

export { Map }
