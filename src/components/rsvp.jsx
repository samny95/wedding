import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Button, Modal, Tabs, Input, Radio, Collapse, Checkbox, message } from "antd";
import styled from "styled-components";
import { Divider } from "antd";
import { CheckCircleTwoTone, DownOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const Wrapper = styled.div`
  padding-top: 42px;
  padding-bottom: 18px;
  width: 70%;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
  text-align: center;
`;

const Message = styled.p`
  font-size: 0.72rem;
  line-height: 1.75;
  opacity: 0.75;
  margin-bottom: 16px;
  width: 100%;
  text-align: center;
`;

const RSVPButton = styled(Button)`
  width: 100%;
  height: 56px;
  font-size: 1rem;
  font-weight: 500;
  background: #7c88ff;
  border: none;
  color: white;
  border-radius: 4px;
  
  &:hover, &:focus {
    background: #6b7aff;
    color: white;
  }
`;

const FormItem = styled.div`
  margin-bottom: 24px;
  text-align: left;
`;

const Label = styled.div`
  font-size: 0.875rem;
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.85);
  
  &:after {
    content: '${props => props.required ? ' *' : ''}';
    color: red;
  }
`;

const StyledInput = styled(Input)`
  height: 48px;
  font-size: 0.875rem;
`;

const StyledRadioGroup = styled(Radio.Group)`
  width: 100%;
  display: flex;
  gap: 8px;
  
  .ant-radio-button-wrapper {
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 46px;
    font-size: 0.875rem;
  }
`;

const Note = styled.p`
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 8px;
  line-height: 1.5;
`;

const PrivacyContent = styled.div`
  font-size: 0.875rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.65);
  
  p {
    margin-bottom: 8px;
  }
  
  ul {
    margin-left: 20px;
    margin-bottom: 12px;
  }
  
  li {
    margin-bottom: 4px;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  height: 56px;
  font-size: 1rem;
  font-weight: 500;
  background: #7c88ff;
  border: none;
  color: white;
  border-radius: 4px;
  margin-top: 24px;
  
  &:hover, &:focus {
    background: #6b7aff;
    color: white;
  }
  
  &:disabled {
    background: #d9d9d9;
    color: rgba(0, 0, 0, 0.25);
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-header {
    border-bottom: 1px solid #f0f0f0;
  }
  
  .ant-modal-body {
    padding: 24px;
  }
  
  .ant-collapse-header {
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

const SideSelector = styled.div`
  margin-bottom: 32px;
  
  .ant-radio-group {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  
  .ant-radio-button-wrapper {
    text-align: center;
    height: 48px;
    line-height: 46px;
    font-size: 0.875rem;
    
    @media (max-width: 480px) {
      font-size: 0.75rem;
      padding: 0 8px;
    }
  }
`;

const RSVP = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    side: "groom",
    name: "",
    phone4: "",
    guests: "",
    attendance: "attending",
    privacyAgreed: false,
  });

  const handleOpen = () => {
    setVisible(true);
  };

  // Expose handleOpen to parent component via ref
  useImperativeHandle(ref, () => ({
    openModal: handleOpen
  }));

  const handleClose = () => {
    setVisible(false);
    // Reset form
    setFormData({
      side: "groom",
      name: "",
      phone4: "",
      guests: "",
      attendance: "attending",
      privacyAgreed: false,
    });
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      message.warning("성명을 입력해주세요.");
      return false;
    }
    if (!formData.phone4.trim() || !/^\d{4}$/.test(formData.phone4)) {
      message.warning("전화번호 뒷자리 4자리를 입력해주세요.");
      return false;
    }
    if (!formData.guests.trim() || isNaN(formData.guests) || parseInt(formData.guests) < 1) {
      message.warning("참석인원을 올바르게 입력해주세요.");
      return false;
    }
    if (!formData.privacyAgreed) {
      message.warning("개인정보 수집 및 이용에 동의해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with your Google Apps Script Web App URL
      const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxLkd_08FMnkuu4BHRGuj-zDBoxDfm3bZZUKcecMj2mfYU4oriK4py4J2pwZZtpNSvw/exec";
      
      const sideMapping = {
        "groom": "신랑",
        "bride": "신부",
        "groomParents": "신랑 측 혼주",
        "brideParents": "신부 측 혼주"
      };
      
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors", // Important for Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          side: sideMapping[formData.side] || formData.side,
          name: formData.name,
          phone4: formData.phone4,
          guests: formData.guests,
          // attendance: formData.attendance === "attending" ? "예정" : 
          //            formData.attendance === "notAttending" ? "안함" : "미정",
        }),
      });

      // Since we're using no-cors, we won't get a readable response
      // Assume success if no error is thrown
      message.success("참석 의사가 전달되었습니다. 감사합니다!");
      handleClose();
    } catch (error) {
      console.error("Submit error:", error);
      message.error("전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Divider style={{ marginTop: 0, marginBottom: 32 }} plain>
        <Title data-aos="fade-up">참석 의사 전달</Title>
      </Divider>
      <Message data-aos="fade-up">
        축하의 마음으로 참석해 주실
        <br />
        {/* <br /> */}
        모든 분을 정중히 모시고자 하오니,
        <br />
        {/* <br /> */}
        참석 여부를 알려주시면 감사하겠습니다.
      </Message>
      <RSVPButton 
        data-aos="fade-up" 
        onClick={handleOpen}
        icon={<CheckCircleTwoTone twoToneColor="#ffffff" />}
      >
        참석 의사 전달 (RSVP)
      </RSVPButton>

      <StyledModal
        title="참석 의사 전달"
        visible={visible}
        onCancel={handleClose}
        footer={null}
        width={600}
        centered
      >
        <SideSelector>
          <Label required>누구의 하객이신가요?</Label>
          <Radio.Group
            value={formData.side}
            onChange={(e) => handleInputChange("side", e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="groom">신랑</Radio.Button>
            <Radio.Button value="bride">신부</Radio.Button>
            <Radio.Button value="groomParents">신랑 측 혼주</Radio.Button>
            <Radio.Button value="brideParents">신부 측 혼주</Radio.Button>
          </Radio.Group>
        </SideSelector>

        <FormItem>
          <Label required>성명</Label>
          <StyledInput
            placeholder="참석자 성함"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </FormItem>

        <FormItem>
          <Label required>전화번호 뒷자리 (식별번호)</Label>
          <StyledInput
            placeholder="전화번호 뒷 4자리"
            type="tel"
            maxLength={4}
            value={formData.phone4}
            onChange={(e) => handleInputChange("phone4", e.target.value.replace(/\D/g, ""))}
          />
          <Note>
            중복 확인을 위한 식별번호로 사용됩니다.
          </Note>
        </FormItem>

        <FormItem>
          <Label required>참석인원</Label>
          <StyledInput
            placeholder="본인 포함 총 참석인원수"
            type="number"
            min="1"
            value={formData.guests}
            onChange={(e) => handleInputChange("guests", e.target.value)}
          />
          <Note>
            {/* ※ 전달한 내용은 수정이 불가합니다.<br />
            내용 변경이 있을 경우 재전달해주세요. */}
            ※ 내용 변경이 있을 경우 다시 전달 (submit) 해주세요.

          </Note>
        </FormItem>

        <Collapse
          bordered={false}
          ghost
          expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
        >
          <Panel header="개인정보 수집 및 이용 동의 (필수)" key="1">
            <PrivacyContent>
                  <p>참석여부 전달을 위한 개인정보 수집 및 이용에 동의해주세요.</p>
                  
                  <p><strong>• 제공 받는 자:</strong> 모바일 청첩장 주문자(신랑, 신부)</p>
                  <p><strong>• 이용 목적:</strong> 행사 참석여부 확인 및 중복 식별</p>
                  <p><strong>• 제공 항목:</strong> 참석자 성함, 전화번호 뒷자리, 참석인원</p>
                  <p><strong>• 보존 기간:</strong> 예식일로부터 3개월</p>
                  <p>개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며 동의 거부 시 참석여부 서비스 이용이 불가합니다.</p>
            </PrivacyContent>
          </Panel>
        </Collapse>

        <Checkbox
          checked={formData.privacyAgreed}
          onChange={(e) => handleInputChange("privacyAgreed", e.target.checked)}
          style={{ marginTop: 16 }}
        >
          수집 및 이용에 동의합니다.
        </Checkbox>

        <SubmitButton
          onClick={handleSubmit}
          loading={loading}
          disabled={!formData.privacyAgreed}
        >
          참석 의사 전달
        </SubmitButton>
      </StyledModal>
    </Wrapper>
  );
});

export default RSVP;
