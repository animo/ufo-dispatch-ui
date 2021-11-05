import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { map } from './services/map';
import { MAP_Z_INDEX, CONTROLS_Z_INDEX } from './constants';
import { Overlay } from './components';
import { CreateEvent, ViewEvent } from './panels';
import { useAppContext } from './app_context';

const { useRef, useEffect, useState } = React;

mapboxgl.accessToken = process.env.MAPBOX_GL_KEY;

export const App: React.FunctionComponent = () => {
  const mapBoxContainerRef = useRef<HTMLDivElement | undefined>();

  const { masterData } = useAppContext();

  const [mapMounted, setMapMounted] = useState(false);

  useEffect(() => {
    map.setMap(
      new mapboxgl.Map({
        container: mapBoxContainerRef.current!,
        center: [34, 5],
        zoom: 10,
        style: 'mapbox://styles/mapbox/streets-v11',
        dragRotate: false,
        clickTolerance: 5,
        dragPan: true,
      })
    );
    setMapMounted(true);
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <Overlay level={MAP_Z_INDEX} ref={mapBoxContainerRef} />
      <Overlay level={CONTROLS_Z_INDEX} style={{ pointerEvents: 'none' }}>
        {masterData ? (
          <BrowserRouter>
            <Switch>
              <Route path="/event/:id">{mapMounted && <ViewEvent />}</Route>
              <Route path="/">{mapMounted && <CreateEvent />}</Route>
            </Switch>
          </BrowserRouter>
        ) : (
          <Spinner />
        )}
      </Overlay>
    </div>
  );
};
