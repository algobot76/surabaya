import React from "react";
import styled from "styled-components";

const Container = styled.div`
  z-index: 100;
  text-align: center;
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`;

const Expand = styled.div`
  flex: 1;
`;

const WelcomeTo = styled.p`
  font-size: 2em;
  font-family: "Oregano";
  color: white;
  animation: fadein 2s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Surabaya = styled.p`
  font-size: 8em;
  font-family: "Oregano";
  color: white;
  flex: 2;
  animation: fadein 8s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Upload = styled.p`
  font-size: 2em;
  color: white;
  font-family: "Oregano";
  animation: fadein 8s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

function WelcomeToSurabaya() {
  return (
    <Container>
      <Expand />
      <WelcomeTo>Welcome to</WelcomeTo>
      <Surabaya>Surabaya 🏝️</Surabaya>
      <Upload>⬅️ Upload a Java Project ☕ to visualize it</Upload>
      <Expand />
    </Container>
  );
}

export default WelcomeToSurabaya;
