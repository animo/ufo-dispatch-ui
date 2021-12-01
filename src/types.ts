export enum PotentialResponderState {
  Idle = 'IDLE',
  Pending = 'PENDING',
  Acknowledged = 'ACKNOWLEDGED',
  ProofRequested = 'PROOF_REQUESTED',
  ProofVerified = 'PROOF_VERIFIED',
  Active = 'ACTIVE',
}

export enum NotificationService {
  Android = 'Android',
  Ios = 'Ios',
}

export type Coordinate = {
  latitude: number
  longitude: number
}

export type EmergencyType = {
  id: number
  code: string
  description: string
  createdAt: string
  definition: string
  classifications: {
    first: string
    second: string
    thrid: string
  }
}

export type Qualification = {
  id: number
  name: string
  schema: string
  credentialDefinition: string
  emergencies: any[]
  createdAt: string
}

export type AddEmergencyPostBody = Coordinate & {
  emergencyTypeId: number
  qualifications?: number[]
  requiredAction: string
}

export type EmergencyResponse = Coordinate & {
  id: number
  potentialResponders?: PotentialResponder[]
  qualifications: Qualification[]
  requiredAction: string
  type: EmergencyType
}

export type PotentialResponder = {
  id: number
  emergency: EmergencyType
  currentIndex?: string
  state: PotentialResponderState
  notificationService: NotificationService
  notificationToken: string
  connectionId: string
  createdAt: string
}
