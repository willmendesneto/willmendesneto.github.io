import styled from 'styled-components';

import { screen } from '../styles/screen';

const PostWrapper = styled.article`

  img {
    vertical-align: middle;
    aspect-ratio: auto 245 / 192;
  }

  p img {
    text-align: center;
    display: block;
    margin: 20px auto;
  }

  p .language-text {
    margin-right 5px;
  }

  hr {
    border: none;
    background: transparent;
    color: #111;
    letter-spacing: 1em;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 50px;

    ${screen.md} {
      margin-bottom: 70px;
    }

    &:before {
      content: '...';
    }
  }
`;

export default PostWrapper;
