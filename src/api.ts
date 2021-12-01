import { AddEmergencyPostBody, EmergencyResponse, EmergencyType, Qualification } from './types'
import axios from 'axios'

const endpoint = 'http://localhost:8080'

const get = <R>(path: string): Promise<R> => axios.get(`${endpoint}/${path}`).then((res) => res.data)
const post = <R>(path: string, body: Record<string, unknown>): Promise<R> =>
  axios.post(`${endpoint}/${path}`, body).then((res) => res.data)

const api = {
  emergencyType: () => get<EmergencyType[]>('emergencyType'),
  qualifications: () => get<Qualification[]>('qualification'),
  emergency: () => get('emergency'),
  activeResponder: (id: string) => get(`active-responder/${id}`),
  emergencyById: (id: number) => get<EmergencyResponse>(`emergency/${id}`),
  post: {
    emergency: (body: AddEmergencyPostBody) => post<EmergencyResponse>('emergency', body),
  },
}

export { api }
