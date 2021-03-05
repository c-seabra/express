import React, { useContext, useState } from 'react';
import { AppContext, Ticket, TicketList } from '../app/App';
import styled from 'styled-components';

import { Ticket, TicketList } from '../app/App';

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

function capitalizeFirstLetter(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

const Upload: React.FC<{ setAssignees: (list: TicketList) => void }> = ({
  setAssignees,
}) => {
  const [error, setError] = useState('');
  const { staffList } = useContext(AppContext);

  const onUpload = () => {
    const input = document.getElementById('csvFileInput') as HTMLInputElement;
    const { files } = input;

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

        for (let i = 0; i <= lines.length - 1; i++) {
          const email = lines[i]
            .replace(/(\r\n|\n|\r|)/gm, '')
            .replace(/,$/g, '')
            .toLowerCase();
          if (staffList) {
            let staff = staffList[email];
            if (!staff) {
              const name = email.split('@')[0];
              const [firstName, lastName] = name.split('.');
              staff = {
                email,
                firstName: capitalizeFirstLetter(firstName),
                lastName: capitalizeFirstLetter(lastName),
              };
            }
            result.push(staff);
          }
        }

        setAssignees(result as TicketList);
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
