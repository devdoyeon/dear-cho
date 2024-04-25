import React, { useEffect } from "react";
import unknownImg from "images/199161683aed3318f50948ff366279246db1d998.jpg";
import $ from "jquery";

const UnknownPage = ({ scrollY }) => {
  useEffect(() => {
    if (scrollY > $(".unknown-title").offset().top - (window.innerHeight - 200))
      $(".unknown-title").addClass("animate");
  }, [scrollY]);

  return (
    <div className="container">
      <h2 className="title unknown-title even">머만들지?</h2>
      <img src={unknownImg} alt="진짜머만들지" className="pageImg" />
    </div>
  );
};

export default UnknownPage;
