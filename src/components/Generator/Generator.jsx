import React, { useState } from "react";
import { Filter } from "../Filter/Filter";
import { Slider } from "../Slider/Slider";
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
    console.log(password);
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
          <Slider min={4} max={32} conf={conf} handleChange={handleChange} />
          <Filter
            symbolsSet={"uppercase"}
            conf={conf}
            handleChange={handleChange}
          />
          <Filter
            symbolsSet={"lowercase"}
            conf={conf}
            handleChange={handleChange}
          />
          <Filter
            symbolsSet={"numbers"}
            conf={conf}
            handleChange={handleChange}
          />
          <Filter
            symbolsSet={"symbols"}
            conf={conf}
            handleChange={handleChange}
          />
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
