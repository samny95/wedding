import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import styled from "styled-components";
import Flower from "../assets/flower2.png";
import MapImage from "../assets/map.jpg";

const Wrapper = styled.div`
  padding-top: 42px;
  width: 70%;
  margin: 0 auto;
`;

const Title = styled.span`
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 1.375rem;
  padding-bottom: 42px;
`;

const Content = styled.p`
  font-size: 0.875rem;
  line-height: 1.75;
  opacity: 0.75;
  width: 100%;
  text-align: center;
  padding-top: 42px;
  padding-bottom: 42px;
  margin: 0;
`;

const Map = styled.div`
  width: 100%;
  padding: 0;
`;

const MapImg = styled.img`
  width: 100%;
  max-width: 500px;
  margin: 20px auto 0;
  display: block;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    max-width: 100%;
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
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
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

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
  }
`;

const Location = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 카카오 맵 불러오기

  // <!-- 3. 실행 스크립트 -->
  const executeScript = () => {
    const scriptTag = document.createElement("script");
    const inlineScript = document.createTextNode(`new daum.roughmap.Lander({
    "timestamp" : "1765440937193",
    "key" : "dp5eokzbpfn",
    "mapWidth" : "640",
    "mapHeight" : "360"
  }).render();`);
    scriptTag.appendChild(inlineScript);
    document.body.appendChild(scriptTag);
  };

  // <!-- 2. 설치 스크립트 * 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다. -->
  // document.write 문제가 발생해서 해당 파일을 직접 가져온다음 수정했음
  const InstallScript = () => {
    (function () {
      let c = window.location.protocol === "https:" ? "https:" : "http:";
      let a = "16137cec";

      if (window.daum && window.daum.roughmap && window.daum.roughmap.cdn) {
        return;
      }
      window.daum = window.daum || {};
      window.daum.roughmap = {
        cdn: a,
        URL_KEY_DATA_LOAD_PRE: c + "//t1.daumcdn.net/roughmap/",
        url_protocal: c,
      };
      let b =
        c +
        "//t1.daumcdn.net/kakaomapweb/place/jscss/roughmap/" +
        a +
        "/roughmapLander.js";

      // document.write -> doumnet.body.append로 수정
      const scriptTag = document.createElement("script");
      scriptTag.src = b;
      document.body.append(scriptTag);
      scriptTag.onload = () => {
        executeScript();
      };
    })();
  };

  useEffect(() => {
    InstallScript();
  }, [InstallScript]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <Wrapper>
      <Divider plain style={{ marginTop: 0, marginBottom: 32 }}>
        <Title>오시는 길</Title>
      </Divider>
      <Image src={Flower} />
      <Map
        id="daumRoughmapContainer1765440937193"
        className="root_daum_roughmap root_daum_roughmap_landing"
      ></Map>
      <MapImg src={MapImage} alt="Location Map" onClick={handleImageClick} />
      {isModalOpen && (
        <Modal onClick={handleClose}>
          <ModalContent>
            <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
            <ModalImage src={MapImage} alt="Location Map" />
          </ModalContent>
        </Modal>
      )}
      <Content>
        서울 강남구 논현로 645
        <br />
        호텔 엘리에나 5층 그랜드볼룸
        <br />
        <br />
        <Title>자차 이용시</Title>
        <br />
        <br />
        자차 이용시 호텔 정문에서 주차요원의 안내를 받으실 수 있으며
        <br />
        2시간 무료 주차가 가능합니다.
        <br />
        <br />
        <Title>버스 이용시</Title>
        <br />
        <br />
        147, 241, 463, 3412, 4211 논현동고개(23-119) 하차 후 학동역 방면 도보 130m
        <br />
        147, 463, 4211 논현고개(23-146) 하차 후 맞은편 도보 140m
        <br />
        <br />
        <Title>지하철 이용시</Title>
        <br />
        <br />
        7호선 학동역(4번 출구) 하차 (도보 4분)
        <br />
        9호선 언주역(2번 출구) 하차 (도보 6분)
      </Content>
    </Wrapper>
  );
};

export default Location;
