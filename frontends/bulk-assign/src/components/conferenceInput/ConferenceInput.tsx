import React, { useState } from 'react'
import styled from 'styled-components'

const Field = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0 0;
  margin-bottom: .5rem;
`;

const ConferenceInput = ({
  confSlug,
  setConfSlug
}: {
  confSlug: string
  setConfSlug: (slug:string) => void}
) => {
  const [value, setValue] = useState(confSlug)
  let timeOut
  const onChange = (e) => {
    clearTimeout(timeOut);
    const val = e.target.value
    setValue(val)

    timeOut = setTimeout(() => {
      setConfSlug(val)
    }, 500);
  }
  return (
    <div>
      <Field>
        Conference slug
        <input type='text' onChange={e => onChange(e)} value={value} />
      </Field>
    </div>
  )
}

export default ConferenceInput
