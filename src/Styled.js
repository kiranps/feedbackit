import styled from "styled-components";

export const BugFrontLauncher = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  height: 50px;
  width: 260px;
  margin: 0 auto;
  background-color: red;
  box-sizing: border-box;
  padding: 5px;

  > div {
    display: inline-block;
  }
`;

export const Select = styled.div`
  height: 40px;
  width: 40px;
  background-color: yellow;
  cursor: pointer;
  margin-left: 20px;
`;

export const Hide = styled.div`
  height: 40px;
  width: 40px;
  background-color: green;
  cursor: pointer;
  margin-left: 20px;
`;

export const Done = styled.div`
  height: 40px;
  width: 40px;
  background-color: blue;
  cursor: pointer;
  margin-left: 20px;
`;
