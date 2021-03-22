import React, { FC } from 'react';
import styled from 'styled-components';

import { Spacing } from '@websummit/components/src/templates/Spacing';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Header = styled.div`
  color: #0c1439;
  font-weight: 500;
  font-size: 24px;
`;

const SubHeader = styled.div`
  color: #0c1439;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 24px;
`;

type SettingsSectionProps = {
  subTitle?: string;
  title: string;
};

const SettingsSection: FC<SettingsSectionProps> = ({
  title,
  subTitle,
  children,
}) => (
  <Container>
    <Spacing bottom="3.25rem">
      <Header>{title}</Header>
      {subTitle && <SubHeader>{subTitle}</SubHeader>}
    </Spacing>
    {children}
  </Container>
);

export default SettingsSection;
