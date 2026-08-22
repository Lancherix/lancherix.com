import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Home.css";

import left from "../ArtWork/icons/arrowLeft.svg";
import right from "../ArtWork/icons/arrowRight.svg";
import logoStudio from "../ArtWork/LancherixStudioLogoWhiteWhite.png";

const slides = [
  { id: 1, color: "#0071e3" },
  { id: 2, color: "#34c759" },
  { id: 3, color: "#ff9f0a" },
  { id: 4, color: "#7c4dff" },
];

const REPEATS = 100;

const carouselSlides = Array.from(
  { length: REPEATS },
  () => slides
).flat();

const MIDDLE = Math.floor(REPEATS / 2) * slides.length;

const Home = () => {
  const { t } = useTranslation();

  const [activeSlide, setActiveSlide] = useState(MIDDLE);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSlide((current) => current + 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeSlide]);

  useEffect(() => {
    if (
      activeSlide < MIDDLE - 20 ||
      activeSlide > MIDDLE + 20
    ) {
      setTransitionEnabled(false);

      const normalizedSlide =
        ((activeSlide % slides.length) + slides.length) %
        slides.length;

      setActiveSlide(MIDDLE + normalizedSlide);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }
  }, [activeSlide]);

  const goToNext = () => {
    setTransitionEnabled(true);
    setActiveSlide((current) => current + 1);
  };

  const goToPrevious = () => {
    setTransitionEnabled(true);
    setActiveSlide((current) => current - 1);
  };

  const visibleSlide =
    ((activeSlide % slides.length) + slides.length) %
    slides.length;

  const goToSlide = (index) => {
    const current = visibleSlide;
    let difference = index - current;

    if (difference > slides.length / 2) {
      difference -= slides.length;
    }

    if (difference < -slides.length / 2) {
      difference += slides.length;
    }

    setTransitionEnabled(true);
    setActiveSlide((currentIndex) => currentIndex + difference);
  };

  return (
    <main className="home">
      <section className="hero">
        <div
          className="hero-track"
          style={{
            transform: `translateX(-${activeSlide * 100}%)`,
            transition: transitionEnabled
              ? "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
        >
          {carouselSlides.map((slide, index) => (
            <div
              className={`hero-slide ${
                slide.id === 1 ? "hero-slide-studio" : ""
              }`}
              key={`${slide.id}-${index}`}
              style={{
                backgroundColor: slide.color,
              }}
            >
              {slide.id === 1 && (
                <div className="Home-HeroStudio">
                  <img
                    src={logoStudio}
                    alt={t("studio.hero.logoAlt")}
                  />
                  <h1 className="Home-HeroStdioTitle">{t("studio.hero.title")}</h1>
                  <p>{t("studio.hero.description")}</p>
                  <div>
                    <button
                      onClick={() =>
                        window.open(
                          "https://studio.lancherix.com/register",
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      {t('card.studio.cta')}
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
                      {t("nav.login")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          className="hero-arrow hero-arrow-left"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <img src={left} alt="" />
        </button>

        <button
          className="hero-arrow hero-arrow-right"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <img src={right} alt="" />
        </button>

        <div className="hero-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-dot ${
                visibleSlide === index ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;