import React from 'react';
import styled from 'styled-components';

import { SecondaryButton } from '../atoms/Button';

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileUploadButton = styled(SecondaryButton)`
  input[type='file'] {
    display: none;
  }
`;

const StyledFileInput = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;

type FileUploadInputProps = {
  acceptedFileTypes: string;
  elementId: string;
  label: string;
  onUpload: (e: any) => void;
};

const FileUploadInput = ({
  label,
  elementId,
  onUpload,
  acceptedFileTypes,
}: FileUploadInputProps) => {
  return (
    <FlexCol>
      <FileUploadButton as="label">
        <StyledFileInput
          accept={acceptedFileTypes}
          id={elementId}
          type="file"
          onChange={onUpload}
        />

        {label}
      </FileUploadButton>
    </FlexCol>
  );
};

export default FileUploadInput;
