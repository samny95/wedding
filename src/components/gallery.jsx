import React, { useState, useCallback } from "react";
import { Divider } from "antd";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";

const Wrapper = styled.div`
  padding-top: 42px;
  width: 70%;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Title = styled.p`
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
  text-align: center;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 1;
  
  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }
  
  .gatsby-image-wrapper {
    height: 100%;
  }
`;

const Modal = styled.div`
  display: ${props => props.show ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  
  .gatsby-image-wrapper {
    max-height: 85vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  z-index: 10000;
  
  &:hover {
    background: white;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'prev' ? 'left: 20px;' : 'right: 20px;'}
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  
  &:hover {
    background: white;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
`;

const Gallery = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          sourceInstanceName: { eq: "assets" }
          extension: { regex: "/(jpg|jpeg|png)/" }
          name: { regex: "/^[0-9]+-[0-9]+$/" }
        }
        sort: { fields: name, order: ASC }
      ) {
        nodes {
          id
          name
          childImageSharp {
            gatsbyImageData(
              width: 800
              quality: 75
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
            full: gatsbyImageData(
              width: 1920
              quality: 85
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  `);

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = data.allFile.nodes;

  const openModal = useCallback((index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  }, [images]);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  }, [currentIndex, images]);

  const goToPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  }, [currentIndex, images]);

  return (
    <Wrapper>
      <Divider style={{ marginTop: 0, marginBottom: 32 }} plain>
        <Title>우리의 아름다운 순간</Title>
      </Divider>
      <GalleryGrid>
        {images.map((image, index) => {
          const imageData = getImage(image);
          return (
            <ImageWrapper key={image.id} onClick={() => openModal(index)}>
              <GatsbyImage 
                image={imageData} 
                alt={`Gallery photo ${index + 1}`}
                loading="lazy"
              />
            </ImageWrapper>
          );
        })}
      </GalleryGrid>
      
      <Modal show={!!selectedImage} onClick={closeModal}>
        <CloseButton onClick={closeModal}>×</CloseButton>
        {selectedImage && (
          <>
            <NavButton direction="prev" onClick={(e) => { e.stopPropagation(); goToPrev(); }}>
              ‹
            </NavButton>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <GatsbyImage 
                image={getImage(selectedImage.childImageSharp.full)} 
                alt={`Gallery photo ${currentIndex + 1}`}
              />
            </ModalContent>
            <NavButton direction="next" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
              ›
            </NavButton>
          </>
        )}
      </Modal>
    </Wrapper>
  );
};

export default Gallery;
