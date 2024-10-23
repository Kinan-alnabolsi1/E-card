import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Templpate1 from "../components/Templpate1";
import Template2 from "../components/Template2";

const TemplatePreview = ({TemplateColor , Slide}) => {
console.log(TemplateColor,"eee")
  const iPhoneFrame = {
    width: "100%",
    maxWidth: "100%",
    height: "auto",
    border: "none",
    borderRadius: "40px",
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    margin: "auto",
    // justifyContent:"center",
    // alignItem:"center",
    // paddingLeft:"10px",
  };

  const iPhoneScreen = {
    width: "500px",
    height: "450px",
    maxHeight: "600px",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "thin",
    scrollbarColor: "transparent transparent",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    '-ms-overflow-style': 'none',
  };

  const iPhoneSpeaker = {
    height: "40px",
    backgroundColor: "black",
    position: "absolute",
    top: "-20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "120px",
    borderRadius: "10px",
    Zindex:1000,
  };

  const iPhoneCamera = {
    height: "10px",
    backgroundColor: "black",
    position: "absolute",
    top: "8px",
    right: "16px",
    width: "10px",
    borderRadius: "50%",
    Zindex:1000,
  };

  const iPhoneButton = {
    height: "0px",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: "4px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100px",
    borderRadius: "2px",
    Zindex:1000,
  };

  const iPhoneFrameStyle = {
    ...iPhoneFrame,
    // border: `10px solid black`,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"300px",
    background: TemplateColor,
    storedMainBoxColor:
        TemplateColor === "red"
        ? "black"
        : TemplateColor === "blue"
        ? "white"
        : TemplateColor === "green"
        ? "red"
        : "",
  };

  const iPhoneButtonStyle = {
    ...iPhoneButton,
  };
  return (
    <div className="relative ">
      <Box sx={iPhoneFrameStyle}>
        <div />
        <div />
        <div>
        <Box  sx={iPhoneScreen}>
          {(() => {
    switch (Slide) {
      case 1:
        return <Templpate1 color={TemplateColor} />;
        break;
        case 2:
        return <Template2 color={TemplateColor} />;
        break;
      default:
        return <div>asdasdasdsadasdas</div>;
    }
  })()}
        </Box>
        </div>
        <div style={iPhoneButtonStyle} />
      </Box>
    </div>
  );
};

export default TemplatePreview;