import React, { useEffect, useState, useRef } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import "react-image-gallery/styles/css/image-gallery.css";
import "antd/dist/antd.css";
import Gallery from "../components/gallery";
import Greeting from "../components/greeting";
import Title from "../components/title";
import "../styles/index.css";

import GroovePaper from "../assets/GroovePaper.png";
import Location from "../components/location";
import CongratulatoryMoney from "../components/congratulatoryMoney";
import RSVP from "../components/rsvp";
import Share from "../components/share";
import Quote from "../components/quote";
import Song from "../assets/[MapleStory BGM] Amoria.mp3";

import AOS from "aos";
import "aos/dist/aos.css";

// markup
const { Footer } = Layout;

const Wrapper = styled.div`
  background: #efebe9;
  background-image: url(${GroovePaper});
  width: 100%;
`;

const MusicButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #d7ccc8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 24px;
    height: 24px;
    fill: #8d6e63;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const RSVPFloatingButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(124, 136, 255, 0.9);
  border: 2px solid #6b7aff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    background: rgba(107, 122, 255, 1);
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 28px;
    height: 28px;
    fill: white;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 80px;
    right: 20px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const NotificationBanner = styled.div`
  position: fixed;
  top: ${props => props.show ? '20px' : '-100px'};
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #7c88ff 0%, #6b7aff 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(124, 136, 255, 0.4);
  z-index: 2000;
  transition: top 0.5s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 90%;
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 0.875rem;
    top: ${props => props.show ? '10px' : '-100px'};
  }
`;

const BannerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  
  svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
`;

const BannerText = styled.span`
  font-weight: 500;
  line-height: 1.4;
`;

const BannerButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const IndexPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const rsvpRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    document.body.appendChild(script);

    return () => {
      document.body.romoveChile(script);
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
    
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisitedWedding');
    if (!hasVisited) {
      // Show banner after 2 seconds for first-time visitors
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      
      // Mark as visited
      localStorage.setItem('hasVisitedWedding', 'true');
      
      return () => clearTimeout(timer);
    }
    
    // Enable audio after user interaction
    const enableAudio = () => {
      const audio = document.getElementById('bgMusic');
      if (audio && audio.muted) {
        audio.muted = false;
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(e => console.log('Audio play failed:', e));
      }
      // Remove listeners after first interaction
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('scroll', enableAudio);
    };
    
    // Add multiple event listeners for better compatibility
    document.addEventListener('click', enableAudio);
    document.addEventListener('touchstart', enableAudio);
    document.addEventListener('scroll', enableAudio);
    
    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('scroll', enableAudio);
    };
  });

  const toggleMusic = () => {
    const audio = document.getElementById('bgMusic');
    if (audio) {
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(e => console.log('Audio play failed:', e));
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleRSVPClick = () => {
    if (rsvpRef.current) {
      rsvpRef.current.openModal();
    }
  };

  const handleBannerRSVP = () => {
    setShowBanner(false);
    handleRSVPClick();
  };

  const closeBanner = () => {
    setShowBanner(false);
  };

  return (
    <Wrapper>
      <Helmet>
        <title>손샘❤이나영 결혼식에 초대합니다</title>
        <meta name="description" content="2026년 3월 2일, 월요일 17시 30분 | 엘리에나 호텔, 5층 그랜드볼룸" />
        <meta property="og:title" content="손샘❤이나영 결혼식에 초대합니다" />
        <meta property="og:description" content="2026년 3월 2일, 월요일 17시 30분 | 엘리에나 호텔, 5층 그랜드볼룸" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://samny95.github.io/wedding/" />
        {/* <meta property="og:image" content="https://samny95.github.io/wedding/og-image.jpg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="1200" /> */}
      </Helmet>
      <audio id="bgMusic" autoPlay loop muted>
        <source src={Song} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <NotificationBanner show={showBanner}>
        <BannerContent>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
          </svg>
          <BannerText>참석 여부를 알려주세요</BannerText>
        </BannerContent>
        <BannerButton onClick={handleBannerRSVP}>
          참석의사 전달
        </BannerButton>
        <CloseButton onClick={closeBanner} aria-label="Close notification">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </CloseButton>
      </NotificationBanner>
      
      <MusicButton onClick={toggleMusic} aria-label={isPlaying ? "Pause music" : "Play music"}>
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </MusicButton>
      <RSVPFloatingButton onClick={handleRSVPClick} aria-label="Open RSVP form">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
        </svg>
      </RSVPFloatingButton>
      <Title />
      <Greeting />
      <RSVP ref={rsvpRef} />
      <Gallery />
      <Location />
      <CongratulatoryMoney />
      <Quote />
      <Share />
      <Footer
        style={{
          background: "#D7CCC8",
          backgroundImage: `url(${GroovePaper})`,
          opacity: 0.6,
          textAlign: "center",
        }}
      >
        {/* Copyright © 2022 Shin Jooyoung */}
      </Footer>
    </Wrapper>
  );
};

export default IndexPage;
