import React from "react";
import classes from "./FooterPage.module.css";
import { useTranslation } from "react-i18next";
const FooterPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <footer>
        <p className={classes.footer}>&copy;{t("footer")}</p>
      </footer>
    </div>
  );
};

export default FooterPage;
