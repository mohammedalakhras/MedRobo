import React, { useState } from "react";
import classes from "./Navbar.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [b, setB] = useState(i18n.resolvedLanguage);
  const [theme, setTheme] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  theme
    ? (document.documentElement.className = "dark")
    : (document.documentElement.className = "");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleChangeLanguage = (language) => {
    if (b === "en") {
      setB("ar");
    } else {
      setB("en");
    }
    i18n.changeLanguage(language);
  };
  const toggleTheme = () => {
    setTheme(!theme);
    theme
      ? (document.documentElement.className = "dark")
      : (document.documentElement.className = "");
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarLogo}>
        <img className={classes.logoImg} alt="MEDRobo" />
      </div>
      <div
        className={`${
          showMenu ? classes.navbarMenuactive : classes.navbarMenu
        }`}
      >
        <ul>
          <li>
            <Link className={classes.link} to="../home">
              <img className={classes.menuitem1} alt="home" />
              {t("navbar.home")}
            </Link>
          </li>
          <li>
            <Link className={classes.link} to="../about">
              <img className={classes.menuitem2} alt="about" />
              {t("navbar.about")}
            </Link>
          </li>
          <li>
            <Link className={classes.link} to="../contact">
              <img className={classes.menuitem3} alt="contact" />
              {t("navbar.contact")}
            </Link>
          </li>
          <li>
            <button onClick={toggleTheme} className={classes.buttonMode}>
              <div className={classes.style}>
                <img className={classes.modeicon} alt="style" />
                <img className={classes.modeitem} alt="style" />
                <span className={classes.menuitemtext}>
                  {t("navbar.style")}
                </span>
              </div>
            </button>
          </li>
          <li>
            <img className={classes.menuitem4} alt="language" />
            {b === "en" && (
              <button
                onClick={() => handleChangeLanguage("ar")}
                className={classes.buttonLanguage}
              >
                Ar
              </button>
            )}
            {!(b === "en") && (
              <button
                onClick={() => handleChangeLanguage("en")}
                className={classes.buttonLanguage}
              >
                En
              </button>
            )}
          </li>
        </ul>
      </div>
      {!showMenu && (
        <div className={classes.navbarToggle} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      {showMenu && (
        <div className={classes.navbarToggleActive} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
