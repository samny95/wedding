import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Divider } from "antd";
import styled from "styled-components";

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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`;

const ImageWrapper = styled.div`
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease;
  aspect-ratio: 1;
  
  &:hover {
    transform: scale(1.05);
  }
  
  .gatsby-image-wrapper {
    height: 100%;
    width: 100%;
  }
  
  img {
    object-fit: cover;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .gatsby-image-wrapper {
    max-width: 100%;
    max-height: 90vh;
    width: auto;
    height: auto;
  }
  
  img {
    object-fit: contain !important;
    max-height: 90vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: white;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.$position === 'left' ? 'left: -60px;' : 'right: -60px;'}
  z-index: 10000;
  
  &:hover {
    background: white;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
    ${props => props.$position === 'left' ? 'left: 5px;' : 'right: 5px;'}
  }
`;

const ShowMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 12px 32px;
  background: var(--title-color);
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }
`;

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);
  
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          sourceInstanceName: { eq: "assets" }
          extension: { eq: "jpg" }
          name: { regex: "/^[0-9]+-[0-9]+$/" }
        }
        sort: { fields: name, order: ASC }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(
              width: 800
              height: 800
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              quality: 92
              transformOptions: { fit: COVER, cropFocus: CENTER }
            )
            full: gatsbyImageData(
              width: 2400
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              quality: 95
              transformOptions: { fit: INSIDE }
            )
          }
        }
      }
    }
  `);

  // Sort images numerically by extracting the first number from filename
  const images = [...data.allFile.nodes].sort((a, b) => {
    const numA = parseInt(a.name.split('-')[0]);
    const numB = parseInt(b.name.split('-')[0]);
    return numA - numB;
  });

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  };

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null) return;
      
      switch (e.key) {
        case 'Escape':
          setSelectedImage(null);
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const displayedImages = showAll ? images : images.slice(0, 12);

  return (
    <Wrapper>
      <Divider style={{ marginTop: 0, marginBottom: 32 }} plain>
        <Title>웨딩 사진</Title>
      </Divider>
      <GridContainer>
        {displayedImages.map((image, index) => {
          const imageData = getImage(image.childImageSharp);
          const originalIndex = showAll ? index : index;
          return (
            <ImageWrapper key={image.name} onClick={() => handleImageClick(originalIndex)}>
              <GatsbyImage image={imageData} alt={`Gallery ${index + 1}`} />
            </ImageWrapper>
          );
        })}
      </GridContainer>
      
      {!showAll && images.length > 12 && (
        <ShowMoreButton onClick={() => setShowAll(true)}>
          더 보기
        </ShowMoreButton>
      )}
      
      {selectedImage !== null && (
        <Modal onClick={handleClose}>
          <ModalContent>
            <CloseButton onClick={() => setSelectedImage(null)}>×</CloseButton>
            <NavigationButton $position="left" onClick={handlePrevious}>‹</NavigationButton>
            <GatsbyImage
              image={getImage(images[selectedImage].childImageSharp.full)}
              alt={`Gallery ${selectedImage + 1}`}
            />
            <NavigationButton $position="right" onClick={handleNext}>›</NavigationButton>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
};

export default Gallery;
