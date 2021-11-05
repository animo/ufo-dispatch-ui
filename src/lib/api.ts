import axios from 'axios';

export interface EmergencyType {
  code: string;
  description: string;
  classifications: Record<string, unknown>;
  definition: string;
  id: number;
  createdAt: string;
}

export interface Qualification {
  name: string;
  schema: string;
  id: number;
  createdAt: string;
}

const ALLOWED_EMERGENCY_TYPE_CODES_FOR_DEMO = new Set([
  '200000030',
  '200000031',
  '200000081',
  '200000083',
  '200000084',
  '200000080',
  '200000121',
  '200000124',
  '200000138',
  '200000132',
  '200000169',
  '200000203',
  '200000205',
  '200000226',
  '200000210',
  '200000211',
  '200000227',
  '200000297',
  '200000314',
  '200000089',
  '200000093',
  '200000112',
  '200000113',
  '200000114',
  '200000115',
  '200000116',
  '200000236',
  '200000237',
]);

const filterAllowedTypeCodes = (emergencyType: EmergencyType) => {
  return ALLOWED_EMERGENCY_TYPE_CODES_FOR_DEMO.has(emergencyType.code);
};

export const createAPI = ({ baseUrl }: { baseUrl: string }) => {
  return {
    emergency: {
      async getTypes(): Promise<EmergencyType[]> {
        const { data } = await axios.get<EmergencyType[]>(
          baseUrl + '/emergencyType'
        );
        return data.filter(filterAllowedTypeCodes);
      },
    },
    qualifications: {
      async getAll(): Promise<Qualification[]> {
        const { data } = await axios.get<Qualification[]>(
          baseUrl + '/qualification'
        );
        return data;
      },
    },
    // dispatchEvent: {
    // async create(
    //   body: RestAPI.Dispatch.CreateEventRequest
    // ): Promise<RestAPI.Dispatch.CreateEventResponse> {
    //   const { data } = await axios.post(baseUrl + '/event', body);
    //   return data;
    // },
    // async get(id: string): Promise<RestAPI.Dispatch.GetEventResponse> {
    //   const { data } = await axios.get(baseUrl + `/event/${id}`);
    //   return data;
    // },
    // },
  };
};
