import * as React from 'react';

import { Select } from '@chakra-ui/react';

import { FormField } from './form-field';

interface Props {
  label: string;
  value: string;
  options: Array<{ value: number | string; label: string }>;
  onChange: (e: any) => void;
}

export const Dropdown: React.FunctionComponent<Props> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <FormField label={label}>
      <Select onChange={(e) => onChange(e.target.value)} value={value}>
        {options.map(({ label: l, value: v }, idx) => (
          <option key={idx} value={v}>
            {l}
          </option>
        ))}
      </Select>
    </FormField>
  );
};
