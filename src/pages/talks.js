import React from 'react';

import Title from '../components/Title';
import Link from '../components/Link';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const TalksPage = ({ location }) => (
  <Layout location={location}>
    <>
      <SEO title="Talks" />
      <Title>TALKS</Title>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://docs.google.com/presentation/d/1ikvHjY0QBVKraAPVSTaBVoGe86NNRuS4aMiXML1Xd_4/edit?usp=sharing"
      >
        AI-Powered Angular: Building Smart Angular Apps with Gemini AI & OpenAI
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://slides.com/willmendesneto/building-large-monorepo-apps-with-nx"
      >
        Building Scalable Monorepos with NX
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://slides.com/willmendesneto/performance-analytics-and-reliability-in-frontend-apps"
      >
        Performance, Analytics and Reliability in Frontend Apps
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://slides.com/willmendesneto/angular-modules-lets-have-ngfun"
      >
        Angular modules: Let’s have #ngFun!
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://slides.com/willmendesneto/user-timing-api-because-perf-matters"
      >
        User Timing API: because performance matters
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://slides.com/willmendesneto/micro-frontend-in-angular-apps"
      >
        Micro Frontend in Angular Apps
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://slides.com/willmendesneto/data-driven-frontend-components-and-the-new-jira-navigation"
      >
        Data-Driven Frontend Components and the New Jira Navigation
      </Link>
      <Link target="_blank" rel="noopener noreferrer" href="https://slides.com/willmendesneto/angular-and-seo">
        The Progressive S.E.O. guide for PWA’s
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://slides.com/willmendesneto/angular-components-decoupled-shared-reusable-and-opensource"
      >
        Angular Components: Decoupled, Shared, Reusable & OpenSource
      </Link>
    </>
  </Layout>
);

export default TalksPage;
