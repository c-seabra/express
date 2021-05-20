import styled from 'styled-components';

export const AvatarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const AvatarImg = styled.div`
  position: relative;

  & object,
  & img {
    width: 100%;
    max-width: 42px;
    max-height: 42px;
    border-radius: 50%;
    border: 2px solid transparent;
  }

  & svg {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 16px;
    height: 16px;
  }
`;

export const Content = styled.div`
  width: calc(100% - 72px);
`;

export const ContentTitle = styled.p`
  margin: 0;
`;

export const ContentSubtitle = styled.p`
  margin: 0.275rem 0 0;
  font-size: 0.875rem;
`;

export const Icon = styled.span`
  width: 20px;
`;
