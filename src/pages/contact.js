import React from 'react';

import Title from '../components/Title';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const TalksPage = () => (
  <Layout>
    <>
      <SEO title="Contact" />
      <Title>CONTACT</Title>
      <form action="https://formspree.io/f/xgepgvql" method="POST">
        <label>
          Your email:
          <input type="email" name="_replyto" />
        </label>
        <label>
          Your message:
          <textarea name="message"></textarea>
        </label>

        <button type="submit">Send</button>
      </form>
    </>
  </Layout>
);

export default TalksPage;
