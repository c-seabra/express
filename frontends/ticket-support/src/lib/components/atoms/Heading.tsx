/**
 * Heading - atom component, encapsulates CSS for h1
 *
 * Possible improvements
 *  Later on can be extended to dynamically select heading level
 *  via dynamic `React.createElement operation` and dynamic font-size
 *
 * Example API
 *  level="1" --> <h1>
 *  level="2" --> <h2>
 */

import styled from 'styled-components';

const Heading = styled.h1`
  color: #0c1439;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 24px;
  padding: 0;
  margin: 0;
`;

export default Heading;
