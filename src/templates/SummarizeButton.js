import styled from 'styled-components';
import { screen } from '../styles/screen';

const commonStyles = `
  cursor: pointer;
  background: #fff;
  padding: 10px 20px;
  margin-right: 20px;
  border: none;
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  transition: background-color 300ms;
  font-weight: bold;
  justify-content: center;
  margin-top: -10px;

  ${screen.md} {
    display: inline-flex;
    width: auto;
  }
`;

const SummarizeButton = styled.button`
  ${commonStyles}
`;

export default SummarizeButton;
