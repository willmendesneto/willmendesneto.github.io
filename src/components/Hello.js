import React from 'react';

import styled from 'styled-components';

import profile from '../images/profile.png';
import { screen } from '../styles/screen';

const Image = styled.img`
  width: 243px;
  height: 243px;
  border-radius: 50%;
  background: #b9b9b9;
  float: none;
  border: 1px solid #666;
  border-radius: 50%;
  margin: 10px auto;
  display: block;
  box-shadow: 0 1px 4px;

  ${screen.lg} {
    margin: 15px 0 10px 30px;
    float: right;
  }
`;

const FirstWrapper = styled.div`
  width: 70%;
  display: inline;
`;

const SecondWrapper = styled.div`
  width: 70%;
  display: inline;
`;

const Sidebar = () => (
  <>
    <SecondWrapper>
      <Image
        loading="lazy"
        width="243"
        height="243"
        src={profile}
        alt="Wilson Mendes, Principal Sofware engineer, Google Developer Expert Web Technologies"
      />
    </SecondWrapper>
    <FirstWrapper>
      <h2>
        Principal Software Engineer
        <br />
        Solution Architect
        <br />
      </h2>
      <p>
        Hello, there. I’m a Brazilian Software Engineer (or any cool name that you want to call me) with more than 10
        years of experience in my career and currently based in Brazil.
      </p>
    </FirstWrapper>
    <p>
      I'm a{' '}
      <a href="https://developers.google.com/community/experts/directory/profile/profile-wilson_mendes">
        Google Developer Expert (GDE) in Angular and Web technologies
      </a>{' '}
      and{' '}
      <a href="https://mvp.microsoft.com/en-us/PublicProfile/5003872?fullName=Wilson%20Mendes%20Neto">
        Microsoft Most Valuable Professional (MVP) in Developer technologies
      </a>
      . I published a free e-book titled{' '}
      <a href="https://leanpub.com/nodebots-javascript-and-robotic-in-the-real-world">
        "Nodebots: javascript and robotics in the real world"
      </a>{' '}
      in English and Brazilian Portuguese, which explains several architectural points such as testability, task
      automation and application evolution in IoT applications.
    </p>
    <p>
      I’ve also contributed in several open source projects such as{' '}
      <a href="https://github.com/webpack/webpack/graphs/contributors">Webpack</a>,{' '}
      <a href="https://github.com/paulirish/pwmetrics/graphs/contributors">PWMetrics</a>,{' '}
      <a href="https://github.com/robbyrussell/oh-my-zsh/graphs/contributors">Oh-My-Zsh</a>, created a number of{' '}
      <a href="https://github.com/willmendesneto?tab=repositories">open source projects</a> using JavaScript, Angular,
      React, NodeJS, PHP, Python, C#, Serverless Architecture, Docker, &amp; other languages and technologies.
    </p>
    <p>
      As another initiative to share knowledge and help the community, I just started a video series called{' '}
      <b>
        <a href="https://bit.ly/code-quick-tips">Code Quick Tips</a>
      </b>
      . The idea is to be something quick and direct to the point, so you can spend a few minutes and learn something
      cool!
    </p>
    <p>
      The topics are related to backend, microservices, Frontend and other topics related to Developer technologies.
      Feel free to watch, subscribe and share the videos with your social connections!
    </p>
    <p>
      I’m currently lending my brain to <a href="https://www.leaflink.com/">LeafLink</a> and in my free time I'm a
      speaker and trainer at various conferences around the world in keynotes, workshops, and sessions for events such
      as <a href="https://2018.jsconf.asia/">JSConf</a>,{' '}
      <a href="http://qconsp.com/sp2015/speaker/wilson-mendes.html">QCon</a>, <a href="http://ngjapan.org">NG-Japan</a>,{' '}
      <a href="http://2016.devfest.org.au">DevFest Australia</a>,{' '}
      <a href="https://gdg-siberia.com/speakers/">DevFest Siberia</a> among others.
    </p>
  </>
);

export default Sidebar;
