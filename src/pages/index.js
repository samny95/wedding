import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";
import "antd/dist/antd.css";
import Gallery from "../components/gallery";
import Greeting from "../components/greeting";
import Title from "../components/title";
import "../styles/index.css";

import GroovePaper from "../assets/GroovePaper.png";
import Location from "../components/location";
import CongratulatoryMoney from "../components/congratulatoryMoney";
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

const IndexPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <Wrapper>
      <audio id="bgMusic" autoPlay loop muted>
        <source src={Song} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
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
      <Title />
      <Greeting />
      <Gallery />
      <Location />
      <Quote />
      <CongratulatoryMoney />
      <Share />
      <Footer
        style={{
          background: "#D7CCC8",
          backgroundImage: `url(${GroovePaper})`,
          opacity: 0.6,
          textAlign: "center",
        }}
      >
        Copyright © 2022 Shin Jooyoung
      </Footer>
    </Wrapper>
  );
};

export default IndexPage;
