import React, { useState } from "react";
import "../styles.scss";

export const Generator = () => {
  const initialConf = {
    length: 4,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  };

  const [conf, setConf] = useState(initialConf);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleChange = (event) => {
    const target = event.target;

    target.type === "checkbox"
      ? setConf((prev) => ({ ...prev, [target.name]: !prev[target.name] }))
      : setConf({ ...conf, [target.name]: target.value });
  };

  const passwordGenerate = (len) => {
    const selection = {
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "1234567890",
      symbols: "!@#$%^&*()|?_",
    };

    const passwordSymbols = Object.keys(selection)
      .map((part) => conf[part] && selection[part])
      .filter((elem) => elem !== false)
      .join("");

    let password = "";
    for (let elem = 0; elem < len; elem++) {
      password += passwordSymbols.charAt(
        Math.floor(Math.random() * passwordSymbols.length)
      );
    }

    setGeneratedPassword(password);
  };

  return (
    <div className="password-generator">
      <h1 className="password-generator__title">Password generator</h1>
      <div className="password-generator-container">
        <div className="password-generator__result-value">
          {generatedPassword}
        </div>
        <div className="password-generator__filters">
          <p className="password-length__value">
            Password length: <span>{conf.length}</span>
          </p>
          <div className="password-generator__filter filter__range">
            <span>4</span>
            <input
              name="length"
              type="range"
              min={4}
              max={32}
              className="password-length"
              value={conf.length}
              onChange={(event) => handleChange(event)}
            />
            <span>32</span>
          </div>
          <div className="password-generator__filter">
            <span>Include uppercase</span>
            <label class="switch">
              <input
                type="checkbox"
                name="uppercase"
                type="checkbox"
                className="password-generator-checkbox"
                checked={conf.uppercase}
                onChange={(event) => handleChange(event)}
              />
              <span class="slider"></span>
            </label>
          </div>
          <div className="password-generator__filter">
            <span>Include lowercase</span>
            <label class="switch">
              <input
                type="checkbox"
                name="lowercase"
                type="checkbox"
                className="password-generator-checkbox"
                checked={conf.lowercase}
                onChange={(event) => handleChange(event)}
              />
              <span class="slider"></span>
            </label>
          </div>
          <div className="password-generator__filter">
            <span>Include numbers</span>
            <label class="switch">
              <input
                type="checkbox"
                name="numbers"
                type="checkbox"
                className="password-generator-checkbox"
                checked={conf.numbers}
                onChange={(event) => handleChange(event)}
              />
              <span class="slider"></span>
            </label>
          </div>
          <div className="password-generator__filter">
            <span>Include symbols</span>
            <label class="switch">
              <input
                type="checkbox"
                name="symbols"
                type="checkbox"
                className="password-generator-checkbox"
                checked={conf.symbols}
                onChange={(event) => handleChange(event)}
              />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <div className="password-generator__actions">
          <button
            className="password-generator__action generate"
            onClick={() => passwordGenerate(conf.length)}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};
