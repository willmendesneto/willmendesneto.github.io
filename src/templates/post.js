import React from 'react';
import { graphql } from 'gatsby';
import { GoogleGenerativeAI } from '@google/generative-ai';

import Title from '../components/Title';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostContent from '../components/PostContent';
import PostDate from '../components/PostDate';
import Share from '../components/Share';
import SummarizeButton from './SummarizeButton';
import Skeleton from './Skeleton';
import { API_TOKEN } from './token';

export default function Template({
  data: {
    markdownRemark: { frontmatter, html, timeToRead, tags },
  },
}) {
  const [postSummary, setPostSummary] = React.useState('');
  const [isLoadingSummary, setLoadingSummary] = React.useState(false);
  const summarizeIt = async () => {
    try {
      setLoadingSummary(true);
      const generativeAI = new GoogleGenerativeAI(API_TOKEN);

      const model = generativeAI.getGenerativeModel({
        model: 'gemini-pro',
      });

      const result = await model.generateContent(`
        Create a short summary of the page
        "https://willmendesneto.com${window.location.pathname}" with no more than 100 words`);

      const response = await result.response;

      setPostSummary(response.text());
    } catch (error) {
      console.error(error);
      setPostSummary('Failed to summarize');
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <Title>{frontmatter.title}</Title>

      <div style={{ display: 'flex', marginBottom: '20px', marginTop: '10px' }}>
        <PostDate datetime={frontmatter.date} itemprop="datePublished">
          {frontmatter.date} - {timeToRead && `${timeToRead} min read`}
        </PostDate>
        <SummarizeButton onClick={summarizeIt} disabled={isLoadingSummary}>
          ✨ Summarize It ✨
        </SummarizeButton>
      </div>
      <div style={{ marginBottom: '20px', marginTop: '10px' }}>
        {isLoadingSummary && <Skeleton height={100} />}
        {postSummary && <p style={{ color: '#4e4e4e' }}>{postSummary}</p>}
      </div>

      <PostContent itemprop="articleBody">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </PostContent>
      <Share path={frontmatter.path} title={frontmatter.title} tags={tags} />
      <h3>Subscribe</h3>
      <p>
        To keep up with posts on this blog, you can also{' '}
        <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
          subscribe via RSS
        </a>
        .
      </p>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
      }
      timeToRead
    }
  }
`;
