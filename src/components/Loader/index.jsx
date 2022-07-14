import React from "react";
import LoaderStyles from "./Loader.module.css";
import Logo from "../../assets/images/logo.png";

export const Loader = () => {
  return (
    <div className={LoaderStyles.page}>
      <div className="">
        <div className={LoaderStyles.spinner__container}>
          <img src={Logo} alt="loader_image" />
        </div>
        <h5 className={LoaderStyles.loader__text}>
          Preparing to launch, Please wait...
        </h5>
      </div>
    </div>
  );
};
