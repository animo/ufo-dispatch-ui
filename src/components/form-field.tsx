import * as React from 'react';

import { FormControl, FormLabel, Flex, Text } from '@chakra-ui/react';

interface Props {
  label: string;
  error?: string;
}

export const FormField: React.FunctionComponent<Props & { children: any }> = ({
  label,
  error,
  children,
}) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Flex>{children}</Flex>
      {error ? <Text color="red.500">{error}</Text> : <Text>&nbsp;</Text>}
    </FormControl>
  );
};
