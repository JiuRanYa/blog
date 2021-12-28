import React from "react";
import { useSpring, animated } from "react-spring";
import styled from "@emotion/styled";
import BgImage from "@site/static/img/home/bg.svg";
import MusicUrl from "@site/static/img/home/music.svg";
import Styles from "./HomepageFeatures.module.scss";

export default function HomepageFeatures() {
  const props = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(3em)" },
    delay: 0,
  });

  const props2 = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(3em)" },
    delay: 300,
  });

  const props3 = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(3em)" },
    delay: 600,
  });

  return (
    <div className={Styles.mainWrapper}>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          height: "calc(100vh - 60px)",
        }}
      >
        <SvgBackGround />
      </div>
      <div style={props} className={Styles.title}>
        Welcome to
        <span>JiuRan</span>
        's Channel
      </div>
      <Music></Music>
    </div>
  );
}

const WelcomeTitle = styled(animated.h1)`
  margin-bottom: 50px;
  flex: 1 1;
  display: flex;
  font-size: 3rem;
  justify-content: center;
  & > span {
    color: #338bff;
  }
`;

const SvgBackGround = styled(BgImage)`
  height: 70%;
  width: 50vw;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: cover;
`;

const MainWrapper = styled.div``;

const Music = styled(MusicUrl)`
  position: fixed;
  bottom: 0px;
  right: 0px;
`;
