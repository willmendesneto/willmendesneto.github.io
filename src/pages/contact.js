import React from 'react';

import Title from '../components/Title';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import styled from 'styled-components';
import { screen } from '../styles/screen';

const FormRow = styled.div`
  padding: 10px;
`;

const FormLabel = styled.label`
  width: 200px;
  display: inline-block;
  margin: 10px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 5px;
  box-shadow: 5px 5px #566ff8;
  border: 1px solid grey;

  ${screen.md} {
    width: 490px;
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  height: 300px;
  box-shadow: 5px 5px #566ff8;
  border: 1px solid grey;
  padding: 5px;

  ${screen.md} {
    width: 490px;
  }
`;

const FormButton = styled.button`
  text-decoration: none;
  color: white;
  cursor: pointer;
  /* background-color: rgb(104, 109, 109); */
  background-image: linear-gradient(180deg, #566ff8 0%, #394fdc 100%);
  margin-right: 20px;
  padding: 20px 40px;
  display: inline;
  box-shadow: 5px 5px #566ff8;
  border-radius: 0.3px;
  border: 1px solid white;
  width: 100%;

  &:hover {
    background-image: linear-gradient(180deg, #4a60de 0%, #2f43c2 100%);
  }

  ${screen.md} {
    width: inherit;
  }
`;

const TalksPage = ({ location }) => (
  <Layout location={location}>
    <>
      <SEO title="Contact" />
      <Title>CONTACT</Title>

      <p>
        Want me to speak at your conference, be a guest on your podcast, author in a blog post or work as a consultant
        in your project? Send me a message! I’ll respond as quickly as possible.
      </p>

      <form action="https://formspree.io/f/xgepgvql" autoComplete="off" method="POST">
        <FormRow>
          <FormLabel>Your email *</FormLabel>
          <FormInput type="email" aria-required="true" required="true" name="_replyto" />
        </FormRow>
        <FormRow>
          <FormLabel>Your message *</FormLabel>
          <FormTextArea name="message" aria-required="true" required="true"></FormTextArea>
        </FormRow>
        <FormRow>
          <FormButton type="submit">Send</FormButton>
        </FormRow>
      </form>
    </>
  </Layout>
);

export default TalksPage;
