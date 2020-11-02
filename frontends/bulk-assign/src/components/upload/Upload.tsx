import React, { useState } from 'react'
import { Assignee, AssigneesList } from '../app/App'
import styled from 'styled-components'

const Field = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0 0;
  margin-bottom: .5rem;
`;

const Upload = ({setAssignees}: {setAssignees: (list:AssigneesList) => void}) => {
  const [error, setError] = useState('')

  const onUpload = () => {
    const input = document.getElementById("csvFileInput") as HTMLInputElement
    const files = input.files

    const errorHandler = evt => {
      if (evt.target.error.name == "NotReadableError") {
        setError('Unable to read uploaded file')
      }
    }

    const process = (fileReader) => {
      const csv = fileReader.target.result
      const lines = csv.split("\n");
      let result = []

      const headers = lines[0].replace(/(\r\n|\n|\r|)/gm, "").replace(/\,$/g,'').split(",")

      for (let i = 1; i <= lines.length - 1; i++) {
        const currentLine = lines[i].replace(/(\r\n|\n|\r|)/gm, "").replace(/\,$/g,'').split(",")
        if(currentLine.length === headers.length) {
          let obj = {}
          for (let j = 0; j < headers.length; j++) {
            const key = headers[j].trim()
            const value = currentLine[j].trim()
            obj[key] = value
          }
          result.push(obj as Assignee)
        } else {
          setError('This csv format is not supported make sure that there are no extra columns in your csv')
          return
        }
      }

      setAssignees(result as AssigneesList)
    }

    if (window.FileReader) {
      const file = files[0];
      if(file) {
        const reader = new FileReader()
        reader.readAsText(file);
        reader.onload = process;
        reader.onerror = errorHandler;
      } else {
        setError('No file has been selected')
      }
    } else {
      alert("FileReader is not supported in this browser.")
    }

  };

  return (
    <div>
      {error && <span>{error}</span>}
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
