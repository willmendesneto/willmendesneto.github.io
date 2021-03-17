import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Title from '../components/Title';

const Wrapper = styled.div`
  padding-top: 100px;
`;

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <Wrapper>
      <SEO title="404: Not found" />
      <Title>404</Title>
      <h2>Page Not Found</h2>
      <p>Sorry, this page cannot be found...</p>
    </Wrapper>
  </Layout>
);

export default NotFoundPage;
