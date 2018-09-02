import React from "react";

export const Drag = () => (
  <svg
    data-highlight-ignore
    style={{
      width: "24px",
      height: "38px",
      cursor: "move",
      verticalAlign: "top",
      marginRight: "10px"
    }}
    viewBox="0 0 24 24"
  >
    <path
      fill="#000000"
      d="M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z"
    />
  </svg>
);

export const Select = ({ onClick }) => (
  <svg
    data-highlight-ignore
    style={{
      width: "24px",
      height: "40px",
      cursor: "pointer",
      verticalAlign: "top",
      marginLeft: "4px"
    }}
    viewBox="0 0 24 24"
    onClick={onClick}
  >
    <path
      fill="#000000"
      d="M14,17H17V14H19V17H22V19H19V22H17V19H14V17M12,17V19H9V17H12M7,17V19H3V15H5V17H7M3,13V10H5V13H3M3,8V4H7V6H5V8H3M9,4H12V6H9V4M15,4H19V8H17V6H15V4M19,10V12H17V10H19Z"
    />
  </svg>
);

export const Hide = ({ onClick }) => (
  <svg
    data-highlight-ignore
    style={{
      width: "24px",
      height: "40px",
      cursor: "pointer",
      verticalAlign: "top",
      marginLeft: "18px"
    }}
    viewBox="0 0 24 24"
    onClick={onClick}
  >
    <path
      fill="#000000"
      d="M5,3H7V5H9V3H11V5H13V3H15V5H17V3H19V5H21V7H19V9H21V11H19V13H21V15H19V17H21V19H19V21H17V19H15V21H13V19H11V21H9V19H7V21H5V19H3V17H5V15H3V13H5V11H3V9H5V7H3V5H5V3Z"
    />
  </svg>
);

export const CheckBox = ({ active, onClick }) =>
  active ? (
    <svg
      style={{ width: "24px", height: "24px", cursor: "pointer" }}
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path
        fill="#1E88E5"
        d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
      />
    </svg>
  ) : (
    <svg
      style={{ width: "24px", height: "24px", cursor: "pointer" }}
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path
        fill="#000000"
        d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"
      />
    </svg>
  );

CheckBox.defaultProps = {
  active: false
};
