import React, { useState } from "react";
import "../BacktoTop/BacktoTop.css";
import { BsArrowUpShort } from "react-icons/bs";
import { useEffect } from "react";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return () => window.removeEventListener("scroll", listenToScroll);
  };

  const listenToScroll = () => {
    let heightToHidden = 250;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
  }, []);

  return (
    <div className="wrapper">
      {isVisible && (
        <div className="top-btn" onClick={goToBtn}>
          <div className="icon-container">
            {" "}
            <BsArrowUpShort className="icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GoToTop;
