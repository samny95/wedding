import React from "react";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import {
  WEDDING_DATE,
  WEDDING_LOCATION,
  GROOM_NAME,
  BRIDE_NAME,
} from "../../config.js";

const Layout = styled.div`
  width: 70%;
  overflow: hidden;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 42px;
  font-weight: 500 !important;
  color: var(--title-color);
  animation: fadein 3s;
  -moz-animation: fadein 3s;
  -webkit-animation: fadein 3s;
  -o-animation: fadein 3s;
`;

const ImageBackground = styled.img`
  width: 100%;
  display: block;
`;

const WeddingInvitation = styled.p`
  font-size: 0.825rem;
  opacity: 0.45;
  margin-bottom: 16px;
`;

const GroomBride = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 0.9;
  margin-bottom: 16px;
`;

const Schedule = styled.p`
  font-size: 1.06rem;
  opacity: 0.65;
  margin-bottom: 24px;
`;

const Title = () => {
  return (
    <Layout>
      <TitleWrapper>
        <WeddingInvitation>WEDDING INVITATION</WeddingInvitation>
        <GroomBride>
          {GROOM_NAME} &#38; {BRIDE_NAME}
        </GroomBride>
        <Schedule>
          {WEDDING_DATE}
          <br />
          {WEDDING_LOCATION}
        </Schedule>
      </TitleWrapper>

      {/* replaced the <video> with an <img> */}
      <StaticImage 
        src="../assets/25-1.jpg" 
        alt="wedding background"
        placeholder="blurred"
        quality={80}
        formats={["auto", "webp"]}
        style={{ width: "100%", display: "block" }}
      />
    </Layout>
  );
};

export default Title;
