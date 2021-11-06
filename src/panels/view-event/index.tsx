import * as React from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { connect, Socket } from 'socket.io-client';
import { Flex, Box, Button, Spinner, Spacer } from '@chakra-ui/react';

import { Panel, Text } from '../../components';
import { useAppContext } from '../../app_context';
import { map } from '../../services/map';
import { Emergency } from '../../lib/api';

const { useState, useEffect, useRef } = React;

const Banner = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #f02d3a;
  top: 0;
  left: 0;
  right: 0;
  line-height: 1.2;
  height: 2rem;
`;

export const ViewEvent: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const { api, currentEmergency, setCurrentEmergency } = useAppContext();
  const history = useHistory();

  useEffect(() => {
    const refreshEmergency = async () => {
      setCurrentEmergency(await api.emergency.get(parseInt(id, 10)));
    };
    refreshEmergency();
    const i = setInterval(refreshEmergency, 2000);
    return () => clearInterval(i);
  }, [api, id]);

  // const [event, setEvent] = useState<null | RestAPI.Dispatch.GetEventResponse>(
  //   null
  // );

  // const [socket, setSocket] = useState<undefined | typeof Socket>();

  // const [messages, setMessages] = useState<any[]>([
  //   {
  //     id: v4(),
  //     text: 'Hello, please stand by for instructions.',
  //     sender: {
  //       name: 'Dispatch',
  //       uid: DISPATCH_USER_CHAT_ID,
  //       avatar:
  //         'https://image.freepik.com/free-vector/call-center-service-illustration_24877-52388.jpg',
  //     },
  //   },
  // ]);

  // const setupWs = async () => {
  //   const socket = connect(wsUrl);

  //   await new Promise((res) => {
  //     socket.on('connect', res);
  //   });
  //   setSocket(socket);
  //   const subscribeMessage: WebSocket.Action = {
  //     type: 'dispatch->server/subscribe-to-event',
  //     payload: { eventId: event.id },
  //   };
  //   socket.emit('message', subscribeMessage);

  //   socket.on('message', (m: WebSocket.Action) => {
  //     switch (m.type) {
  //       case 'server->dispatch/participant-location-update':
  //         map.updateUserPins(m.payload.users);
  //         break;
  //       case 'mobile<->dispatch/chat':
  //         setMessages((ms) =>
  //           ms.concat({
  //             id: v4(),
  //             text: m.payload.content,
  //             sender: {
  //               name: 'User',
  //               avatar:
  //                 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
  //             },
  //           })
  //         );
  //         break;
  //       default:
  //     }
  //   });
  // };

  // useEffect(() => {
  //   (async () => {
  //     setEvent(await api.dispatchEvent.get(id));
  //   })();
  // }, [id]);

  // useEffect(() => {
  //   if (event) {
  //     if (!map.hasCurrentEventPin()) {
  //       map.setCurrentEventPin({ lat: event.latitude, lon: event.longitude });
  //     }
  //     setupWs();
  //   }
  //   return () => socket && socket.close();
  // }, [event]);

  // useEffect(() => {
  //   if (socket) {
  //     // Hack to make the text input display full screen
  //     document
  //       .querySelector('.message-input')!
  //       .setAttribute('style', 'width: 100%');
  //   }
  // }, [socket]);

  return (
    <>
      {currentEmergency && (
        <Banner>
          <Text size="l">
            {currentEmergency.longitude},{currentEmergency.latitude}
          </Text>
        </Banner>
      )}
      <Panel>
        <Flex
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
        >
          {!currentEmergency?.responder && (
            <>
              <Box>
                <Text size="m">Searching for participants...</Text>
              </Box>
              <Box>
                <Spinner size="lg" />
              </Box>
            </>
          )}
          {currentEmergency?.responder && 'TODO'}
        </Flex>
      </Panel>
    </>
  );
};
