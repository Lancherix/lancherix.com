import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import "./Card.css";

import card from '../ArtWork/LancherixCard.png';

import airplaneIcon from '../ArtWork/icons/airplane.svg';
import foodIcon from '../ArtWork/icons/food.svg';
import transportIcon from '../ArtWork/icons/transport.svg';
import schoolIcon from '../ArtWork/icons/school.svg';
import leisureIcon from '../ArtWork/icons/entertainment.svg';
import shoppingIcon from '../ArtWork/icons/shopping.svg';
import savingsIcon from '../ArtWork/icons/savings.svg';
import laptopIcon from '../ArtWork/icons/laptop.svg';
import shieldIcon from '../ArtWork/icons/ticket.svg';

function formatMoney(n) {
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const ICONS = {
  food: foodIcon,
  transport: transportIcon,
  school: schoolIcon,
  leisure: leisureIcon,
  shopping: shoppingIcon,
  savings: savingsIcon,
  laptop: laptopIcon,
  airplane: airplaneIcon,
  shield: shieldIcon,
};

function Icon({ name, size = 16, color = "currentColor" }) {
  const src = ICONS[name];
  if (!src) return null;
  return (
    <span
      className="lcx-icon-img"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

/* ---------------- scroll / animation helpers ---------------- */

function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25, ...options }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, inView];
}

function useCountUp(value, inView, duration = 900) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return display;
}

function Reveal({ as: Tag = "div", className = "", children }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`lcx-reveal ${inView ? "lcx-in" : ""} ${className}`}>
      {children}
    </Tag>
  );
}

/* ---------------- flip card, used across every story ---------------- */

function FlipCard({ phrase, figureLabel, figureValue, accent, children, ariaLabel, hint }) {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);

  return (
    <div
      className={`lcx-flip ${flipped ? "lcx-flipped" : ""}`}
      style={{ "--lcx-flip-accent": accent }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={ariaLabel || t('card.flip.defaultAriaLabel')}
      onClick={toggle}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle())}
    >
      <div className="lcx-flip-inner">
        <div className="lcx-flip-face lcx-flip-front">
          <p className="lcx-flip-phrase">{phrase}</p>
          {figureLabel && (
            <div>
              <div className="lcx-num" style={{ fontSize: 20, color: accent }}>
                {figureValue}
              </div>
              <div className="lcx-flip-hint">{figureLabel}</div>
            </div>
          )}
          <div className="lcx-flip-hint">{t('card.flip.tapToLearnMore')}</div>
        </div>
        <div className="lcx-flip-face lcx-flip-back">
          {children}
          <div className="lcx-flip-hint">{t('card.flip.tapToFlipBack')}</div>
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   Hero
================================================================== */

