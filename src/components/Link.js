import styled from 'styled-components';

const Link = styled.a`
  border-bottom: 2px dashed #eee;
  display: block;
  font-size: 20px;
  font-weight: 500;
  padding: 15px 0;
  line-height: 1.5em;
  position: relative;
  text-decoration: none;
  transition: color 300ms;

  &:hover {
    color: #999;
  }

  &:last-child {
    border: 0;
  }
`;

export default Link;
