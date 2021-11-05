interface LatLon {
  lat: number;
  lon: number;
}

class MyMap {
  private _map: mapboxgl.Map;

  markers: {
    currentEvent?: mapboxgl.Marker;
    users: { [id: number]: mapboxgl.Marker };
  } = {
    users: {},
  };

  setMap(map: mapboxgl.Map) {
    this._map = map;
  }

  private get map(): mapboxgl.Map {
    if (!this._map) throw new Error('map not set!');
    return this._map;
  }

  getCurrentEventLatLon(): undefined | LatLon {
    const lngLat = this.markers.currentEvent?.getLngLat();
    if (lngLat) {
      return {
        lat: lngLat.lat,
        lon: lngLat.lng,
      };
    }
  }

  centerOnEventPin(): void {
    const latLng = this.markers.currentEvent?.getLngLat();
    if (latLng) this.map.setCenter(latLng);
    this.map.setZoom(15);
  }

  setCurrentEventPin({ lat, lon }: LatLon) {
    const map = this.map;
    if (this.markers.currentEvent) {
      this.markers.currentEvent.remove();
    }
    const marker = new mapboxgl.Marker({ color: 'red', draggable: true })
      .setLngLat([lon, lat])
      .addTo(map);

    this.markers.currentEvent = marker;
    return marker;
  }

  updateUserPins(
    users: Array<{
      id: number;
      location: { latitude: number; longitude: number };
    }>
  ) {
    const unseenUsers = { ...this.markers.users };
    users.forEach((user) => {
      if (this.markers.users[user.id]) {
        this.markers.users[user.id].setLngLat({
          lat: user.location.latitude,
          lon: user.location.longitude,
        });
      } else {
        this.markers.users[user.id] = new mapboxgl.Marker({
          color: 'blue',
        })
          .setLngLat([user.location.longitude, user.location.latitude])
          .addTo(this.map);
      }
      delete unseenUsers[user.id];
    });

    // Clean up users object and dangling pins
    Object.keys(unseenUsers).forEach((id) => {
      this.markers.users[id as unknown as number].remove();
      delete this.markers.users[id];
    });
  }

  hasCurrentEventPin() {
    return !!this.markers.currentEvent;
  }

  onClick(handler: (latlon: LatLon) => void) {
    this.map.on('click', ({ lngLat: { lat, lng } }) => {
      handler({ lat, lon: lng });
    });
  }
}

const map = new MyMap();

export { map };
