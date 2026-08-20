import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Card.css';

// Swap these for your real asset filenames — paths follow the same
// '../ArtWork/…' convention Studio.jsx uses.
import logoCard from '../ArtWork/grandCanyon.jpg';
import cardHero from '../ArtWork/CardHero.png';
import dashboardShot from '../ArtWork/CardDashboardShot.png';
import budgetShot from '../ArtWork/CardBudgetShot.png';
import goalsShot from '../ArtWork/CardGoalsShot.png';
import cardMacro from '../ArtWork/CardMacro.png';
import cardPhone from '../ArtWork/CardPhone.png';

function Card() {
  const { t } = useTranslation();
  const [activeFeature, setActiveFeature] = useState('dashboard');

  const featureImages = {
    dashboard: dashboardShot,
    budget: budgetShot,
    goals: goalsShot,
  };

  const openLink = (url) => window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <div className="CardPage">
      {/* HERO */}
      <div className="Home-HeroCard">
        <div className="Home-HeroCard-Copy">
          <img
            src={logoCard}
            alt={t('card.hero.logoAlt')}
            className="Home-HeroCard-Logo"
          />
          <h1>{t('card.hero.title')}</h1>
          <p>{t('card.hero.description')}</p>

          <div className="Home-HeroCard-Actions">
            <button onClick={() => openLink('https://app.lancherix.com/register')}>
              {t('card.hero.ctaPrimary')}
            </button>
            <button
              className="ghost"
              onClick={() => openLink('https://app.lancherix.com/login')}
            >
              {t('card.hero.ctaSecondary')}
            </button>
          </div>
        </div>

        <div className="Home-HeroCard-Art">
          <img src={cardHero} alt={t('card.hero.cardAlt')} />
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="Home-StatsCard">
        <div className="Home-StatsCard-Item">
          <span className="stat-num">0%</span>
          <span className="stat-label">{t('card.stats.fx')}</span>
        </div>
        <div className="Home-StatsCard-Item">
          <span className="stat-num">&lt;1s</span>
          <span className="stat-label">{t('card.stats.sync')}</span>
        </div>
        <div className="Home-StatsCard-Item">
          <span className="stat-num">100%</span>
          <span className="stat-label">{t('card.stats.categorized')}</span>
        </div>
      </div>

      {/* SECONDARY */}
      <div className="Home-SecondaryCard">
        <h1>{t('card.secondary.title')}</h1>
        <p>{t('card.secondary.description')}</p>
      </div>

      {/* FEATURES */}
      <div className="Home-FeaturesCard">
        <img
          src={featureImages[activeFeature]}
          alt={t(`card.features.${activeFeature}`)}
        />

        <div className="Home-FeaturesOptionsCard">
          <button
            className={activeFeature === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveFeature('dashboard')}
          >
            {t('card.features.dashboard')}
          </button>

          <button
            className={activeFeature === 'budget' ? 'active' : ''}
            onClick={() => setActiveFeature('budget')}
          >
            {t('card.features.budget')}
          </button>

          <button
            className={activeFeature === 'goals' ? 'active' : ''}
            onClick={() => setActiveFeature('goals')}
          >
            {t('card.features.goals')}
          </button>
        </div>
      </div>

      {/* ASPECT */}
      <div className="Home-AspectCard">
        <img src={cardMacro} alt="" className="Home-AspectImg1Card" />
        <div className="Home-AspectCard2">
          <h1>{t('card.aspect.title')}</h1>
          <p>{t('card.aspect.description')}</p>
        </div>
        <img src={cardPhone} alt="" className="Home-AspectImg2Card" />
      </div>
    </div>
  );
}

export default Card;