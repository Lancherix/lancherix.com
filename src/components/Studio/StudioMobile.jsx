import { useState } from "react";
import { useTranslation } from 'react-i18next';
import "./StudioMobile.css";

import logoStudio from "../ArtWork/LancherixStudioLogoWhiteWhite.png";
import tasks from "../ArtWork/Tasks.png";
import notes from "../ArtWork/Notes.png";
import board from "../ArtWork/Board.png";
import home from "../ArtWork/Home.png";
import aspect from "../ArtWork/Aspect.png";

function StudioMobile() {
  const { t } = useTranslation();
  const [activeFeature, setActiveFeature] = useState("tasks");

  const featureImages = {
    tasks,
    notes,
    board
  };

  return (
    <div className="HomeMobile">

      {/* HERO */}
      <section className="HomeMobile-Hero">
        <img src={logoStudio} alt={t('studio.hero.logoAltMobile')} />
        <h1>{t('studio.hero.title')}</h1>
        <p>{t('studio.hero.description')}</p>

        <div className="HomeMobile-HeroButtons">
          <button
            onClick={() =>
              window.open(
                "https://studio.lancherix.com/register",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            {t('nav.register')}
          </button>

          <button
            onClick={() =>
              window.open(
                "https://studio.lancherix.com/login",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            {t('nav.login')}
          </button>
        </div>
      </section>

      {/* SECONDARY */}
      <section className="HomeMobile-Secondary">
        <h2>{t('studio.secondary.title')}</h2>
        <p>{t('studio.secondaryMobile.description')}</p>
      </section>

      {/* FEATURES */}
      <section className="HomeMobile-Features">
        <div className="HomeMobile-FeatureButtons">
          <button
            className={activeFeature === "tasks" ? "active" : ""}
            onClick={() => setActiveFeature("tasks")}
          >
            {t('studio.features.tasks')}
          </button>

          <button
            className={activeFeature === "notes" ? "active" : ""}
            onClick={() => setActiveFeature("notes")}
          >
            {t('studio.features.notes')}
          </button>

          <button
            className={activeFeature === "board" ? "active" : ""}
            onClick={() => setActiveFeature("board")}
          >
            {t('studio.features.board')}
          </button>
        </div>

        <img
          src={featureImages[activeFeature]}
          alt={t(`studio.features.${activeFeature}`)}
        />
      </section>

      {/* ASPECT */}
      <section className="HomeMobile-Aspect">
        <img src={home} alt="" />
        <h2>{t('studio.aspectMobile.title')}</h2>
        <p>{t('studio.aspectMobile.description')}</p>
        <img src={aspect} alt="" />
      </section>

    </div>
  );
}

export default StudioMobile;