function Hero() {
  const { t } = useTranslation();
  const [visualRef, visualIn] = useInView({ threshold: 0.4 });

  return (
    <div className="card-hero">
      <h1 className="lcx-hero-headline">{t('card.hero.headline')}</h1>

      <a className="lcx-cta-button" href="https://card.lancherix.com">
        {t('card.hero.cta')}
      </a>

      <div ref={visualRef} className={`lcx-hero-visual ${visualIn ? "lcx-in" : ""}`}>
        <div className="lcx-hero-card">
          <img src={card} alt={t('card.hero.imageAlt')} />
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   1 — Transactions
================================================================== */

const TRANSACTIONS = [
  { name: "Couche-Tard", catKey: "food", amount: -4.25, icon: "food", color: "#ff9500" },
  { name: "La Banquise", catKey: "food", amount: -18.5, icon: "food", color: "#ff9500" },
  { name: "Renaud-Bray", catKey: "shopping", amount: -18.99, icon: "shopping", color: "#34c759" },
  { name: "STM Monthly Pass", catKey: "transportRecurring", amount: -100, icon: "transport", color: "#0071e3" },
  { name: "Café Aunja", catKey: "food", amount: -5.25, icon: "food", color: "#ff9500" },
];

function TransactionsStory() {
  const { t } = useTranslation();
  const [visualRef, visualIn] = useInView();

  return (
    <div className="lcx-story">
      <div className="lcx-story-text">
        <Reveal>
          <h2 className="lcx-headline">{t('card.transactions.headline')}</h2>
          <p className="lcx-sub">{t('card.transactions.sub')}</p>
        </Reveal>
        <FlipCard
          phrase={t('card.transactions.flip.phrase')}
          figureLabel={t('card.transactions.flip.figureLabel')}
          figureValue="$142.24"
          accent="var(--lcx-blue)"
          ariaLabel={t('card.transactions.flip.ariaLabel')}
        >
          <p>{t('card.transactions.flip.back')}</p>
        </FlipCard>
      </div>

      <div ref={visualRef} className={`lcx-story-visual ${visualIn ? "lcx-in" : ""}`}>
        <div className="lcx-panel lcx-tx-list">
          <div className="leaf-fill">
            <div className="dw-txl-list">
              {TRANSACTIONS.map((tx, i) => (
                <div key={tx.name} className="dw-tx-row" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <span className="dw-tx-icon" style={{ background: tx.color + "22" }}>
                    <Icon name={tx.icon} size={16} color={tx.color} />
                  </span>
                  <span className="dw-tx-info">
                    <span className="dw-tx-name">{tx.name}</span>
                    <span className="dw-tx-sub">{t(`card.categories.${tx.catKey}`)}</span>
                  </span>
                  <span className="dw-tx-amount lcx-num">{formatMoney(tx.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   2 — Budget
================================================================== */

const CATEGORIES = [
  { key: "food", spent: 258.3, limit: 350, color: "#ff9500", icon: "food" },
  { key: "transport", spent: 100, limit: 100, color: "#0071e3", icon: "transport" },
  { key: "school", spent: 101.8, limit: 150, color: "#5856d6", icon: "school" },
  { key: "leisure", spent: 122, limit: 150, color: "#ff2d55", icon: "leisure" },
  { key: "shopping", spent: 78.6, limit: 100, color: "#34c759", icon: "shopping" },
  { key: "savings", spent: 200, limit: 200, color: "#ffcc00", icon: "savings" },
];

function BudgetRing({ spent, limit, inView }) {
  const { t } = useTranslation();
  const size = 120;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = limit > 0 ? Math.min(spent / limit, 1) : 0;
  const remaining = Math.max(limit - spent, 0);
  const displayRemaining = useCountUp(remaining, inView, 1100);

  return (
    <div className="bt-ring-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--cal-bg)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--cal-accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={inView ? circumference * (1 - pct) : circumference}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="bt-ring-center">
        <span className="bt-ring-value lcx-num">{formatMoney(displayRemaining)}</span>
        <span className="bt-ring-label">{t('card.budget.left')}</span>
      </div>
    </div>
  );
}

function BudgetStory() {
  const { t } = useTranslation();
  const [visualRef, visualIn] = useInView();
  const totalLimit = CATEGORIES.reduce((s, c) => s + c.limit, 0);
  const totalSpent = CATEGORIES.reduce((s, c) => s + c.spent, 0);

  return (
    <div className="lcx-story">
      <div className="lcx-story-text">
        <Reveal>
          <h2 className="lcx-headline">{t('card.budget.headline')}</h2>
          <p className="lcx-sub">{t('card.budget.sub')}</p>
        </Reveal>
        <FlipCard
          phrase={t('card.budget.flip.phrase')}
          figureLabel={t('card.budget.flip.figureLabel')}
          figureValue="5 / 6"
          accent="var(--lcx-orange)"
          ariaLabel={t('card.budget.flip.ariaLabel')}
        >
          <p>{t('card.budget.flip.back')}</p>
        </FlipCard>
      </div>

      <div ref={visualRef} className={`lcx-story-visual ${visualIn ? "lcx-in" : ""}`}>
        <div className="lcx-panel">
          <div className="bt-overview-body lcx-budget-row">
            <BudgetRing spent={totalSpent} limit={totalLimit} inView={visualIn} />
            <div className="bt-overview-stats">
              <div>
                <div className="bt-overview-stat-label">{t('card.budget.spent')}</div>
                <div className="bt-overview-stat-value lcx-num">{formatMoney(totalSpent)}</div>
              </div>
              <div>
                <div className="bt-overview-stat-label">{t('card.budget.budgetLabel')}</div>
                <div className="bt-overview-stat-value lcx-num">{formatMoney(totalLimit)}</div>
              </div>
            </div>
          </div>

          <div className="lcx-cat-list">
            {CATEGORIES.map((cat) => {
              const pct = Math.min((cat.spent / cat.limit) * 100, 100);
              return (
                <div className="bt-cat-row" key={cat.key}>
                  <span className="bt-cat-icon" style={{ background: cat.color + "22" }}>
                    <Icon name={cat.icon} size={16} color={cat.color} />
                  </span>
                  <span className="bt-cat-info">
                    <span className="bt-cat-top">
                      <span className="bt-cat-name">{t(`card.categories.${cat.key}`)}</span>
                      <span className="bt-cat-amounts lcx-num">
                        {formatMoney(cat.spent)} / {formatMoney(cat.limit)}
                      </span>
                    </span>
                    <span className="bt-cat-bar-track">
                      <span
                        className="bt-cat-bar-fill"
                        style={{ background: cat.color, width: visualIn ? `${pct}%` : "0%" }}
                      />
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   3 — Reports
================================================================== */

const BREAKDOWN = [
  { key: "food", amount: 258.3, pct: 27, color: "#ff9500" },
  { key: "savings", amount: 200, pct: 21, color: "#ffcc00" },
  { key: "leisure", amount: 122, pct: 13, color: "#ff2d55" },
  { key: "school", amount: 101.8, pct: 11, color: "#5856d6" },
  { key: "transport", amount: 100, pct: 11, color: "#0071e3" },
];

function ReportsStory() {
  const { t } = useTranslation();
  const [visualRef, visualIn] = useInView();
  const income = 1250;
  const expenses = 950.69;
  const maxVal = Math.max(income, expenses);

  return (
    <div className="lcx-story">
      <div className="lcx-story-text">
        <Reveal>
          <h2 className="lcx-headline">{t('card.reports.headline')}</h2>
          <p className="lcx-sub">{t('card.reports.sub')}</p>
        </Reveal>
        <FlipCard
          phrase={t('card.reports.flip.phrase')}
          figureLabel={t('card.reports.flip.figureLabel')}
          figureValue={`27% ${t('card.categories.food')}`}
          accent="var(--lcx-green)"
          ariaLabel={t('card.reports.flip.ariaLabel')}
        >
          <p>{t('card.reports.flip.back')}</p>
        </FlipCard>
      </div>

      <div ref={visualRef} className={`lcx-story-visual ${visualIn ? "lcx-in" : ""}`}>
        <div className="lcx-panel">
          <div className="dw-report-body">
            <div className="dw-report-trend">
              <div className="dw-report-trend-col">
                <div className="dw-report-trend-bars">
                  <span
                    className="dw-report-bar dw-report-bar-income"
                    style={{ height: visualIn ? `${(income / maxVal) * 100}%` : "0%" }}
                  />
                  <span
                    className="dw-report-bar dw-report-bar-expense"
                    style={{ height: visualIn ? `${(expenses / maxVal) * 100}%` : "0%" }}
                  />
                </div>
                <span className="dw-report-trend-label">{t('card.reports.month')}</span>
              </div>
            </div>

            <div className="dw-report-cats">
              {BREAKDOWN.map((b) => (
                <div className="dw-report-cat-row" key={b.key}>
                  <span className="dw-report-cat-dot" style={{ background: b.color }} />
                  <span className="dw-report-cat-name">{t(`card.categories.${b.key}`)}</span>
                  <span className="dw-report-cat-bar-track">
                    <span
                      className="dw-report-cat-bar-fill"
                      style={{ background: b.color, width: visualIn ? `${b.pct * 3}%` : "0%" }}
                    />
                  </span>
                  <span className="dw-report-cat-amount lcx-num">{formatMoney(b.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   4 — Goals
================================================================== */

const GOALS = [
  { key: "macbook", saved: 400, target: 1500, icon: "laptop", color: "#0071e3" },
  { key: "tripHome", saved: 520, target: 800, icon: "airplane", color: "#34c759" },
  { key: "emergencyFund", saved: 800, target: 1000, icon: "shield", color: "#ff2d55" },
];

function GoalRing({ pct, color, icon, inView }) {
  const size = 56;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="dw-goal-ring-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--cal-bg)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={inView ? circumference * (1 - pct) : circumference}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="dw-goal-ring-center">
        <Icon name={icon} size={20} color={color} />
      </div>
    </div>
  );
}

function GoalsStory() {
  const { t } = useTranslation();
  const [visualRef, visualIn] = useInView();

  return (
    <div className="lcx-story">
      <div className="lcx-story-text">
        <Reveal>
          <h2 className="lcx-headline">{t('card.goals.headline')}</h2>
          <p className="lcx-sub">{t('card.goals.sub')}</p>
        </Reveal>
        <FlipCard
          phrase={t('card.goals.flip.phrase')}
          figureLabel={t('card.goals.flip.figureLabel')}
          figureValue="$520 / $800"
          accent="var(--lcx-pink)"
          ariaLabel={t('card.goals.flip.ariaLabel')}
        >
          <p>{t('card.goals.flip.back')}</p>
        </FlipCard>
      </div>

      <div ref={visualRef} className={`lcx-story-visual ${visualIn ? "lcx-in" : ""}`}>
        <div className="dw-goals-row lcx-goal-grid">
          {GOALS.map((g) => {
            const pct = Math.min(g.saved / g.target, 1);
            return (
              <div className="lcx-panel dw-goal-card" key={g.key}>
                <GoalRing pct={pct} color={g.color} icon={g.icon} inView={visualIn} />
                <span className="dw-goal-card-name">{t(`card.goalNames.${g.key}`)}</span>
                <span className="dw-goal-card-amounts lcx-num">
                  {formatMoney(g.saved)} / {formatMoney(g.target)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   FAQ
================================================================== */

const FAQ_KEYS = ["whatIsCard", "whoIsFor", "recurring", "categoryBudgets", "goals", "currencies"];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`lcx-faq-item ${open ? "lcx-open" : ""}`}>
      <button className="lcx-faq-q" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {q}
        <span className="lcx-faq-chevron-wrap">
          <svg className="lcx-faq-chevron" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className="lcx-faq-a">
        <p>{a}</p>
      </div>
    </div>
  );
}

function Faq() {
  const { t } = useTranslation();
  return (
    <div className="card-qa">
      <div className="lcx-qa-inner">
        <h2 className="lcx-qa-title">{t('card.faq.title')}</h2>
        {FAQ_KEYS.map((key) => (
          <FaqItem
            key={key}
            q={t(`card.faq.items.${key}.q`)}
            a={t(`card.faq.items.${key}.a`)}
          />
        ))}
      </div>
    </div>
  );
}

/* ==================================================================
   Studio transition + closing CTA
   (no footer here — the global <Foot /> in App.js covers it)
================================================================== */

function StudioAndCta() {
  const { t } = useTranslation();
  return (
    <div className="card-more">
      <div className="lcx-studio">
        <Reveal>
          <h2 className="lcx-studio-headline">{t('card.studio.headline')}</h2>
          <a className="lcx-cta-buttonB" href="https://www.lancherix.com/studio">
            {t('card.studio.cta')}
          </a>
        </Reveal>
      </div>
    </div>
  );
}

/* ==================================================================
   Root
================================================================== */

const Card = () => {
  return (
    <div className="card">
      <Hero />

      <div className="card-features">
        <div className="lcx-section lcx-section--tx">
          <div className="lcx-section-inner">
            <TransactionsStory />
          </div>
        </div>
        <div className="lcx-section lcx-section--budget">
          <div className="lcx-section-inner">
            <BudgetStory />
          </div>
        </div>
        <div className="lcx-section lcx-section--reports">
          <div className="lcx-section-inner">
            <ReportsStory />
          </div>
        </div>
        <div className="lcx-section lcx-section--goals">
          <div className="lcx-section-inner">
            <GoalsStory />
          </div>
        </div>
      </div>

      <Faq />

      <StudioAndCta />
    </div>
  );
};

export default Card;