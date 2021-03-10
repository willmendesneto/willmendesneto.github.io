import styled from 'styled-components';

import { screen } from '../styles/screen';

const Title = styled.h1`
  font-style: normal;
  font-weight: 900;
  line-height: 1em;
  margin: 50px 0 20px 0;
  font-size: 30px;
  letter-spacing: -2px;

  ${screen.md} {
    font-size: 50px;
    line-height: 1em;
    margin: 70px 0 20px 0;
  }
`;

export default Title;
