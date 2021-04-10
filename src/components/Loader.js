import React from "react";
import logoWhite from "../assets/img/logowhite.png";
import "../assets/css/Styles.css";

function Loader(props) {
  return (
    <div>
      <section
        id="loader"
        className={`d-${props.display} align-items-center justify-content-center`}
      >
        <div className="container w-100 d-inline-flex justify-content-center">
          <img src={logoWhite} alt="Logo" />
        </div>
      </section>
    </div>
  );
}

export default Loader;
