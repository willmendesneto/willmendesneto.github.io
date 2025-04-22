import React from 'react';
import styled from 'styled-components';

const SkeletonWrapper = styled.div`
  .skeleton-loader {
  box-sizing: border-box;
  margin-left: 1.45rem;
  margin-right: 1.45rem;

  overflow: hidden;
  position: relative;

  background: rgb(239, 241, 246) no-repeat;

  border-radius: 4px;
  width: 100%;
  height: 30px;
  display: inline-block;

  will-change: transform;

  &:after,
  &:before {
    box-sizing: border-box;
  }

  &.circle {
    width: 40px;
    height: 40px;
    margin: 5px;
    border-radius: 50%;
  }

  &.progress{
    &:after,
    &:before {
      box-sizing: border-box;
    }
    // position: relative;
    // this adds GPU acceleration
    transform: translate3d(0, 0, 0);

    &:before {
      animation: progress 2s ease-in-out infinite;
      background-size: 200px 100%;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 200px;
      height: 100%;
      content: '';
    }
  }

  &.progress {
    &:before {
      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0)
      );
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &.progress::before  {
      animation: none;
    }

    &.progress::before {
      background-image: none;
    }
  }

  @media screen and (min-device-width: 1200px) {
    user-select: none;
    cursor: wait;
  }
}

// CSS Animation Keyframes
@keyframes progress {
  0% {
    transform: translate3d(-200px, 0, 0);
  }
  100% {
    transform: translate3d(calc(200px + 100vw), 0, 0);
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
`;

export default function Skeleton() {
  return (
    <SkeletonWrapper  className="user-card">
      <div style={{ marginTop: '50px' }} />

      <div
        className="skeleton-loader progress"
        aria-busy="true"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuetext="Loading ..."
        role="progressbar"
        tabIndex="-1"
        style={{ marginBottom: '20px', height: '40px' }}
      />

      <div
        className="skeleton-loader progress"
        aria-busy="true"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuetext="Loading ..."
        role="progressbar"
        tabIndex="-1"
      />

<div
        className="skeleton-loader progress"
        aria-busy="true"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuetext="Loading ..."
        role="progressbar"
        tabIndex="-1"
      />

<div
        className="skeleton-loader progress"
        aria-busy="true"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuetext="Loading ..."
        role="progressbar"
        tabIndex="-1"
      />

<div
        className="skeleton-loader progress"
        aria-busy="true"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuetext="Loading ..."
        role="progressbar"
        tabIndex="-1"
      />

<div style={{ marginBottom: '60px' }} />
    </SkeletonWrapper>
  )
}

