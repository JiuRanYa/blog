import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import { useSpring,animated } from 'react-spring'
import styled from "@emotion/styled";

export default function HomepageFeatures() {
  const props = useSpring({
    opacity: 1,transform: "translateY(0)",
    from: {opacity: 0, transform: "translateY(3em)"},
    delay: 0,
  })
  
  const props2 = useSpring({
    opacity: 1,transform: "translateY(0)",
    from: {opacity: 0, transform: "translateY(3em)"},
    delay: 300,
  })
  
  const props3 = useSpring({
    opacity: 1,transform: "translateY(0)",
    from:{opacity: 0, transform: "translateY(3em)"},
    delay: 600,
  })
  
  return (
    <MainWrapper>
      <WelcomeTitle style={props}>
        Welcome to
        <span>JiuRan's Channel</span>
      </WelcomeTitle>
      <animated.p style={props2}>Make things as simple as possible but no simpler.</animated.p>
      <StartBtn
        href='/docs/algorithm/二叉树/preorder'
        style={props3}
      >Get Started</StartBtn>
    </MainWrapper>
  );
}

const WelcomeTitle = styled(animated.h1)`
  margin-bottom: 50px;
`

const StartBtn = styled(animated.a)`
  width: 200px;
  height: 68px;
  color: black;
  border: 1px solid gray;
  text-align: center;
  line-height: 67px;
  font-size: 20px;
  border-radius: 8px;
  margin-top: 50px;
  transition: .3s ease;
  background-color: #2a9d8f;
  color: aliceblue;
  &:hover{
    text-decoration: none;
    transition: .3s ease;
    color: black;
    background-color: #fff;
  }
`

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 60px);
  align-items: center;
  background: url('../../static/img/home/bgimage.jpg');
  background-repeat: no-repeat;
  background-position: right center;
  background-size: cover;
`