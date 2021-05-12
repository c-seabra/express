import { DateTime } from 'luxon';
import React from 'react';
import { CSVLink } from 'react-csv';
import styled from 'styled-components';

import { Button } from '../atoms/Button';

const LinkWrapper = styled.div`
  a {
    text-decoration: none;
  }
`;

type DownloadCSVButtonProps = {
  buttonText?: string;
  data?: Record<string, unknown>[];
  filename?: string;
};

const DownloadCSVButton = ({
  data = [],
  buttonText = 'Download CSV',
  filename = `${DateTime.now().toLocaleString()}-results`,
}: DownloadCSVButtonProps) => (
  <LinkWrapper>
    <CSVLink data={data} filename={filename}>
      <Button>{buttonText}</Button>
    </CSVLink>
  </LinkWrapper>
);

export default DownloadCSVButton;
