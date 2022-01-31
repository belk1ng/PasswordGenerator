import React from "react";

export const Slider = ({ min, max, conf, handleChange }) => {
  return (
    <>
      <p className="password-length__value">
        Password length: <span>{conf.length}</span>
      </p>
      <div className="password-generator__filter filter__range">
        <span>{min}</span>
        <input
          name="length"
          type="range"
          min={min}
          max={max}
          className="password-length"
          value={conf.length}
          onChange={(event) => handleChange(event)}
        />
        <span>{max}</span>
      </div>
    </>
  );
};
