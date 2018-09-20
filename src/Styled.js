import React, { Fragment } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";
import { CheckBox } from "./Icons";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  visibility: ${props => (props.visible ? "visible" : "hidden")};
  z-index: 5;
`;

export const Modal = styled.div`
  width: 360px;
  margin: 30px auto 0;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 24px 38px 3px,
    rgba(0, 0, 0, 0.12) 0px 9px 46px 8px, rgba(0, 0, 0, 0.2) 0px 11px 15px -7px;
`;

export const FeedBackBox = ({ children, visible }) => (
  <Overlay visible={visible}>
    <Modal children={children} />
  </Overlay>
);

export const Header = styled.div`
  height: 56px;
  width: 360px;
  background-color: rgb(96, 125, 139);
  box-sizing: border-box;
  color: white;
  padding: 14px 0 0 15px;
  font-size: 21px;
  font-family: roboto, sans-serif;
`;

export const TextArea = styled.textarea`
  border: none;
  box-sizing: border-box;
  box-shadow: none;
  color: rgb(33, 33, 33);
  max-width: 100%;
  outline: none;
  height: 163px;
  padding: 18px 16px 0px;
  resize: none;
  width: 100%;
  font-family: roboto, sans-serif;
`;

export const LegalMessage = styled.div`
  font-size: 12px;
  color: rgb(117, 117, 117);
  padding: 12px 16px 12px;
  font-family: roboto, sans-serif;
`;

const Button = styled.button`
  background-color: transparent;
  border-color: transparent;
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 14px;
  font-family: sans-serif;
  height: 36px;
  margin: 0px;
  min-width: 64px;
  opacity: 1;
  outline: none;
  padding: 0px 8px;

  &:hover {
    background-color: rgb(238, 238, 238);
    cursor: pointer;
  }

  &:active {
    background-color: rgb(189, 189, 189);
  }

  &:focus {
    outline: 0;
  }
`;

export const Footer = styled.div`
  background-color: rgb(250, 250, 250);
  border-top: 1px solid rgb(224, 224, 224);
  box-sizing: border-box;
  height: 56px;
  padding: 10px 10px 4px 0;

  > button {
    float: right;
  }
`;
export const Cancel = styled(Button).attrs({ children: "CANCEL" })`
  color: rgb(117, 117, 117);
`;

export const Save = styled(Button).attrs({ children: "SAVE" })`
  color: rgb(66, 133, 244);
`;

const AttachScreenShotBox = styled.div`
  padding: 8px 16px 4px 12px;
  background-color: rgb(250, 250, 250);k
`;

const Label = styled.div`
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  font-family: sans-serif;
  user-select: none;
  padding: 4px 0 0 10px;
`;

export const AttachScreenShot = ({ value, onChange }) => (
  <AttachScreenShotBox>
    <CheckBox active={value} onClick={onChange} />
    <Label>Include screenshot</Label>
  </AttachScreenShotBox>
);

const ScreenShotBox = styled.div`
  height: 192px;
  width: 360px;
  border: none;
  background-color: #efefef;
  z-index: 1;
  > img {
    left: 50%;
    transform: translate(-50%, 0);
    position: absolute;
    z-index: 1;
  }
`;

const ScreenShot = styled.img`
  height: 192px;
  max-width: 320px;
  margin: 0 auto;
  border: none;
  position: absolute;
  z-index: 1;
`;

const HighlightMessage = styled.div.attrs({
  children: "Click here to highlight or hide info"
})`
  position: absolute;
  height: 192px;
  width: 360px;
  text-align: center;
  padding-top: 80px;
  box-sizing: border-box;
  border: none;
  color: #7b7b7b;
  user-select: none;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: #1e88e5;
  }
`;

export const ScreenShotPreview = ({ image, onClick }) => (
  <ScreenShotBox>
    {image ? (
      <Fragment>
        <ScreenShot src={image} />
        <HighlightMessage onClick={onClick} />
      </Fragment>
    ) : (
      <Spinner />
    )}
  </ScreenShotBox>
);

export const FeedbackLauncher = styled.div`
  position: fixed;
  height: 30px;
  bottom: 0;
  right: 5px;
  font-size: 13px;
  user-select: none;
  font-family: sans-serif;
  padding: 5px;
  cursor: pointer;
  background-color: #f3f3f2;
  border-radius: 2px 2px 0 0;
  border: 1px solid rgba(27, 31, 35, 0.2);
  color: rgba(0, 0, 0, 0.54);
`;
