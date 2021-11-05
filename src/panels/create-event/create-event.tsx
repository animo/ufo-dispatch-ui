import * as React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Button, Spinner } from '@chakra-ui/react';
import { useFormik } from 'formik';
import debounce from 'lodash.debounce';

// import { RestAPI } from 'common-types';

import { Panel, TextArea, Dropdown, Combobox } from '../../components';
import { map } from '../../services/map';
import { useAppContext } from '../../app_context';

const { useEffect, useState, useRef, useMemo } = React;

const HARDCODED_EMERGENCY_ADDRESS = '80 biltstraat netherlands';

export const CreateEvent: React.FunctionComponent = () => {
  const history = useHistory();
  const { api, masterData } = useAppContext();

  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const mapMarkerRef = useRef<undefined | mapboxgl.Marker>();
  const locations = useState<any[]>([]);

  const {
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    values,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      emergencyCode: undefined,
      requiredSkills: [],
      desiredActions: '',
    },
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: false,
    validate: async (fields) => {
      const errors: Record<string, string> = {};
      if (!fields.emergencyCode) {
        errors.emergencyCode = 'This field cannot be empty';
      }
      if (!fields.requiredSkills.length) {
        errors.requiredSkills = 'At least one skill must be selected.';
      }
      if (!fields.desiredActions) {
        errors.desiredActions = 'This field cannot be empty';
      }

      return errors;
    },
    onSubmit: async (values) => {
      if (!mapMarkerRef.current) {
      }

      setIsCreatingEvent(true);
      const { lat, lng } = mapMarkerRef.current.getLngLat();

      try {
        // const { id } = await api.dispatchEvent.create({
        //   ...values,
        //   latitude: lat,
        //   longitude: lng,
        // });
        // history.push(`/event/${id}`);
        const { lat, lon } = map.getCurrentEventLatLon()!;
        const { id } = await api.emergency.create({
          emergencyTypeId: values.emergencyCode.value,
          qualificationIds: values.requiredSkills.map(({ value }) => value),
          requiredAction: values.desiredActions,
          latitude: lat,
          longitude: lon,
        });
        history.push(`/event/${id}`);
      } catch (e) {}
    },
  });

  const emergencyTypeOptions = useMemo(() => {
    return masterData.emergencyTypes.map((emergencyType) => {
      return {
        label: emergencyType.description,
        value: emergencyType.id,
      };
    });
  }, [masterData]);

  const qualificationsOptions = useMemo(() => {
    return masterData.qualifications.map((qualification) => {
      return {
        label: qualification.name,
        value: qualification.id,
      };
    });
  }, [masterData]);

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
  }, []);

  useEffect(() => {
    updateAddress(HARDCODED_EMERGENCY_ADDRESS, true);
  }, []);

  const setField = (name: string, value: any) => {
    setFieldValue(name, value);
    setFieldTouched(name);
  };

  return (
    <Panel>
      <Box marginBottom="1.2rem">
        <Heading size="lg">Create event</Heading>
      </Box>
      {isCreatingEvent && <Spinner size="lg" />}
      {!isCreatingEvent && (
        <form onSubmit={handleSubmit}>
          <Box marginBottom="1.2rem">
            <Combobox
              multi={false}
              onChange={(v) => {
                setField('emergencyCode', v);
              }}
              label="Melding type"
              selected={values.emergencyCode}
              options={emergencyTypeOptions}
            />
          </Box>
          <Box marginBottom="1.2rem">
            <Combobox
              label="Kwalificatie"
              selected={values.requiredSkills}
              onChange={(v) => {
                setField('requiredSkills', v);
              }}
              error={touched.requiredSkills ? errors.requiredSkills : undefined}
              options={
                //   [
                //   { label: 'Diploma manschap', value: 'skill_a' },
                //   { label: 'Diploma EHBO', value: 'skill_b' },
                //   { label: 'LRH', value: 'skill_c' },
                //   { label: 'Diploma BHV', value: 'skill_d' },
                //   {
                //     label: 'Kleine blusmiddelen (dronepiloot)',
                //     value: 'skill_e',
                //   },
                //   { label: 'Kleine blusmiddelen', value: 'skill_f' },
                // ]
                qualificationsOptions
              }
            />
          </Box>
          <Box marginBottom="1.2rem">
            <TextArea
              label="Actie"
              value={values.desiredActions}
              // options={[
              //   { label: 'Eerste hulp', value: 'action_a' },
              //   { label: 'Schouwen', value: 'action_b' },
              //   { label: 'Kleine blusmiddelen', value: 'action_c' },
              //   { label: 'Ontruiming', value: 'action_d' },
              // ]}
              onChange={(v) => {
                setField('desiredActions', v);
              }}
              error={touched.desiredActions ? errors.desiredActions : undefined}
            />
          </Box>
          <Box marginBottom="0.5rem">
            <Button disabled={!isValid} type="submit">
              Create event
            </Button>
          </Box>
        </form>
      )}
    </Panel>
  );
};
