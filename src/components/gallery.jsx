import React from "react";
import ImageGallery from "react-image-gallery";
import { Divider } from "antd";
import styled from "styled-components";

import GalleryPhoto1 from "../assets/1-1.jpg";
import GalleryPhoto2 from "../assets/2-1.jpg";
import GalleryPhoto3 from "../assets/3-1.jpg";
import GalleryPhoto4 from "../assets/4-1.jpg";
import GalleryPhoto5 from "../assets/5-1.jpg";
import GalleryPhoto6 from "../assets/6-1.jpg";
import GalleryPhoto7 from "../assets/7-1.jpg";
import GalleryPhoto8 from "../assets/8-1.jpg";
import GalleryPhoto9 from "../assets/9-1.jpg";
import GalleryPhoto10 from "../assets/10-1.jpg";
import GalleryPhoto11 from "../assets/11-1.jpg";
import GalleryPhoto12 from "../assets/12-1.jpg";
import GalleryPhoto13 from "../assets/13-1.jpg";
import GalleryPhoto14 from "../assets/14-2.jpg";
import GalleryPhoto15 from "../assets/15-1.jpg";
import GalleryPhoto16 from "../assets/16-1.jpg";
import GalleryPhoto17 from "../assets/17-1.jpg";
import GalleryPhoto18 from "../assets/18-1.jpg";
import GalleryPhoto19 from "../assets/19-1.jpg";
import GalleryPhoto20 from "../assets/20-1.jpg";
import GalleryPhoto21 from "../assets/21-2.jpg";
import GalleryPhoto22 from "../assets/22-2.jpg";
import GalleryPhoto23 from "../assets/23-1.jpg";
import GalleryPhoto24 from "../assets/24-1.jpg";
import GalleryPhoto25 from "../assets/25-1.jpg";
import GalleryPhoto26 from "../assets/26-1.jpg";
import GalleryPhoto27 from "../assets/27-1.jpg";
import GalleryPhoto28 from "../assets/28-2.jpg";
import GalleryPhoto29 from "../assets/29-1.jpg";
import GalleryPhoto30 from "../assets/30-1.jpg";

const Wrapper = styled.div`
  padding-top: 42px;
  width: 70%;
  margin: 0 auto;
`;

const Title = styled.p`
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
  text-align: center;
`;

const images = [
  {
    original: GalleryPhoto1,
    thumbnail: GalleryPhoto1,
  },
  {
    original: GalleryPhoto2,
    thumbnail: GalleryPhoto2,
  },
  {
    original: GalleryPhoto3,
    thumbnail: GalleryPhoto3,
  },
  {
    original: GalleryPhoto4,
    thumbnail: GalleryPhoto4,
  },
  {
    original: GalleryPhoto5,
    thumbnail: GalleryPhoto5,
  },
  {
    original: GalleryPhoto6,
    thumbnail: GalleryPhoto6,
  },
  {
    original: GalleryPhoto7,
    thumbnail: GalleryPhoto7,
  },
  {
    original: GalleryPhoto8,
    thumbnail: GalleryPhoto8,
  },
  {
    original: GalleryPhoto9,
    thumbnail: GalleryPhoto9,
  },
  {
    original: GalleryPhoto10,
    thumbnail: GalleryPhoto10,
  },
  {
    original: GalleryPhoto11,
    thumbnail: GalleryPhoto11,
  },
  {
    original: GalleryPhoto12,
    thumbnail: GalleryPhoto12,
  },
  {
    original: GalleryPhoto13,
    thumbnail: GalleryPhoto13,
  },
  {
    original: GalleryPhoto14,
    thumbnail: GalleryPhoto14,
  },
  {
    original: GalleryPhoto15,
    thumbnail: GalleryPhoto15,
  },
  {
    original: GalleryPhoto16,
    thumbnail: GalleryPhoto16,
  },
  {
    original: GalleryPhoto17,
    thumbnail: GalleryPhoto17,
  },
  {
    original: GalleryPhoto18,
    thumbnail: GalleryPhoto18,
  },
  {
    original: GalleryPhoto19,
    thumbnail: GalleryPhoto19,
  },
  {
    original: GalleryPhoto20,
    thumbnail: GalleryPhoto20,
  },
  {
    original: GalleryPhoto21,
    thumbnail: GalleryPhoto21,
  },
  {
    original: GalleryPhoto22,
    thumbnail: GalleryPhoto22,
  },
  {
    original: GalleryPhoto23,
    thumbnail: GalleryPhoto23,
  },
  {
    original: GalleryPhoto24,
    thumbnail: GalleryPhoto24,
  },
  {
    original: GalleryPhoto25,
    thumbnail: GalleryPhoto25,
  },
  {
    original: GalleryPhoto26,
    thumbnail: GalleryPhoto26,
  },
  {
    original: GalleryPhoto27,
    thumbnail: GalleryPhoto27,
  },
  {
    original: GalleryPhoto28,
    thumbnail: GalleryPhoto28,
  },
  {
    original: GalleryPhoto29,
    thumbnail: GalleryPhoto29,
  },
  {
    original: GalleryPhoto30,
    thumbnail: GalleryPhoto30,
  },
];

const Gallery = () => {
  return (
    <Wrapper>
      <Divider style={{ marginTop: 0, marginBottom: 32 }} plain>
        <Title>우리의 아름다운 순간</Title>
      </Divider>
      <ImageGallery
        showPlayButton={false}
        showFullscreenButton={false}
        items={images}
      />
    </Wrapper>
  );
};

export default Gallery;
