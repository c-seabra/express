import styled, { css } from 'styled-components';

type SpacingRules = {
  bottom?: string;
  left?: string;
  right?: string;
  top?: string;
};

export const Spacing = styled.div<SpacingRules>`
  ${(props) =>
    props.top &&
    css`
      margin-top: ${props.top};
    `}

  ${(props) =>
    props.bottom &&
    css`
      margin-bottom: ${props.bottom};
    `}

  ${(props) =>
    props.left &&
    css`
      margin-left: ${props.left};
    `}

  ${(props) =>
    props.right &&
    css`
      margin-right: ${props.right};
    `}
`;

export const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`;

export const SpacingBottomSm = styled.div`
  margin-bottom: 1rem;
`;

export const SpacingBottomXs = styled.div`
  margin-bottom: 0.5rem;
`;
