import * as React from 'react';
import type { FunctionComponent } from 'react';
import Select from 'react-select';

import { FormField } from './form-field';

interface Props {
  label: string;
  selected: string[];
  options: Array<{ value: string | number; label: string }>;
  onChange: (e: any) => void;
  error?: any;
  multi?: boolean;
}

export const Combobox: FunctionComponent<Props> = ({
  label,
  options,
  selected,
  onChange,
  error,
  multi = true,
}) => {
  return (
    <FormField label={label} error={error}>
      <Select
        styles={{
          container: (styles) => ({ ...styles, display: 'flex', flexGrow: 1 }),
          control: (styles) => ({ ...styles, display: 'flex', flexGrow: 1 }),
        }}
        onChange={onChange}
        isMulti={multi}
        options={options as any}
        value={selected}
      />
    </FormField>
  );
};
