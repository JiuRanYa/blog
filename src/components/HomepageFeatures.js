import React from "react";
import { useSpring } from "react-spring";
import styled from "@emotion/styled";
import BgImage from "@site/static/img/home/bg2.svg";
import Styles from "./HomepageFeatures.module.scss";

export default function HomepageFeatures() {
  const props = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(3em)" },
    delay: 0,
  });

  return (
    <div className={Styles.mainWrapper}>
      <div style={props} className={Styles.title}>
        <div>
          Welcome to
          <span>JiuRan</span>
          's Channel
        </div>
        <div class={Styles.subTitle}>计算机编程爱好者, 深耕前端</div>
        {/* <SocialLinks animatedProps={animatedTexts[4]} /> */}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          height: "calc(100vh - 60px)",
        }}
      >
        <SvgBackGround />
      </div>
      {/* <Music></Music> */}
    </div>
  );
}

const SvgBackGround = styled(BgImage)`
  height: 70%;
  width: 50vw;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: cover;
  margin-bottom: 20px;
`;
