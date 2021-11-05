import * as React from 'react';

import { createAPI, EmergencyType, Qualification } from './lib/api';

const { createContext, useContext, useState, useEffect, useMemo } = React;

interface MasterData {
  emergencyTypes: EmergencyType[];
  qualifications: Qualification[];
}

interface Value {
  api: ReturnType<typeof createAPI>;
  wsUrl: string;
  masterData: MasterData;
}

const AppContext = createContext<Value>(null as any);

export const AppContextProvider: React.FunctionComponent = ({ children }) => {
  const api = useMemo(
    () =>
      createAPI({
        baseUrl: process.env.SERVER_HTTP_URL,
      }),
    []
  );
  const [masterData, setMasterData] = useState<MasterData>();

  useEffect(() => {
    (async () => {
      const [emergencyTypes, qualifications] = await Promise.all([
        api.emergency.getTypes(),
        api.qualifications.getAll(),
      ]);

      setMasterData({
        emergencyTypes,
        qualifications,
      });
    })();
  }, [api]);

  return (
    <AppContext.Provider
      value={{
        api,
        wsUrl: process.env.SERVER_WS_URL,
        masterData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('cannot call useAppContext outside of AppContext');
  return ctx;
};
