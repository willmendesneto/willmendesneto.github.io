import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hello from '../components/Hello';
import Title from '../components/Title';

const IndexPage = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="Home" />
      <Title>Will Mendes</Title>
      <Hello />
    </Layout>
  );
};

export default IndexPage;
