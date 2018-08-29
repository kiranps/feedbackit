import React from "react";

const Close = ({ top, left, onClick }) => (
  <svg
    style={{
      zIndex: "999999999999999",
      width: "24px",
      height: "24px",
      position: "absolute",
      cursor: "pointer",
      top: top + "px",
      left: left + "px"
    }}
    data-highlight-ignore
    viewBox="0 0 24 24"
    onClick={onClick}
  >
    <path
      fill="#616161"
      d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
    />
  </svg>
);

Close.defaultProps = {
  top: 0,
  left: 0
};

export default Close;
