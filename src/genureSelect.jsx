import React from "react";
import "./genureSelect.css";

const GenureSelect = ({ type, onClick }) => {
  return (
    <div className="genre-box" onClick={onClick}>
      <h1 style={{ textAlign: "center", justifyContent: "center", alignContent: "center", alignItems: "center" }}>{type} Genre</h1>
    </div>
  );
};

export default GenureSelect;
