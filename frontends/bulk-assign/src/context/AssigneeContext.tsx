/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { createContext, useContext, useState } from 'react'

export type AssigneesList = {
  assigneesList?: Array<Assignee>
  setAssigneesList?: (assignees: Array<Assignee>) => void
}
export type Assignee = {
  firstName: string
  lastName: string
  email: string
  ticketId: string
  bookingRef: string
}


export const AssigneeContext = createContext<AssigneesList>({})

export const AssigneeProvider = ({ children }: { children: React.ReactNode }) => {
  const [assigneesList, setAssigneesList] = useState<Array<Assignee>>()
  return (
    <AssigneeContext.Provider
      value={{
        assigneesList,
        setAssigneesList
      }}
    >
      {children}
    </AssigneeContext.Provider>
  )
}

export const useAssigneesList = () => useContext(AssigneeContext)
