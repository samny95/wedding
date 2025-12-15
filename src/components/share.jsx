import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Divider, message } from "antd";
import { MessageFilled, LinkOutlined, CalendarOutlined } from "@ant-design/icons";
import styled from "styled-components";

import {
  KAKAOTALK_API_TOKEN,
  KAKAOTALK_SHARE_IMAGE,
  WEDDING_INVITATION_URL,
  GROOM_NAME,
  BRIDE_NAME,
  WEDDING_DATE,
  WEDDING_LOCATION,
} from "../../config";

const Wrapper = styled.div`
  padding-top: 42px;
  width: 100%;
  text-align: center;
`;

const Title = styled.span`
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
`;

const KakaoTalkShareButton = styled(Button)`
  background: #fee500;
  border-color: #fee500;
  color: #181600;
  width: 100%;
  &:hover {
    background-color: #fcf07e !important;
    border-color: #fcf07e !important;
    color: #17160b !important;
  }
  &:focus {
    background-color: #fcf07e !important;
    border-color: #fcf07e !important;
    color: #17160b !important;
  }
`;

const LinkShareButton = styled(Button)`
  background-color: rgba(217, 125, 131, 0.2);
  border-color: rgba(217, 125, 131, 0.2) !important;
  color: var(--title-color) !important;
  font-weight: 400 !important;
  align-item: center;
  width: 100%;
  &:hover {
    background-color: rgb(217 125 131 / 48%) !important;
    border-color: rgb(217 125 131 / 48%) !important;
    color: var(--title-color) !important;
  }
`;

const CalendarButton = styled(Button)`
  background-color: rgba(217, 125, 131, 0.2);
  border-color: rgba(217, 125, 131, 0.2) !important;
  color: var(--title-color) !important;
  font-weight: 400 !important;
  align-item: center;
  width: 100%;
  &:hover {
    background-color: rgb(217 125 131 / 48%) !important;
    border-color: rgb(217 125 131 / 48%) !important;
    color: var(--title-color) !important;
  }
`;

const Share = () => {
  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;

      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(KAKAOTALK_API_TOKEN);
      }

      kakao.Link.createDefaultButton({
        objectType: "feed",
        container: "#sendKakao",
        content: {
          title: `${GROOM_NAME}❤${BRIDE_NAME} 결혼식에 초대합니다`,
          description: "아래의 '청첩장 열기' 버튼을 눌러 읽어주세요🤵👰",
          imageUrl: KAKAOTALK_SHARE_IMAGE,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "청첩장 열기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
        installTalk: true,
      });

      setTimeout(() => {
        document.getElementById("sendKakao")?.click();
        message.success("카카오톡으로 청첩장을 공유합니다!");
      }, 100);
    }
  };

  const addToGoogleCalendar = () => {
    const eventDetails = {
      text: `${GROOM_NAME}❤${BRIDE_NAME} 결혼식`,
      dates: '20260302T173000/20260302T203000', // March 2, 2026, 5:30 PM - 8:30 PM (3 hours)
      details: `${GROOM_NAME}❤${BRIDE_NAME}의 결혼식에 초대합니다.\n\n청첩장 링크: https://samny95.github.io/wedding/`,
      location: '서울 강남구 논현로 645 호텔 엘리에나 5층 그랜드볼룸',
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventDetails.text
    )}&dates=${eventDetails.dates}&details=${encodeURIComponent(
      eventDetails.details
    )}&location=${encodeURIComponent(eventDetails.location)}`;

    window.open(googleCalendarUrl, '_blank');
    message.success("구글 캘린더가 열립니다!");
  };

  const downloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
BEGIN:VEVENT
DTSTART:20260302T173000
DTEND:20260302T203000
SUMMARY:${GROOM_NAME}❤${BRIDE_NAME} 결혼식
DESCRIPTION:${GROOM_NAME}❤${BRIDE_NAME}의 결혼식에 초대합니다.\\n\\n청첩장 링크: https://samny95.github.io/wedding/
LOCATION:서울 강남구 논현로 645 호텔 엘리에나 5층 그랜드볼룸
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:1시간 후 결혼식이 있습니다
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${GROOM_NAME}_${BRIDE_NAME}_결혼식.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("캘린더 파일이 다운로드되었습니다!");
  };

  return (
    <Wrapper>
      <Divider
        data-aos="fade-up"
        plain
        style={{ marginTop: 0, marginBottom: 32 }}
      >
        <Title>공유 및 캘린더 저장</Title>
      </Divider>
      {/* <KakaoTalkShareButton
        style={{ margin: 0 }}
        icon={<MessageFilled />}
        id="sendKakao"
        size="large"
        onClick={createKakaoButton}
      >
        카카오톡으로 공유하기
      </KakaoTalkShareButton> */}
      <CopyToClipboard text={typeof window !== 'undefined' ? window.location.href : WEDDING_INVITATION_URL}>
        <LinkShareButton
          style={{ margin: 0 }}
          icon={<LinkOutlined />}
          size="large"
          onClick={() => message.success("청첩장 링크가 복사되었습니다.")}
        >
          링크로 공유하기
        </LinkShareButton>
      </CopyToClipboard>
      <CalendarButton
        style={{ margin: 0 }}
        icon={<CalendarOutlined />}
        size="large"
        onClick={addToGoogleCalendar}
      >
        구글 캘린더에 추가
      </CalendarButton>
      <CalendarButton
        style={{ margin: 0 }}
        icon={<CalendarOutlined />}
        size="large"
        onClick={downloadICS}
      >
        캘린더 파일 다운로드 (.ics)
      </CalendarButton>
    </Wrapper>
  );
};

export default Share;
