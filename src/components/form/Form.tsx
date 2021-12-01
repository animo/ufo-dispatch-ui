import { Button, FormField, Heading, SelectMenu, SelectMenuItem, SideSheet, Textarea } from 'evergreen-ui'
import React, { ChangeEvent, useEffect, useState } from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress } from 'react-google-places-autocomplete'
import { api } from '../../api'
import { Coordinate, EmergencyResponse, EmergencyType, Qualification } from '../../types'
import './Form.css'

interface FormProps {
  isShown: boolean
  setIsShown: (_: boolean) => void
  setHasEmergency: (_: boolean) => void
  setEmergencyResponse: (_: EmergencyResponse) => void
}

type Item = { label: string; value: string | number }

const Form: React.FunctionComponent<FormProps> = ({ isShown, setIsShown, setHasEmergency, setEmergencyResponse }) => {
  const [emergencyTypes, setEmergencyTypes] = useState<EmergencyType[]>([])
  const [emergencyTypesUI, setEmergencyTypesUI] = useState<Item[]>([])
  const [selectedEmergencyType, setSelectedEmergencyType] = useState<EmergencyType | null>(null)

  const [qualifications, setQualifications] = useState<Qualification[]>([])
  const [qualificationsUI, setQualificationsUI] = useState<Item[]>([])
  const [selectedQualifications, setSelectedQualifications] = useState<Qualification[]>([])

  const [action, setAction] = useState<string>('')

  const [location, setLocation] = useState<Coordinate | null>(null)
  const [address, setAddress] = useState<Item | null>(null)

  useEffect(() => {
    const run = async () => {
      const em = await api.emergencyType()
      setEmergencyTypes(em)
      setEmergencyTypesUI(em.map((e) => ({ label: e.description, value: e.description })))

      const qu = await api.qualifications()
      setQualifications(qu)
      setQualificationsUI(qu.map((q) => ({ label: q.name, value: q.name })))
    }
    void run()
  }, [])

  const onSendEmergency = async () => {
    if (location && selectedEmergencyType) {
      const body = {
        ...location,
        requiredAction: action,
        emergencyTypeId: selectedEmergencyType.id,
        qualifications: selectedQualifications.map(() => 0),
      }
      const emergencyResponse = await api.post.emergency(body)
      setEmergencyResponse(emergencyResponse)
      setHasEmergency(true)
      setIsShown(false)
    }
  }

  const onSelectLocation = async (obj: { label: string; value: any }) => {
    const geocodedAddress = await geocodeByAddress(obj.label)
    const { lat: latitude, lng: longitude } = geocodedAddress[0].geometry.location.toJSON()
    setAddress(obj)
    setLocation({ longitude, latitude })
  }

  return (
    <SideSheet isShown={isShown} position="left" onCloseComplete={() => setIsShown(false)}>
      <div className="form-container">
        <Heading size={900}>Nieuwe Melding Uitzenden</Heading>
        <br />
        <br />
        <FormField label="Locatie van het ongeval" description="Vul hier het adres in van het ongeval">
          <GooglePlacesAutocomplete
            selectProps={{
              value: address,
              onChange: (obj: { label: string; value: any }) => onSelectLocation(obj),
            }}
            apiOptions={{ apiKey: process.env.REACT_APP_GOOGLE_API_KEY as string, language: 'nl', region: 'nl' }}
            autocompletionRequest={{ componentRestrictions: { country: ['nl'] } }}
          />
        </FormField>
        <br />
        <FormField label="Melding type" description="Selecteer het type van de melding">
          <SelectMenu
            options={emergencyTypesUI}
            onSelect={(item: SelectMenuItem) =>
              setSelectedEmergencyType(emergencyTypes.find((type) => type.description === item.label) ?? null)
            }
            closeOnSelect
          >
            <Button>{selectedEmergencyType?.description || 'Selecteer'}</Button>
          </SelectMenu>
        </FormField>
        <br />
        <FormField label="Kwalificatie" description="Selecteer een of meerdere kwalificaties">
          <SelectMenu
            isMultiSelect
            options={qualificationsUI}
            selected={selectedQualifications.map((q) => q.name)}
            onSelect={(item) => {
              // TODO: via id
              const mappedQualification = qualifications.find((q) => q.name === item.label)
              if (mappedQualification) {
                setSelectedQualifications(() => [...selectedQualifications, mappedQualification])
              }
            }}
            onDeselect={(item) => {
              const selectedItems = selectedQualifications.filter((q) => q.name !== item.label)
              setSelectedQualifications(selectedItems)
            }}
          >
            <Button>Selecteer</Button>
          </SelectMenu>
        </FormField>
        <ul className="qualifications">
          {selectedQualifications.map((qualification) => (
            <li className="qualification" key={qualification.id}>
              {qualification.name}
            </li>
          ))}
        </ul>
        <br />
        <FormField label="Actie" description="Vul hier de actie in de moet worden uitgevoerd">
          <Textarea onChange={(input: ChangeEvent<HTMLTextAreaElement>) => setAction(input.target.value)} />
        </FormField>
        <br />
        <br />
        <Button onClick={onSendEmergency}>Create event!</Button>
      </div>
    </SideSheet>
  )
}

export { Form }
