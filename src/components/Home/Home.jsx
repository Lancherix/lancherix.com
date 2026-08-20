import { useState } from "react";
import Card from "./Card";
import "./Home.css";

/* ============================================================
   Content pulled from / inspired by the real app's own data:
   - goal icons + colors come straight from GoalForm's
     goalIconChoices / goalColorChoices arrays
   - budget ring mirrors the BudgetSummary ring math
   - trend bars mirror ReportWidget's income/expense bars
   - category rows mirror the report's spending breakdown
   These are static illustrative previews (no live data needed
   on the marketing site) but the shapes and values are drawn
   directly from how the product actually looks.
   ============================================================ */

const goalPreview = [
  { icon: "💻", label: "New laptop", color: "#0071e3", pct: 0.72 },
  { icon: "✈️", label: "Trip to Lisbon", color: "#ff9500", pct: 0.4 },
  { icon: "🚲", label: "Road bike", color: "#34c759", pct: 1 },
  { icon: "🎫", label: "Concert fund", color: "#af52de", pct: 0.18 },
];

const categoryPreview = [
  { name: "Groceries", color: "#34c759", pct: 34 },
  { name: "Transport", color: "#0071e3", pct: 21 },
  { name: "Dining out", color: "#ff9500", pct: 17 },
  { name: "Subscriptions", color: "#af52de", pct: 12 },
];

const budgetFeatures = [
  {
    title: "Log an expense. In two taps.",
    description:
      "Type an amount, pick a category, done. No linked accounts to wait on, no syncing to babysit.",
  },
  {
    title: "Categorized automatically.",
    description:
      "Every entry gets an icon and color the moment you save it, so your spending is legible at a glance.",
  },
  {
    title: "Income and expenses, side by side.",
    description:
      "One toggle switches between what came in and what went out — no separate screens to hunt through.",
  },
  {
    title: "A budget that talks back.",
    description:
      "Set a monthly limit once. The ring fills as you spend, and turns red the moment you're over.",
  },
];

const insightCards = [
  {
    eyebrow: "Trend",
    title: "This month vs. last.",
    description: "Income and expenses, side by side, every month.",
  },
  {
    eyebrow: "Categories",
    title: "Where it actually went.",
    description: "Ranked spending by category, largest first.",
  },
  {
    eyebrow: "Budget",
    title: "How much is left.",
    description: "One ring. One number. No spreadsheet required.",
  },
];

const faqItems = [
  {
    q: "Is it really free?",
    a: "Yes — the app is free to use, with no trial period and no credit card required to sign up.",
  },
  {
    q: "Does it connect to my bank?",
    a: "No. Every transaction is entered by you, on purpose. Nothing is pulled from your bank, and no banking credentials ever touch the app.",
  },
  {
    q: "Where is my data stored?",
    a: "In your account, tied to your sign-in — not shared, sold, or handed to advertisers.",
  },
  {
    q: "Can I track savings goals, not just spending?",
    a: "Yes. Create a goal with a target amount, pick an icon and color, and add or remove funds as you save.",
  },
  {
    q: "What if I go over budget?",
    a: "The budget ring and your stats turn red the moment you cross your monthly limit, so it's impossible to miss.",
  },
];

/* ---------------- small preview widgets ---------------- */

function BudgetRingPreview({ pct = 0.68 }) {
  const size = 120;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);

  return (
    <div className="promo-ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#ffffff"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="promo-ring-center">
        <span className="promo-ring-value">{Math.round(pct * 100)}%</span>
        <span className="promo-ring-label">of budget</span>
      </div>
    </div>
  );
}

function TrendBarsPreview() {
  const months = [
    { label: "May", income: 62, expenses: 40 },
    { label: "Jun", income: 58, expenses: 52 },
    { label: "Jul", income: 70, expenses: 45 },
    { label: "Aug", income: 66, expenses: 38 },
  ];
  const max = 80;

  return (
    <div className="promo-trend">
      {months.map((m) => (
        <div className="promo-trend-col" key={m.label}>
          <div className="promo-trend-bars">
            <span
              className="promo-trend-bar promo-trend-bar-income"
              style={{ height: `${(m.income / max) * 100}%` }}
            />
            <span
              className="promo-trend-bar promo-trend-bar-expense"
              style={{ height: `${(m.expenses / max) * 100}%` }}
            />
          </div>
          <span className="promo-trend-label">{m.label}</span>
        </div>
      ))}
    </div>
  );
}

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className={"promo-faq-item" + (isOpen ? " promo-faq-item--open" : "")}>
      <button className="promo-faq-question" onClick={onToggle}>
        <span>{q}</span>
        <span className="promo-faq-icon">{isOpen ? "–" : "+"}</span>
      </button>
      {isOpen && <p className="promo-faq-answer">{a}</p>}
    </div>
  );
}

/* ---------------- page ---------------- */

