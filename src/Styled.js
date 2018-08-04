import styled from "styled-components";

export const BugFrontLauncher = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20px;
  height: 50px;
  width: 194px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 5px 10px;

  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 24px 38px 3px,
    rgba(0, 0, 0, 0.12) 0px 9px 46px 8px, rgba(0, 0, 0, 0.2) 0px 11px 15px -7px;

  > div {
    display: inline-block;
    vertical-align: top;
  }
`;

export const Done = styled.div.attrs({
  children: "DONE"
})`
  height: 40px;
  color: rgb(66, 133, 244);
  margin-left: 12px;
  font-size: 14px;
  cursor: pointer;
  box-sizing: border-box;
  padding: 13px 8px 0 8px;
`;

export const Canvas = styled.canvas`
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 0;
`;
