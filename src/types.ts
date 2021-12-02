export enum PotentialResponderState {
  Idle = 'IDLE',
  Pending = 'PENDING',
  Acknowledged = 'ACKNOWLEDGED',
  ProofRequested = 'PROOF_REQUESTED',
  ProofVerified = 'PROOF_VERIFIED',
  Active = 'ACTIVE',
}

type Base = {
  createdAt: string
  id: number
}

export enum NotificationService {
  Android = 'Android',
  Ios = 'Ios',
}

export type Coordinate = {
  latitude: number
  longitude: number
}

export type EmergencyType = Base & {
  code: string
  description: string
  definition: string
  classifications: {
    first: string
    second: string
    thrid: string
  }
}

export type Qualification = Base & {
  name: string
  schema: string
  credentialDefinition: string
  emergencies: any[]
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

export type PotentialResponder = Base & {
  emergency: EmergencyType
  currentIndex?: string
  state: PotentialResponderState
  notificationService: NotificationService
  notificationToken: string
  connectionId: string
}

export type ActiveResponder = Base &
  Coordinate & {
    potentialResponders: PotentialResponder
  }
