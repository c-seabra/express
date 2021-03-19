import React, { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  color: #0c1439;
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 2rem;
`;

type SettingsSectionProps = {
  title: string;
};

const SettingsSection: FC<SettingsSectionProps> = ({ title, children }) => (
  <Container>
    <Header>{title}</Header>
    {children}
  </Container>
);

export default SettingsSection;
