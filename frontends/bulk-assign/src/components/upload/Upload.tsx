import React, { useContext } from 'react'
import { Assignee, AssigneeContext, AssigneesList } from '../../context/AssigneeContext'

const Upload = () => {
  const { setAssigneesList } = useContext(AssigneeContext)

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

      setAssigneesList(result as AssigneesList["assigneesList"])
    }

    if (window.FileReader) {
      const testis = files[0];
      const reader = new FileReader()
      reader.readAsText(testis);
      reader.onload = process;
      reader.onerror = errorHandler;
    } else {
      alert("FileReader are not supported in this browser.")
    }

  };

  return (
    <div>
      <input
        type="file"
        id="csvFileInput"
        onChange={() => onUpload()}
        accept=".csv"
      />
    </div>
  )
}

export default Upload
