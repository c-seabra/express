import React, { useState, useContext } from 'react'
import Upload from '../upload/Upload'
import { AppContext, AssigneesList } from '../app/App'
import styled from 'styled-components'

const SubmitButton = styled.button`
  margin: 1rem 0;
`

const Form: React.FC = () => {
  const { setAssigneesList } = useContext(AppContext)
  const [formError, setFormError] = useState(false)
  const [assignees, setAssignees] = useState<AssigneesList>([])
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(assignees && assignees.length > 0 && setAssigneesList) {
      setAssigneesList(assignees)
    } else {
      setFormError(true)
    }
  }
  return (
    <form onSubmit={e => onSubmit(e)}>
      {formError && <div>There seems to be an error with your inputs.</div>}
      <Upload setAssignees={setAssignees} />
      <SubmitButton type="submit">Submit</SubmitButton>
    </form>
  )
}

export default Form
