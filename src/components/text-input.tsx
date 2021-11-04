import * as React from 'react';

import { Input } from '@chakra-ui/react';

import { FormField } from './form-field';

interface Props {
  label: string;
  value: string;
  onChange: (ev: any) => void;
}

export const TextInput: React.FunctionComponent<Props> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <FormField label={label}>
      <Input
        ref={(r) => r && r.focus()}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </FormField>
  );
};
