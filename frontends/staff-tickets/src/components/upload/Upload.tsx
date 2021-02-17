import React, { useState } from 'react';
import { Ticket, TicketList } from '../app/App';
import styled from 'styled-components';

const Field = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0 0;
  margin-bottom: 0.5rem;
  input {
    cursor: pointer;
  }
  span {
    margin-bottom: 0.5rem;
  }
`;

const Upload: React.FC<{ setAssignees: (list: TicketList) => void }> = ({
  setAssignees,
}) => {
  const [error, setError] = useState('');

  const onUpload = () => {
    const input = document.getElementById('csvFileInput') as HTMLInputElement;
    const files = input.files;

    const errorHandler = (evt: ProgressEvent<FileReader>) => {
      if (evt?.target?.error?.name == 'NotReadableError') {
        setError('Unable to read uploaded file');
      }
    };

    const process = (fileReader: ProgressEvent<FileReader>) => {
      const csv = fileReader?.target?.result as string;
      if (csv) {
        const lines = csv.split('\n');
        const result = [];

        const headers = lines[0]
          .replace(/(\r\n|\n|\r|)/gm, '')
          .replace(/,$/g, '')
          .split(',');

        for (let i = 1; i <= lines.length - 1; i++) {
          const currentLine = lines[i]
            .replace(/(\r\n|\n|\r|)/gm, '')
            .replace(/,$/g, '')
            .split(',');
          // if(currentLine.length === headers.length) {
          const obj = {} as { [key: string]: string };
          for (let j = 0; j < headers.length; j++) {
            const key = headers?.[j]?.trim();
            const value = currentLine?.[j]?.trim();
            obj[key] = value;
          }
          result.push(obj as Ticket);
          // } else {
          //   setError('This csv format is not supported make sure that there are no extra columns in your csv')
          //   return
          // }
        }

        setAssignees(result as TicketList);
      } else {
        setError(
          'There has been an issue reading uploaded CSV try again or check your CSV has correct format.',
        );
        return;
      }
    };

    if (window.FileReader) {
      const file = files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = process;
        reader.onerror = errorHandler;
      } else {
        setError('No file has been selected');
      }
    } else {
      alert('FileReader is not supported in this browser.');
    }
  };

  return (
    <div>
      {error && <span>{error}</span>}
      <Field>
        <span>Please upload assignee detail as a CSV file</span>
        <input
          type="file"
          id="csvFileInput"
          onChange={() => onUpload()}
          accept=".csv"
        />
      </Field>
    </div>
  );
};

export default Upload;
