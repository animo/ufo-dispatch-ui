import * as React from 'react';

import { Textarea } from '@chakra-ui/react';

import { FormField } from './form-field';

interface Props {
  label: string;
  value: string;
  error?: string;
  onChange: (ev: any) => void;
}

export const TextArea: React.FunctionComponent<Props> = ({
  label,
  value,
  onChange,
  error,
}) => {
  return (
    <FormField label={label} error={error}>
      <Textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </FormField>
  );
};