function Home() {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="promo-home">
      {/* ---------------- Hero ---------------- */}
      <section className="promo-hero">
        <span className="promo-hero-eyebrow">Financial Planner</span>
        <h1 className="promo-hero-title">
          Every dollar.
          <br />
          One place.
        </h1>
        <p className="promo-hero-subtitle">
          Track spending, set a budget, and save toward what matters —
          free, entirely manual, and entirely yours.
        </p>
        <div className="promo-hero-actions">
          <a className="promo-btn promo-btn-primary" href="#signup">
            Sign Up Free
          </a>
          <a className="promo-btn promo-btn-secondary" href="#features">
            See how it works
          </a>
        </div>
      </section>

      <p className="promo-hero-footnote">
        No bank connection. No subscription. Just your numbers, kept honestly. {" "}
        <a href="#privacy">Learn more</a>
      </p>

      {/* ---------------- Budgeting (blue block) ---------------- */}
      <section className="promo-block promo-block-blue" id="features">
        <h2 className="promo-block-title">
          Budgeting
          <br />
          Start here. Track anywhere.
        </h2>

        <div className="promo-block-layout">
          <div className="promo-ring-showcase">
            <BudgetRingPreview pct={0.68} />
            <p className="promo-ring-caption">
              $1,360 spent of a $2,000 monthly budget
            </p>
          </div>

          <div className="promo-tile-grid">
            {budgetFeatures.map((f) => (
              <div className="promo-tile" key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Goals (orange block) ---------------- */}
      <section className="promo-block promo-block-orange">
        <h2 className="promo-block-title">
          Goals
          <br />
          Always in sight.
        </h2>
        <p className="promo-block-subtitle">
          Pick an icon, pick a color, set a target. Add funds whenever you
          can, and watch the ring close.
        </p>

        <div className="promo-goal-row">
          {goalPreview.map((g) => {
            const size = 84;
            const stroke = 8;
            const radius = (size - stroke) / 2;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference * (1 - g.pct);
            return (
              <div className="promo-goal-tile" key={g.label}>
                <div
                  className="promo-goal-ring"
                  style={{ width: size, height: size }}
                >
                  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth={stroke}
                    />
                    <circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth={stroke}
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                  </svg>
                  <span className="promo-goal-emoji">{g.icon}</span>
                </div>
                <span className="promo-goal-label">{g.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- Reports (green block) ---------------- */}
      <section className="promo-block promo-block-green">
        <h2 className="promo-block-title">
          Reports
          <br />
          See the trend.
        </h2>

        <div className="promo-block-layout">
          <div className="promo-trend-showcase">
            <TrendBarsPreview />
            <div className="promo-trend-legend">
              <span>
                <i className="promo-dot promo-dot-income" /> Income
              </span>
              <span>
                <i className="promo-dot promo-dot-expense" /> Expenses
              </span>
            </div>
          </div>

          <div className="promo-category-list">
            {categoryPreview.map((c) => (
              <div className="promo-category-row" key={c.name}>
                <span
                  className="promo-category-dot"
                  style={{ background: c.color }}
                />
                <span className="promo-category-name">{c.name}</span>
                <span className="promo-category-track">
                  <span
                    className="promo-category-fill"
                    style={{ width: `${c.pct}%`, background: c.color }}
                  />
                </span>
                <span className="promo-category-pct">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Dark insight cards ---------------- */}
      <section className="promo-insights">
        <h2 className="promo-insights-title">Three ways to see it.</h2>
        <div className="promo-insights-row">
          {insightCards.map((c) => (
            <div className="promo-insight-card" key={c.title}>
              <span className="promo-insight-eyebrow">{c.eyebrow}</span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Privacy / trust ---------------- */}
      <section className="promo-privacy" id="privacy">
        <span className="promo-privacy-lock">🔒</span>
        <h2>The wall around your data.</h2>
        <p>
          There's no bank link to authorize and no account numbers to hand
          over — every entry is typed in by you. Nothing is shared with
          advertisers, and nothing is sold. It's your budget, kept exactly
          as privately as a notebook, with none of the arithmetic.
        </p>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="promo-faq">
        <h2 className="promo-faq-title">Questions? Answers.</h2>
        <div className="promo-faq-list">
          {faqItems.map((item, i) => (
            <FAQItem
              key={item.q}
              q={item.q}
              a={item.a}
              isOpen={openFAQ === i}
              onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* ---------------- Cross-sell row ---------------- */}
      <section className="promo-more" id="signup">
        <h2 className="promo-more-title">More to explore.</h2>
        <div className="promo-more-row">
          <Card
            eyebrow="Get started"
            title="Sign up free."
            description="Create an account in under a minute — no card required."
            accent="#0071e3"
            href="#signup-form"
          />
          <Card
            eyebrow="Our story"
            title="Why we built this."
            description="Started as a personal tool. Now it's yours too."
            accent="#ff9500"
            href="#about"
          />
          <Card
            eyebrow="Trust"
            title="How your data works."
            description="Manual entry, no bank link, nothing sold."
            accent="#34c759"
            href="#privacy"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;