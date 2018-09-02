import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 80px 0 0 170px;
  position: absolute;
  border-top: 3px solid rgba(30, 136, 229, 0.8);
  border-right: 3px solid rgba(30, 136, 229, 0.8);
  border-bottom: 3px solid rgba(30, 136, 229, 0.8);
  border-left: 3px solid transparent;
  color: rgba(255, 255, 255, 0.2);
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  animation: ${rotate360} 1.1s infinite linear;
  border-radius: 50%;
  width: 13px;
  height: 13px;

  &:after {
    border-radius: 50%;
    width: 13px;
    height: 13px;
  }
`;

export default Spinner;
