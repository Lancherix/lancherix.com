import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Studio.css';
import logoStudio from '../ArtWork/LancherixStudioLogoWhiteWhite.png';
import tasks from '../ArtWork/Tasks.png';
import notes from '../ArtWork/Notes.png';
import board from '../ArtWork/Board.png';
import home from '../ArtWork/Home.png';
import aspect from '../ArtWork/Aspect.png';

function Studio() {
  const { t } = useTranslation();
  const [activeFeature, setActiveFeature] = useState('tasks');

  const featureImages = {
    tasks,
    notes,
    board,
  };

  return (
    <div className="Home-Studio">
      <div className='Home-HeroStudio'>
        <img src={logoStudio} alt={t('studio.hero.logoAlt')} />
        <h1>{t('studio.hero.title')}</h1>
        <p>{t('studio.hero.description')}</p>
        <div>
          <button
            onClick={() =>
              window.open(
                'https://studio.lancherix.com/register',
                '_blank',
                'noopener,noreferrer'
              )
            }
          >
            {t('nav.register')}
          </button>
          <button
            onClick={() =>
              window.open(
                'https://studio.lancherix.com/login',
                '_blank',
                'noopener,noreferrer'
              )
            }
          >
            {t('nav.login')}
          </button>
        </div>
      </div>

      <div className='Home-SecondaryStudio'>
        <h1>{t('studio.secondary.title')}</h1>
        <p>{t('studio.secondary.description')}</p>
      </div>

      <div className='Home-FeaturesStudio'>
        <img src={featureImages[activeFeature]} alt={t(`studio.features.${activeFeature}`)} />

        <div className='Home-FeaturesOptionsStudio'>
          <button
            className={activeFeature === 'tasks' ? 'active' : ''}
            onClick={() => setActiveFeature('tasks')}
          >
            {t('studio.features.tasks')}
          </button>

          <button
            className={activeFeature === 'notes' ? 'active' : ''}
            onClick={() => setActiveFeature('notes')}
          >
            {t('studio.features.notes')}
          </button>

          <button
            className={activeFeature === 'board' ? 'active' : ''}
            onClick={() => setActiveFeature('board')}
          >
            {t('studio.features.board')}
          </button>
        </div>
      </div>
      <div className='Home-AspectStudio'>
        <img src={home} alt="" className='Home-AspectImg1Studio' />
        <div className='Home-AspectStudio2'>
          <h1>{t('studio.aspect.title')}</h1>
          <p>{t('studio.aspect.description')}</p>
        </div>
        <img src={aspect} alt="" className='Home-AspectImg2Studio' />
      </div>
    </div>
  );
}

export default Studio;