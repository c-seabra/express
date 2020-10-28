import React, { useState, useContext } from 'react'
import Upload from "../upload/Upload"
import ConferenceInput from "../conferenceInput/ConferenceInput"
import { AppContext, AppTypes } from '../../context/AppContext'
import styled from 'styled-components'

const SubmitButton = styled.button`
  margin: 1rem 0;
`;

const Form = () => {
  const { setAssigneesList, setConferenceSlug } = useContext(AppContext)
  const [confSlug, setConfSlug] = useState('')
  const [formError, setFormError] = useState(false)
  const [assignees, setAssignees] = useState<AppTypes["assigneesList"]>([])
  const onSubmit = e => {
    e.preventDefault()
    if(confSlug && assignees.length > 0) {
      setConferenceSlug(confSlug)
      setAssigneesList(assignees)
    } else {
      setFormError(true)
    }
  }
  return (
    <form onSubmit={e => onSubmit(e)}>
      {formError && <div>There seems to be an error with your inputs.</div>}
      <ConferenceInput confSlug={confSlug} setConfSlug={setConfSlug} />
      <Upload setAssignees={setAssignees} />
      <SubmitButton type="submit">Submit</SubmitButton>
    </form>
  )
}

export default Form
