import { Button, FormField, Heading, SelectMenu, SelectMenuItem, SideSheet, Textarea } from 'evergreen-ui'
import React, { ChangeEvent, useState } from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress } from 'react-google-places-autocomplete'
import { Coordinate } from '../../types'
import './Form.css'

interface FormProps {
  isShown: boolean
  setIsShown: (_: boolean) => void
  setHasEmergency: (_: boolean) => void
}

const Form: React.FunctionComponent<FormProps> = ({ isShown, setIsShown, setHasEmergency }) => {
  // Mock data
  const labels = ['Apple', 'Apricot', 'Banana', 'Cherry', 'Cucumber'] as const
  const options = labels.map((label) => ({ label, value: label }))
  type Option = typeof labels[number]

  const [qualifications, setQualifications] = useState<string[]>([])
  const [action, setAction] = useState<string | null>(null)
  const [type, setType] = useState<Option | null>(null)
  const [location, setLocation] = useState<Coordinate | null>(null)
  const [address, setAddress] = useState<{ label: string; value: any } | null>(null)

  const onSendEmergency = async () => {
    console.log(`type: ${type}`)
    console.log(`qualifications: ${qualifications}`)
    console.log(`action: ${action}`)
    console.log(`address ${address}`)
    console.log(`location: ${JSON.stringify(location)}`)
    setHasEmergency(true)
    setIsShown(false)
  }

  const onSelectLocation = async (obj: { label: string; value: any }) => {
    const geocodedAddress = await geocodeByAddress(obj.label)
    const { lat: latitude, lng: longitude } = geocodedAddress[0].geometry.location.toJSON()
    setAddress(obj)
    setLocation({ longitude, latitude })
  }

  return (
    <SideSheet isShown={isShown} position="left">
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
            options={options}
            onSelect={(item: SelectMenuItem) => setType(item.label as Option)}
            closeOnSelect
          >
            <Button>{type || 'Selecteer'}</Button>
          </SelectMenu>
        </FormField>
        <br />
        <FormField label="Kwalificatie" description="Selecteer een of meerdere kwalificaties">
          <SelectMenu
            isMultiSelect
            options={options}
            selected={qualifications}
            onSelect={(item) => {
              const selected = [...qualifications, item.value]
              const selectedItems = selected
              setQualifications(selectedItems.map((item) => item as string))
            }}
            onDeselect={(item) => {
              const deselectedItemIndex = qualifications.indexOf(item.value as string)
              const selectedItems = qualifications.filter((_item, i) => i !== deselectedItemIndex)
              setQualifications(selectedItems)
            }}
          >
            <Button>Selecteer</Button>
          </SelectMenu>
        </FormField>
        <ul className="qualifications">
          {qualifications.map((qualification) => (
            <li className="qualification">{qualification}</li>
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
