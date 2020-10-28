import React, { useState } from 'react'
import { Assignee, AssigneesList } from '../../context/AssigneeContext'
import styled from 'styled-components'

const Field = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0 0;
  margin-bottom: .5rem;
`;

const Upload = ({setAssignees}: {setAssignees: (list:AssigneesList["assigneesList"]) => void}) => {
  const [error, setError] = useState(false)

  const onUpload = () => {
    const input = document.getElementById("csvFileInput") as HTMLInputElement
    const files = input.files

    const errorHandler = evt => {
      if (evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !")
      }
    }

    const process = (fileReader) => {
      const csv = fileReader.target.result
      const lines = csv.split("\n");
      let result = []

      const headers = lines[0].split(",");

      for (let i = 1; i <= lines.length - 1; i++) {
        let obj = {}

        const currentline = lines[i].split(",")

        for (let j = 0; j < headers.length; j++) {
          const key = headers[j].trim()
          const value = currentline[j].trim().toLowerCase()
          obj[key] = value
        }
        result.push(obj as Assignee)
      }

      setAssignees(result as AssigneesList["assigneesList"])
    }

    if (window.FileReader) {
      const file = files[0];
      if(file) {
        const reader = new FileReader()
        reader.readAsText(file);
        reader.onload = process;
        reader.onerror = errorHandler;
      } else {
        setError(true)
      }
    } else {
      alert("FileReader are not supported in this browser.")
    }

  };

  return (
    <div>
      {error && <span>There seems to be an error with upload field.</span>}
      <Field>
        Assignees list file
        <input
          type="file"
          id="csvFileInput"
          onChange={() => onUpload()}
          accept=".csv"
        />
      </Field>
    </div>
  )
}

export default Upload
