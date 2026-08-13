import React from 'react';
import './Foot.css';
import { useTranslation } from 'react-i18next';

import lancherixArt from '../ArtWork/navBar.svg';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'ru', label: 'Русский' },
  { code: 'zh', label: '中文' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ar', label: 'العربية' },
];

function Foot() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="Foot">
      <div className='Foot-component1'>
        <img src={lancherixArt} alt="Lancherix" className='Foot-mainLogo' />
        <p>{t('footer.country')}</p>
      </div>

      {/*<div className='Foot-component2'>
        <div className='Foot-subComponent'>
          <b>Home</b>
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
        <div className='Foot-subComponent'>
          <b>Store</b>
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
        <div className='Foot-subComponent'>
          <b>Physics</b>
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
        <div className='Foot-subComponent'>
          <b>Music</b>
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
        <div className='Foot-subComponent'>
          <b>Sports</b>
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
      </div>*/}

      <div className='Foot-component3'>
        <div>{t('footer.copyright')}</div>

        <div className='Foot-terms'>
          <select
            className='Foot-langSelect'
            value={i18n.language}
            onChange={changeLanguage}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
          <p>{t('footer.credits')}</p>
        </div>
      </div>
    </div>
  );
}

export default Foot;