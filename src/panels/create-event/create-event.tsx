import * as React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Button, Spinner } from '@chakra-ui/react';
import { useFormik } from 'formik';
import debounce from 'lodash.debounce';

// import { RestAPI } from 'common-types';

import { Panel, TextInput, Dropdown, Combobox } from '../../components';
import { map } from '../../services/map';
import { useAppContext } from '../../app_context';

const { useEffect, useState, useRef, useMemo } = React;

const HARDCODED_EMERGENCY_ADDRESS = '80 biltstraat netherlands';

export const CreateEvent: React.FunctionComponent = () => {
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  const mapMarkerRef = useRef<undefined | mapboxgl.Marker>();
  const locations = useState<any[]>([]);

  const { handleSubmit, errors, setFieldValue, values } = useFormik({
    initialValues: {
      emergencyCode: 'code_a',
      requiredSkills: [],
      desiredAction: 'Capture video',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    validate: async (fields) => {
      if (!fields.requiredSkills.length) {
        return { requiredSkills: 'At least one skill must be selected.' };
      }
    },
    onSubmit: async (values) => {
      if (!mapMarkerRef.current) {
      }

      setIsCreatingEvent(true);
      const { lat, lng } = mapMarkerRef.current.getLngLat();

      try {
        const { id } = await api.dispatchEvent.create({
          ...values,
          latitude: lat,
          longitude: lng,
        });
        history.push(`/event/${id}`);
      } catch (e) {}
    },
  });

  console.log('errors', errors);

  const updateAddress = useMemo(
    () =>
      debounce(
        async (address: string, centerOnMap: boolean) => {
          // const { data } = await axios.get(
          //   `https://eu1.locationiq.com/v1/search.php?key=pk.ebb6168d820aab1459e6f928e5c11671&q=${encodeURIComponent(
          //     address
          //   )}&format=json`
          // );
          // const [{ lat, lon }] = data;
          // Hack
          const lat = 52.0953925;
          const lon = 5.1303194;
          mapMarkerRef.current = map.setCurrentEventPin({ lat, lon });
          if (centerOnMap) map.centerOnEventPin();
        },
        500,
        { trailing: true }
      ),
    []
  );

  useEffect(() => {
    map.onClick((latlon) => {
      map.setCurrentEventPin(latlon);
    });
  });

  useEffect(() => {
    updateAddress(HARDCODED_EMERGENCY_ADDRESS, true);
  }, []);

  const history = useHistory();
  const { api } = useAppContext();

  return (
    <Panel>
      <Box marginBottom="1.2rem">
        <Heading size="lg">Create event</Heading>
      </Box>
      {isCreatingEvent && <Spinner size="lg" />}
      {!isCreatingEvent && (
        <form onSubmit={handleSubmit}>
          <Box marginBottom="1.2rem">
            <Dropdown
              onChange={(v) => {
                setFieldValue('emergencyCode', v);
              }}
              label="Emergency code"
              value={values.emergencyCode}
              options={[
                { label: 'Code a', value: 'code_a' },
                { label: 'Code b', value: 'code_b' },
              ]}
            />
          </Box>
          <Box marginBottom="1.2rem">
            <Combobox
              label="Required skills"
              selected={values.requiredSkills}
              onChange={(v) => setFieldValue('requiredSkills', v)}
              error={errors.requiredSkills}
              options={[
                { label: 'Skill a', value: 'skill_a' },
                { label: 'Skill b', value: 'skill_b' },
              ]}
            />
          </Box>
          <Box marginBottom="1.2rem">
            <Dropdown
              label="Desired action"
              value={String(values.desiredAction ?? '')}
              options={[
                { label: 'Capture video', value: 'Capture video' },
                { label: 'Something else', value: 'Something else' },
              ]}
              onChange={(v) => setFieldValue('desiredAction', v)}
            />
          </Box>
          <Box marginBottom="0.5rem">
            <Button type="submit">Create event</Button>
          </Box>
        </form>
      )}
    </Panel>
  );
};
