import { generate } from "generate-password-browser";
import { Slider } from "../Slider/Slider";
import { Filter } from "../Filter/Filter";
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

  const passwordGenerate = () => {
    while (1) {
      const password = generate(conf);
      if (
        __validateGeneratedPassword(
          password,
          conf.uppercase,
          conf.lowercase,
          conf.numbers,
          conf.symbols
        )
      ) {
        setGeneratedPassword(password);
        break;
      }
    }
  };

  const __validateGeneratedPassword = (
    password,
    uppercaseBool,
    lowercaseBool,
    numbersBool,
    symbolsBool
  ) => {
    const regexParts = {
      uppercase: "(?=.*?[A-Z])",
      lowercase: "(?=.*?[a-z])",
      numbers: "(?=.*?[0-9])",
      symbols: "(?=.*?[#?!@$%^&*-])",
    };

    const symbolMustBe = {
      uppercase: uppercaseBool,
      lowercase: lowercaseBool,
      numbers: numbersBool,
      symbols: symbolsBool,
    };

    const regex = new RegExp(
      Object.keys(symbolMustBe)
        .map((k) => (symbolMustBe[k] ? regexParts[k] : false))
        .filter((el) => el !== false)
        .join("")
    );

    return regex.test(password);
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
            disabled={
              !(
                conf.uppercase ||
                conf.lowercase ||
                conf.numbers ||
                conf.symbols
              )
            }
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};
