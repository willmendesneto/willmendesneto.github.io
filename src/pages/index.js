import React from 'react';
// import AdSense from 'react-adsense';
// import * as queryString from 'query-string';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Hello from '../components/Hello';
import Title from '../components/Title';

const IndexPage = ({ location }) => {
  // const { showAds } = queryString.parse(location.search);

  return (
    <Layout location={location}>
      <SEO title="Home" />
      <Title>Will Mendes</Title>
      <Hello />
      {/* {showAds && (
        <AdSense.Google
          client="ca-pub-8777120103516663"
          slot="9801578998"
          data-adtest="on"
          style={{ display: 'inline-block', height: 90, width: 728, border: '1px solid red' }}
        />
      )} */}
    </Layout>
  );
};

export default IndexPage;
