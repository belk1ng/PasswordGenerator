import React from "react";

export const Filter = ({ symbolsSet, conf, handleChange }) => {
  return (
    <div className="password-generator__filter">
      <span>Include {symbolsSet}</span>
      <label className="switch">
        <input
          type="checkbox"
          name={symbolsSet}
          type="checkbox"
          className="password-generator-checkbox"
          checked={conf.symbolsSet}
          onChange={(event) => handleChange(event)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};
