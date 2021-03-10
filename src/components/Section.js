import styled from 'styled-components';

import { screen } from '../styles/screen';

const Section = styled.section`
  max-width: ${screen.max};
  margin: 0 auto;
  padding-top: 0;

  h1 {
    font-size: 34px;

    ${screen.lg} {
      font-size: 50px;
    }
  }

  ${screen.lg} {
    padding-top: 50px;
  }
`;

export default Section;
