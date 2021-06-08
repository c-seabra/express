import React, { useState } from 'react';
import styled from 'styled-components';

import { Staff } from '../app/App';

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

const Upload: React.FC<{ setAssignees: (list: Staff[]) => void }> = ({
  setAssignees,
}) => {
  const [error, setError] = useState('');

  const onUpload = () => {
    const input = document.getElementById('csvFileInput') as HTMLInputElement;
    const { files } = input;

    const errorHandler = (evt: ProgressEvent<FileReader>) => {
      if (evt?.target?.error?.name === 'NotReadableError') {
        setError('Unable to read uploaded file');
      }
    };

    const process = (fileReader: ProgressEvent<FileReader>) => {
      const csv = fileReader?.target?.result as string;
      if (csv) {
        const lines = csv.split('\n');
        const result: Staff[] = [];

        for (let i = 0; i <= lines.length - 1; i++) {
          const line = lines[i].replace(/(\r\n|\n|\r|)/gm, '');
          const [firstName, lastName, email] = line.split(',');

          result.push({
            email,
            firstName,
            lastName,
          });
        }

        setAssignees(result);
      } else {
        setError(
          'There has been an issue reading uploaded CSV try again or check your CSV has correct format.',
        );
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
          accept=".csv"
          id="csvFileInput"
          type="file"
          onChange={() => onUpload()}
        />
      </Field>
    </div>
  );
};

export default Upload;
