import React, { useState } from "react";
import classes from "./ContactUs.module.css";
import FooterPage from "./FooterPage";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_a4ot5zs",
        "template_h52ko8b",
        e.target,
        "88Zmw4SpYaPwawc08"
      )
      .then(
        (result) => {
          alert("The message has been sent successfully");
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          // show the user an error
        }
      );
  };

  return (
    <div className={classes.wholePage}>
      <div className={classes.mainContener}>
        <div className={classes.divForExplan}>
          <span className={classes.forTitle1}>
            {t("contactpage.talkabout")}
            <br />
            {t("contactpage.everything")}
          </span>
          <span className={classes.forTitle2}>
            {t("contactpage.text1")}
            <br />
            {t("contactpage.text2")}
            <br />
            {t("contactpage.text3")}
            <br />
            {t("contactpage.text4")}
          </span>
          <img className={classes.imageForContact} alt="conversation" />
        </div>
        <div className={classes.divForForm}>
          <div className={classes.titleForForm}>
            {t("contactpage.formtitle")}
          </div>
          <form
            id="contact"
            onSubmit={handleSubmit}
            className={classes.wholeForm}
          >
            <div className={classes.divForcontent}>
              <label>
                <span className={classes.forTitle3}>
                  {t("contactpage.name")}
                  <br />
                </span>
                <input
                  autoComplete="given-name"
                  required
                  pattern="[A-Za-z أ-ي]+"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className={classes.divForcontent}>
              <label>
                <span className={classes.forTitle3}>
                  {t("contactpage.email")}
                  <br />
                </span>
                <input
                  autoComplete="email"
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className={classes.divForcontent}>
              <label>
                <span className={classes.forTitle3}>
                  {t("contactpage.message")}
                  <br />
                </span>
                <textarea
                  required
                  name="message"
                  value={message}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className={classes.divForcontent}>
              <button type="submit">{t("contactpage.send")}</button>
            </div>
          </form>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default ContactUs;
