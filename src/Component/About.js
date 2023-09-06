import classes from "./About.module.css";
import React from "react";
import FooterPage from "./FooterPage";
import { useTranslation } from "react-i18next";
const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={classes.container}>
        <p className={classes.heading}>{t("aboutpage.aboutus")}</p>
        <div className={classes.center}>
          <div className={classes.description}>
            {t("aboutpage.description")}{" "}
          </div>
        </div>
        <div className={classes.ourTeam}>
          <h1 className={classes.meet}>{t("aboutpage.meet")}</h1>
          <div className={classes.supervisor}>
            <img className={classes.supervisorImg} alt="Dr.Suhel" />
            <p className={classes.supervisorId}>
              {t("aboutpage.supervisorid")}
              <br />
              {t("aboutpage.supervisorjob")}
            </p>
          </div>
          <div className={classes.infoOurTeam}>
            <div className={classes.person}>
              <img className={classes.personImg1} alt="Salman" />
              <p className={classes.personId}>
                {t("aboutpage.personid1")}
                <br />
                {t("aboutpage.personjob1")}
              </p>
            </div>
            <div className={classes.person}>
              <img className={classes.personImg2} alt="Sedra" />
              <p className={classes.personId}>
                {t("aboutpage.personid2")}
                <br />
                {t("aboutpage.personjob2")}
              </p>
            </div>
            <div className={classes.person}>
              <img className={classes.personImg3} alt="Mohammed" />
              <p className={classes.personId}>
                {t("aboutpage.personid3")}
                <br />
                {t("aboutpage.personjob1")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default About;
