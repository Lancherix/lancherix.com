import React, { useEffect, useRef, useState } from "react";
import "./Card.css";

/* ==================================================================
   NOTE FOR WHOEVER WIRES THIS IN
   - Swap <Icon> below for the real `import Icon from "./Icon"` once
     you share Icon.jsx / the SVG set — this local version only covers
     the categories used on this page as a stand-in.
   - Swap the hero's SVG wave for `import cardImage from "./assets/card.png"`
     and drop an <img src={cardImage} /> in .lcx-hero-card once you
     share the PNG.
================================================================== */

function formatMoney(n) {
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function Icon({ name, size = 16, color = "currentColor" }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "food":
      return <svg {...common}><path d="M7 3v7a2 2 0 0 0 4 0V3M9 10v11M17 3c-1.5 1-2 3-2 5s.5 4 2 5v8" /></svg>;
    case "transport":
      return <svg {...common}><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="7.5" cy="18" r="1.5" /><circle cx="16.5" cy="18" r="1.5" /></svg>;
    case "school":
      return <svg {...common}><path d="M2 9l10-5 10 5-10 5-10-5Z" /><path d="M6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" /></svg>;
    case "leisure":
      return <svg {...common}><rect x="2" y="8" width="20" height="10" rx="4" /><circle cx="8" cy="13" r="1.4" /><circle cx="16" cy="13" r="1.4" /></svg>;
    case "shopping":
      return <svg {...common}><path d="M6 8V6a4 4 0 0 1 8 0v2" /><rect x="3" y="8" width="14" height="12" rx="2" transform="translate(1)" /></svg>;
    case "savings":
      return <svg {...common}><circle cx="12" cy="13" r="7" /><path d="M12 6V3M9 3h6" /></svg>;
    case "laptop":
      return <svg {...common}><rect x="4" y="4" width="16" height="10" rx="1.5" /><path d="M2 18h20" /></svg>;
    case "airplane":
      return <svg {...common}><path d="M2 16l20-8-8 20-2-8-8-2Z" /></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" /></svg>;
    default:
      return <svg {...common}><circle cx="12" cy="12" r="8" /></svg>;
  }
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

function FlipCard({ phrase, figureLabel, figureValue, accent, children, ariaLabel }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);

  return (
    <div
      className={`lcx-flip ${flipped ? "lcx-flipped" : ""}`}
      style={{ "--lcx-flip-accent": accent }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={ariaLabel || "Flip card"}
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
          <div className="lcx-flip-hint">Tap to learn more</div>
        </div>
        <div className="lcx-flip-face lcx-flip-back">
          {children}
          <div className="lcx-flip-hint">Tap to flip back</div>
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   Hero
================================================================== */

function Hero() {
  const [visualRef, visualIn] = useInView({ threshold: 0.4 });

  return (
    <div className="card-hero">
      <div className="lcx-hero-word">
        <svg className="lcx-hero-mark" viewBox="0 0 24 24" fill="none">
          <path d="M2 15c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 4 3" stroke="#0071e3" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        Lancherix Card
      </div>

      <h1 className="lcx-hero-headline">Take control of your money.</h1>
      <p className="lcx-hero-sub">A simpler way to manage your personal finances.</p>

      <div ref={visualRef} className={`lcx-hero-visual ${visualIn ? "lcx-in" : ""}`}>
        <div className="lcx-hero-card">
          {/* Replace with <img src={cardImage} alt="Lancherix Card" /> once the PNG is wired in */}
          <svg viewBox="0 0 560 350" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lcxWave" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#bfe0ff" />
                <stop offset="45%" stopColor="#4da3f7" />
                <stop offset="75%" stopColor="#0058c2" />
                <stop offset="100%" stopColor="#ff9500" />
              </linearGradient>
            </defs>
            <rect width="560" height="350" fill="url(#lcxWave)" />
            <path d="M0 210 C 90 150, 180 270, 280 210 S 470 150, 560 210 V350 H0 Z" fill="rgba(255,255,255,0.18)" />
            <path d="M0 260 C 100 200, 200 320, 300 260 S 480 200, 560 260 V350 H0 Z" fill="rgba(255,255,255,0.28)" />
          </svg>
          <div className="lcx-hero-card-label">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M2 15c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 4 3" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            Lancherix
          </div>
        </div>

        <div className="lcx-hero-float lcx-hero-float-remaining">
          <span className="lcx-float-label">Budget remaining</span>
          <span className="lcx-float-value lcx-num">$249.31</span>
        </div>
        <div className="lcx-hero-float lcx-hero-float-goal">
          <span className="lcx-float-label">Trip Home</span>
          <span className="lcx-float-value lcx-num">$50 / $800</span>
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   1 — Transactions (dw-tx-* markup replicated from DashboardWidgets)
================================================================== */

const TRANSACTIONS = [
  { name: "Couche-Tard", cat: "Food", amount: -4.25, icon: "food", color: "#ff9500" },
  { name: "La Banquise", cat: "Food", amount: -18.5, icon: "food", color: "#ff9500" },
  { name: "Renaud-Bray", cat: "Shopping", amount: -18.99, icon: "shopping", color: "#34c759" },
  { name: "STM Monthly Pass", cat: "Transport · Recurring", amount: -100, icon: "transport", color: "#0071e3" },
  { name: "Café Aunja", cat: "Food", amount: -5.25, icon: "food", color: "#ff9500" },
];

function TransactionsStory() {
  const [visualRef, visualIn] = useInView();

  return (
    <div className="lcx-story">
      <div className="lcx-story-text">
        <Reveal>
          <span className="lcx-eyebrow-dot" style={{ background: "var(--lcx-blue)" }} />
          <h2 className="lcx-headline">Know exactly what you're spending.</h2>
          <p className="lcx-sub">
            Every purchase, organized the moment it happens — including the expenses that come back every month.
          </p>
        </Reveal>
        <FlipCard
          phrase="Every expense. Organized."
          figureLabel="spent this week"
          figureValue="$142.24"
          accent="var(--lcx-blue)"
          ariaLabel="Flip to learn more about transactions"
        >
          <p>
            Transactions and recurring expenses live side by side, so a coffee and a subscription
            are just as easy to find. Categorize what you spend, see when it happened, and
            recognize what keeps coming back.
          </p>
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
                    <span className="dw-tx-sub">{tx.cat}</span>
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
   2 — Budget (bt-* markup replicated from BudgetTab.jsx/css)
================================================================== */

const CATEGORIES = [
  { name: "Food", spent: 258.3, limit: 350, color: "#ff9500", icon: "food" },
  { name: "Transport", spent: 100, limit: 100, color: "#0071e3", icon: "transport" },
  { name: "School", spent: 101.8, limit: 150, color: "#5856d6", icon: "school" },
  { name: "Leisure", spent: 122, limit: 150, color: "#ff2d55", icon: "leisure" },
  { name: "Shopping", spent: 78.6, limit: 100, color: "#34c759", icon: "shopping" },
  { name: "Savings", spent: 200, limit: 200, color: "#ffcc00", icon: "savings" },
];

function BudgetRing({ spent, limit, inView }) {
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
        <span className="bt-ring-label">left</span>
      </div>
    </div>
  );
}

function BudgetStory() {
  const [visualRef, visualIn] = useInView();
  const totalLimit = CATEGORIES.reduce((s, c) => s + c.limit, 0);
  const totalSpent = CATEGORIES.reduce((s, c) => s + c.spent, 0);

  return (
    <div className="lcx-story">
      <div className="lcx-story-text">
        <Reveal>
          <span className="lcx-eyebrow-dot" style={{ background: "var(--lcx-orange)" }} />
          <h2 className="lcx-headline">Spend with a plan.</h2>
          <p className="lcx-sub">
            Set your overall budget, then give every category that matters to you its own limit.
          </p>
        </Reveal>
        <FlipCard
          phrase="Know what's left."
          figureLabel="categories on track"
          figureValue="5 / 6"
          accent="var(--lcx-orange)"
          ariaLabel="Flip to learn more about budgets"
        >
          <p>
            Your budget moves with your spending. See what you have left overall, and which
            categories — food, transport, savings, and the rest — are approaching their limit
            before they go over.
          </p>
        </FlipCard>
      </div>

      <div ref={visualRef} className={`lcx-story-visual ${visualIn ? "lcx-in" : ""}`}>
        <div className="lcx-panel">
          <div className="bt-overview-body lcx-budget-row">
            <BudgetRing spent={totalSpent} limit={totalLimit} inView={visualIn} />
            <div className="bt-overview-stats">
              <div>
                <div className="bt-overview-stat-label">Spent</div>
                <div className="bt-overview-stat-value lcx-num">{formatMoney(totalSpent)}</div>
              </div>
              <div>
                <div className="bt-overview-stat-label">Budget</div>
                <div className="bt-overview-stat-value lcx-num">{formatMoney(totalLimit)}</div>
              </div>
            </div>
          </div>

          <div className="lcx-cat-list">
            {CATEGORIES.map((cat) => {
              const pct = Math.min((cat.spent / cat.limit) * 100, 100);
              return (
                <div className="bt-cat-row" key={cat.name}>
                  <span className="bt-cat-icon" style={{ background: cat.color + "22" }}>
                    <Icon name={cat.icon} size={16} color={cat.color} />
                  </span>
                  <span className="bt-cat-info">
                    <span className="bt-cat-top">
                      <span className="bt-cat-name">{cat.name}</span>
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
   3 — Reports (dw-report-* markup replicated from DashboardWidgets)
================================================================== */

const BREAKDOWN = [
  { name: "Food", amount: 258.3, pct: 27, color: "#ff9500" },
  { name: "Savings", amount: 200, pct: 21, color: "#ffcc00" },
  { name: "Leisure", amount: 122, pct: 13, color: "#ff2d55" },
  { name: "School", amount: 101.8, pct: 11, color: "#5856d6" },
  { name: "Transport", amount: 100, pct: 11, color: "#0071e3" },
];

function ReportsStory() {
  const [visualRef, visualIn] = useInView();
  const income = 1250;
  const expenses = 950.69;
  const maxVal = Math.max(income, expenses);

  return (
    <div className="lcx-story">
      <div className="lcx-story-text">
        <Reveal>
          <span className="lcx-eyebrow-dot" style={{ background: "var(--lcx-green)" }} />
          <h2 className="lcx-headline">See the bigger picture.</h2>
          <p className="lcx-sub">Understand your income, expenses, and spending habits, all in one clear view.</p>
        </Reveal>
        <FlipCard
          phrase="Understand your spending."
          figureLabel="of spending this month"
          figureValue="27% Food"
          accent="var(--lcx-green)"
          ariaLabel="Flip to learn more about reports"
        >
          <p>
            Reports bring every transaction together so you can see where your money goes and
            recognize patterns over time — without digging through statements to find them.
          </p>
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
                <span className="dw-report-trend-label">August</span>
              </div>
            </div>

            <div className="dw-report-cats">
              {BREAKDOWN.map((b) => (
                <div className="dw-report-cat-row" key={b.name}>
                  <span className="dw-report-cat-dot" style={{ background: b.color }} />
                  <span className="dw-report-cat-name">{b.name}</span>
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
   4 — Goals (dw-goal-* markup replicated from DashboardWidgets)
================================================================== */

const GOALS = [
  { name: "MacBook", saved: 100, target: 1500, icon: "laptop", color: "#0071e3" },
  { name: "Trip Home", saved: 50, target: 800, icon: "airplane", color: "#34c759" },
  { name: "Emergency Fund", saved: 50, target: 1000, icon: "shield", color: "#ff2d55" },
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
  const [visualRef, visualIn] = useInView();

  return (
    <div className="lcx-story">
      <div className="lcx-story-text">
        <Reveal>
          <span className="lcx-eyebrow-dot" style={{ background: "var(--lcx-pink)" }} />
          <h2 className="lcx-headline">Turn plans into progress.</h2>
          <p className="lcx-sub">
            Whether it's something you want, something you need, or somewhere you want to go —
            set a goal and keep your progress in sight.
          </p>
        </Reveal>
        <FlipCard
          phrase="Small steps. Clear progress."
          figureLabel="saved toward Trip Home"
          figureValue="$50 / $800"
          accent="var(--lcx-pink)"
          ariaLabel="Flip to learn more about goals"
        >
          <p>
            Goals give your saving a destination. Set a target for anything — a laptop, a trip, a
            cushion for the unexpected — and watch it get closer every time you put something
            aside.
          </p>
        </FlipCard>
      </div>

      <div ref={visualRef} className={`lcx-story-visual ${visualIn ? "lcx-in" : ""}`}>
        <div className="dw-goals-row lcx-goal-grid">
          {GOALS.map((g) => {
            const pct = Math.min(g.saved / g.target, 1);
            return (
              <div className="lcx-panel dw-goal-card" key={g.name}>
                <GoalRing pct={pct} color={g.color} icon={g.icon} inView={visualIn} />
                <span className="dw-goal-card-name">{g.name}</span>
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

const FAQS = [
  { q: "What is Lancherix Card?", a: "Lancherix Card is a personal finance management app. It brings your transactions, budgets, reports, and goals together so you always know where you stand." },
  { q: "Who is Lancherix Card for?", a: "Students, young adults, people living independently for the first time, and families — anyone who wants a clearer view of their personal finances." },
  { q: "Can I track recurring expenses?", a: "Yes. Subscriptions, memberships, and other expenses that come back every month are tracked separately from everyday spending, so nothing catches you off guard." },
  { q: "Can I create category budgets?", a: "Yes. Alongside your overall monthly budget, you can set an individual limit for each category — food, transport, school, and however many more you'd like." },
  { q: "Can I set financial goals?", a: "Yes. Create a goal for anything you're saving toward, set a target amount, and track your progress alongside your everyday budget." },
  { q: "What currencies can I use?", a: "Lancherix Card supports multiple currencies, so your balances and budgets always show up the way you expect." },
];

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
  return (
    <div className="card-qa">
      <div className="lcx-qa-inner">
        <h2 className="lcx-qa-title">Still curious?</h2>
        {FAQS.map((f) => (
          <FaqItem key={f.q} q={f.q} a={f.a} />
        ))}
      </div>
    </div>
  );
}

/* ==================================================================
   Studio transition + closing CTA + footer
================================================================== */

function StudioAndCta() {
  const [tilesRef, tilesIn] = useInView();

  return (
    <div className="card-more">
      <div className="lcx-studio">
        <Reveal>
          <p className="lcx-studio-lede">Your money is only part of the picture.</p>
          <h2 className="lcx-studio-headline">
            Meet Lancherix <span>Studio</span>.
          </h2>
          <p className="lcx-studio-sub">
            Organize your work, studies, chores, projects, and everything else that makes up your day.
          </p>
        </Reveal>

        <div ref={tilesRef} className={`lcx-studio-tiles ${tilesIn ? "lcx-in" : ""}`}>
          <div className="lcx-studio-tile" style={{ "--lcx-tile-color": "#0071e3" }}>Work</div>
          <div className="lcx-studio-tile" style={{ "--lcx-tile-color": "#5856d6" }}>Studies</div>
          <div className="lcx-studio-tile" style={{ "--lcx-tile-color": "#34c759" }}>Chores</div>
          <div className="lcx-studio-tile" style={{ "--lcx-tile-color": "#ff9500" }}>Projects</div>
        </div>

        <Reveal>
          <p className="lcx-studio-tagline">
            One Lancherix account.
            <br />
            More of your life, organized.
          </p>
        </Reveal>
      </div>

      <div className="lcx-cta">
        <Reveal>
          <h2 className="lcx-cta-headline">Start managing your money.</h2>
          <a className="lcx-cta-button" href="#get-started">
            Get Started
          </a>
        </Reveal>
      </div>

      <footer className="lcx-footer">
        <div className="lcx-footer-top">
          <div className="lcx-footer-col">
            <div className="lcx-footer-brand">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M2 15c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 4 3" stroke="#0071e3" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
              Lancherix
            </div>
            <p className="lcx-footer-tagline">One account. More of your life, organized.</p>
          </div>

          <div className="lcx-footer-col">
            <p className="lcx-footer-col-title">Card</p>
            <ul className="lcx-footer-links">
              <li><a href="#transactions">Transactions</a></li>
              <li><a href="#budget">Budget</a></li>
              <li><a href="#reports">Reports</a></li>
              <li><a href="#goals">Goals</a></li>
            </ul>
          </div>

          <div className="lcx-footer-col">
            <p className="lcx-footer-col-title">Studio</p>
            <ul className="lcx-footer-links">
              <li><a href="#studio">Work</a></li>
              <li><a href="#studio">Studies</a></li>
              <li><a href="#studio">Chores</a></li>
              <li><a href="#studio">Projects</a></li>
            </ul>
          </div>

          <div className="lcx-footer-col">
            <p className="lcx-footer-col-title">Company</p>
            <ul className="lcx-footer-links">
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#terms">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="lcx-footer-bottom">
          <span>© {new Date().getFullYear()} Lancherix</span>
          <span>Made for people managing their own money.</span>
        </div>
      </footer>
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