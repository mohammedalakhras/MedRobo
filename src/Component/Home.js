import React, { useState } from "react";
import EX1 from "../Assets/BrainTumor/1.webp";
import EX2 from "../Assets/BrainTumor/2.webp";
import EX3 from "../Assets/BrainTumor/3.webp";
import EX4 from "../Assets/BrainTumor/4.webp";
import EX5 from "../Assets/BrainTumor/5.webp";
import EX6 from "../Assets/BrainTumor/6.webp";
import EX11 from "../Assets/ChestXray/1.webp";
import EX22 from "../Assets/ChestXray/2.webp";
import EX33 from "../Assets/ChestXray/3.webp";
import EX44 from "../Assets/ChestXray/4.webp";
import EX55 from "../Assets/ChestXray/5.webp";
import EX66 from "../Assets/ChestXray/6.webp";
import classes from "./Home.module.css";
import { useTranslation } from "react-i18next";
import FooterPage from "./FooterPage";
const Home = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setImage(selectedImage);
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const selectedImage = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(selectedImage);
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleClearImage = () => {
    setImage(null);
    setImageUrl(null);
    document.getElementById("output").innerHTML = "";
  };
  const handleSubmitImage = async (reader) => {
    if (selectedOption === "") {
      document.getElementById("output").innerHTML = t(
        "homepage.output.idDisease"
      );
    } else if (image == null) {
      document.getElementById("output").innerHTML = t("homepage.output.upload");
    } else {
      document.getElementById("output").innerHTML = t("homepage.output.Wait");
      const check = await fetch(
        "https://salmanaboaraj-binary.hf.space/run/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [imageUrl],
          }),
        }
      );
      const jsonc = await check.json();
      const labelc = jsonc["data"][0]["confidences"][0]["label"];
      if (labelc === "Brain" && selectedOption === "Brain Tumor") {
        const response = await fetch(
          "https://mohammedalakhras-braintumor.hf.space/run/predict",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              data: [imageUrl],
            }),
          }
        );
        const json = await response.json();
        const label = json["data"][0]["confidences"][0]["label"];
        document.getElementById("output").innerHTML = `<p>${label}</p>`;
      } else if (labelc === "Chest" && selectedOption === "Chest X-ray") {
        const response = await fetch(
          "https://mohammedalakhras-chestx-ray.hf.space/run/predict",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              data: [imageUrl],
            }),
          }
        );
        const json = await response.json();
        const label = json["data"][0]["confidences"][0]["label"];
        document.getElementById("output").innerHTML = `<p>${label}</p>`;
      } else if (
        (labelc === "Brain" && selectedOption === "Chest X-ray") ||
        (labelc === "Chest" && selectedOption === "Brain Tumor")
      ) {
        document.getElementById("output").innerHTML = t(
          "homepage.output.note1"
        );
      } else {
        document.getElementById("output").innerHTML = t(
          "homepage.output.note2"
        );
      }
    }
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={classes.wholePage}>
      <div className={classes.mainContener}>
        <div className={classes.divForUpload}>
          {imageUrl && (
            <div
              className={classes.divDisplayImage}
              style={{
                background: `url(${imageUrl}) no-repeat`,
                backgroundPosition: "center",
                backgroundSize: "80% 80%",
              }}
            ></div>
          )}
          {!imageUrl && (
            <>
              <label htmlFor="fileUpload">
                <div
                  className={classes.divForImage}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={handleDrop}
                >
                  <div className={classes.divForHeader}>
                    <img className={classes.forImageHeaderDiv1} alt="input" />
                    <span className={classes.forTextHeaderDiv}>Img</span>
                  </div>
                  <div className={classes.forTextInputImage}>
                    {t("homepage.drop")}
                    <br />
                    {t("homepage.or")}
                    <br />
                    {t("homepage.upload")}
                  </div>
                </div>
              </label>
              <form id="upload">
                <input
                  id="fileUpload"
                  type="file"
                  onChange={handleImageChange}
                />
              </form>
            </>
          )}
          <div className={classes.button}>
            <button onClick={handleClearImage} className={classes.buttonClear}>
              {t("homepage.clear")}
            </button>
            <button
              className={classes.buttonSubmit}
              onClick={handleSubmitImage}
            >
              {t("homepage.submit")}
            </button>
          </div>
        </div>
        <div className={classes.wholeExample}>
          <div className={classes.divForSelect}>
            <select
              id="selset"
              value={selectedOption}
              onChange={handleSelectChange}
              className={classes.Select}
            >
              <option value="">{t("homepage.select")}</option>
              <option value="Brain Tumor">{t("homepage.op1")}</option>
              <option value="Chest X-ray">{t("homepage.op2")}</option>
            </select>
          </div>
          <div className={classes.divForExaple}>
            <div className={classes.divForHeader}>
              <img className={classes.forImageHeaderDiv2} alt="example" />
              <span className={classes.forTextHeaderDiv}>Example</span>
            </div>
            {selectedOption === "" && (
              <div className={classes.divforTextExample}>
                {t("homepage.ex1")}
                <br /> {t("homepage.ex2")}
              </div>
            )}
            {selectedOption === "Brain Tumor" && (
              <div className={classes.divforImageExample}>
                <img src={EX1} alt="Brain Tumor" />
                <img src={EX2} alt="Brain Tumor" />
                <img src={EX3} alt="Brain Tumor" />
                <img src={EX4} alt="Brain Tumor" />
                <img src={EX5} alt="Brain Tumor" />
                <img src={EX6} alt="Brain Tumor" />
              </div>
            )}
            {selectedOption === "Chest X-ray" && (
              <div className={classes.divforImageExample}>
                <img src={EX11} alt="Chest X-ray" />
                <img src={EX22} alt="Chest X-ray" />
                <img src={EX33} alt="Chest X-ray" />
                <img src={EX44} alt="Chest X-ray" />
                <img src={EX55} alt="Chest X-ray" />
                <img src={EX66} alt="Chest X-ray" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={classes.divForOutput}>
        <div className={classes.divForHeader}>
          <img className={classes.forImageHeaderDiv3} alt="output" />
          <span className={classes.forTextHeaderDiv}>Output</span>
        </div>
        <div id="output" className={classes.divForResult}></div>
      </div>
      <FooterPage />
    </div>
  );
};

export default Home;
