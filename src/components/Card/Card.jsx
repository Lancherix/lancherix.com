import { useState, useEffect, useRef } from "react";
import '../Home/Home.css';

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(target, inView, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    let frame;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);
  return value;
}

/* ------------------------------------------------------------------ */
/*  SMALL UI PRIMITIVES                                                */
/* ------------------------------------------------------------------ */

function WaveLogo({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M2 15c2-3 4-3 6 0s4 3 6 0 4-3 6 0"
        stroke="#2563eb"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
        active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

/* Generic "tap to switch" box — pills above, swapped content below */
function TapTabs({ tabs }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="flex gap-2 justify-center mb-10 flex-wrap">
        {tabs.map((tab, i) => (
          <Pill key={tab.label} active={active === i} onClick={() => setActive(i)}>
            {tab.label}
          </Pill>
        ))}
      </div>
      <div key={active} className="animate-[fadeIn_0.4s_ease]">
        {tabs[active].content}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SCREEN MOCKUPS (stylised, not literal screenshots)                 */
/* ------------------------------------------------------------------ */

function MockDashboard() {
  const rows = [
    { name: "Couche-Tard", cat: "Alimentation", amt: "-$4.25", dot: "bg-orange-400" },
    { name: "STM Monthly Pass", cat: "Transport", amt: "-$100.00", dot: "bg-blue-400" },
    { name: "Renaud-Bray", cat: "Achats", amt: "-$18.99", dot: "bg-green-400" },
  ];
  return (
    <div className="bg-white rounded-3xl shadow-xl p-7 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <WaveLogo />
        <span className="font-bold text-gray-900">Lancherix</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-xs text-gray-400">Solde total</p>
          <p className="text-xl font-bold text-gray-900">-$950.70</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-xs text-gray-400">Budget restant</p>
          <p className="text-xl font-bold text-blue-600">$249.30</p>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {rows.map((t) => (
          <div key={t.name} className="flex items-center gap-3 py-2.5">
            <span className={`w-9 h-9 rounded-xl ${t.dot} bg-opacity-15 flex items-center justify-center`}>
              <span className={`w-2 h-2 rounded-full ${t.dot}`} />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{t.name}</p>
              <p className="text-xs text-gray-400">{t.cat}</p>
            </div>
            <p className="text-sm font-semibold text-gray-900">{t.amt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockBudget() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto text-center">
      <div
        className="w-40 h-40 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{ background: "conic-gradient(#2563eb 0% 79%, #e5e7eb 79% 100%)" }}
      >
        <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-gray-900">$249</span>
          <span className="text-xs text-gray-400">restant</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-left max-w-xs mx-auto">
        <div>
          <p className="text-xs text-gray-400">Dépensé</p>
          <p className="font-bold text-gray-900">$950.69</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Budget</p>
          <p className="font-bold text-gray-900">$1,200.00</p>
        </div>
      </div>
    </div>
  );
}

function MockReport() {
  const cats = [
    { name: "Alimentation", pct: 27, tone: "bg-orange-400" },
    { name: "Épargne", pct: 21, tone: "bg-yellow-400" },
    { name: "Loisirs", pct: 13, tone: "bg-red-400" },
    { name: "École", pct: 11, tone: "bg-purple-400" },
  ];
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto">
      <p className="text-xs text-gray-400 mb-5">Répartition des dépenses</p>
      <div className="space-y-4">
        {cats.map((c) => (
          <div key={c.name}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-medium text-gray-700">{c.name}</span>
              <span className="text-gray-400">{c.pct}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${c.tone} rounded-full`} style={{ width: `${c.pct * 3}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockGoals() {
  const goals = [
    { name: "MacBook", cur: 100, max: 1500, tone: "bg-blue-500" },
    { name: "Trip Home", cur: 50, max: 800, tone: "bg-green-500" },
    { name: "Emergency", cur: 50, max: 1000, tone: "bg-red-500" },
  ];
  return (
    <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
      {goals.map((g) => (
        <div key={g.name} className="bg-white rounded-2xl shadow-xl p-4 text-center">
          <div className={`w-8 h-2 ${g.tone} rounded-full mx-auto mb-3`} />
          <p className="text-xs font-bold text-gray-900">{g.name}</p>
          <p className="text-[11px] text-gray-400 mt-1">
            ${g.cur} / ${g.max}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTIONS                                                           */
/* ------------------------------------------------------------------ */

function Hero() {
  const [ref, inView] = useInView(0.1);
  const budget = useCountUp(249, inView, 1500);
  return (
    <div
      ref={ref}
      className="relative overflow-hidden pt-32 pb-24 text-center bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-300/40 rounded-full blur-3xl pointer-events-none" />
      <div className="relative px-6">
        <span className="inline-block text-blue-600 text-sm font-bold uppercase tracking-wide mb-4">
          Lancherix Card
        </span>
        <h1 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tight mb-6 leading-[1.05]">
          Carry your budget.
          <br />
          Everywhere.
        </h1>
        <p className="text-gray-500 text-xl max-w-xl mx-auto mb-10">
          Track spending, hit your goals, and see exactly where your money goes — all in one clean dashboard.
        </p>
        <div className="flex items-center justify-center gap-4 mb-14">
          <a
            href="#signup"
            className="bg-blue-600 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign Up Free
          </a>
          <a href="#tour" className="text-blue-600 font-semibold px-4 py-3.5">
            See how it works →
          </a>
        </div>
        <div className="inline-flex items-center gap-3 bg-white rounded-2xl shadow-lg px-8 py-5">
          <span className="text-gray-400 text-sm font-medium">Budget restant</span>
          <span className="text-3xl font-black text-blue-600">${budget}.30</span>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({ eyebrow, title, description, mock, reverse = false }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center py-24">
      <div
        className={`transition-all duration-700 ${reverse ? "md:order-2" : ""} ${
          inView ? "opacity-100 translate-x-0" : `opacity-0 ${reverse ? "translate-x-8" : "-translate-x-8"}`
        }`}
      >
        <span className="text-blue-600 text-sm font-bold uppercase tracking-wide">{eyebrow}</span>
        <h3 className="text-4xl font-extrabold text-gray-900 mt-3 mb-4 tracking-tight">{title}</h3>
        <p className="text-gray-500 text-lg leading-relaxed max-w-md">{description}</p>
      </div>
      <div
        className={`transition-all duration-700 delay-150 ${reverse ? "md:order-1" : ""} ${
          inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {mock}
      </div>
    </div>
  );
}

function ProductTour() {
  return (
    <div id="tour" className="py-28 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center mb-14 px-6">
        <span className="text-blue-600 text-sm font-bold uppercase tracking-wide">Take a look</span>
        <h3 className="text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
          Three screens. One clear picture.
        </h3>
      </div>
      <TapTabs
        tabs={[
          { label: "Dashboard", content: <MockDashboard /> },
          { label: "Budget", content: <MockBudget /> },
          { label: "Rapport", content: <MockReport /> },
        ]}
      />
    </div>
  );
}

function StatSection() {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="py-40 text-center bg-gray-950 text-white px-6">
      <p
        className={`text-7xl md:text-8xl font-black tracking-tight transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        $0. Forever free.
      </p>
      <p className="text-gray-400 text-lg mt-6">No subscriptions. No hidden fees. Ever.</p>
    </div>
  );
}

function PrivacySection() {
  const [mode, setMode] = useState("device");
  return (
    <div className="py-28 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center mb-12 px-6">
        <span className="text-blue-600 text-sm font-bold uppercase tracking-wide">Privacy</span>
        <h3 className="text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">Your data. Your business.</h3>
      </div>
      <div className="flex justify-center gap-2 mb-10">
        <Pill active={mode === "device"} onClick={() => setMode("device")}>
          Your device
        </Pill>
        <Pill active={mode === "cloud"} onClick={() => setMode("cloud")}>
          Other apps
        </Pill>
      </div>
      <div key={mode} className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-10 text-center animate-[fadeIn_0.4s_ease]">
        {mode === "device" ? (
          <>
            <div className="text-5xl mb-4">🔒</div>
            <p className="font-bold text-gray-900 mb-2">Everything stays local.</p>
            <p className="text-gray-500 text-sm">
              Your transactions and budgets live on your device — nothing leaves without your say.
            </p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4 opacity-40">☁️</div>
            <p className="font-bold text-gray-400 mb-2">Synced to a third-party server.</p>
            <p className="text-gray-400 text-sm">
              Most budgeting apps store your bank data off-device. Lancherix doesn't.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function ComparisonSection() {
  const [mode, setMode] = useState("manual");
  const data = {
    manual: ["You control every entry", "No bank credentials shared", "Works offline", "Zero tracking"],
    linked: ["Requires bank login", "Third-party data access", "Needs constant internet", "Ad-driven data use"],
  };
  return (
    <div className="py-28">
      <div className="max-w-3xl mx-auto text-center mb-12 px-6">
        <span className="text-blue-600 text-sm font-bold uppercase tracking-wide">Why Lancherix</span>
        <h3 className="text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">Manual entry. On purpose.</h3>
      </div>
      <div className="flex justify-center gap-2 mb-10">
        <Pill active={mode === "manual"} onClick={() => setMode("manual")}>
          Manual entry
        </Pill>
        <Pill active={mode === "linked"} onClick={() => setMode("linked")}>
          Bank-linked apps
        </Pill>
      </div>
      <ul key={mode} className="max-w-md mx-auto space-y-3 px-6 animate-[fadeIn_0.4s_ease]">
        {data[mode].map((line) => (
          <li key={line} className="flex items-center gap-3 bg-gray-50 rounded-2xl px-5 py-4">
            <span className={mode === "manual" ? "text-green-500" : "text-gray-400"}>
              {mode === "manual" ? "✓" : "–"}
            </span>
            <span className="text-gray-700 text-sm font-medium">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="max-w-2xl mx-auto divide-y divide-gray-200 px-6">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left"
          >
            <span className="font-semibold text-gray-900">{item.q}</span>
            <span
              className={`text-blue-600 text-xl transition-transform duration-300 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open === i ? "max-h-40 pb-5" : "max-h-0"
            }`}
          >
            <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href="#signup"
      className={`fixed bottom-8 right-8 z-50 bg-blue-600 text-white px-6 py-3.5 rounded-full font-semibold shadow-xl transition-all duration-300 hover:bg-blue-700 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      Sign Up Free
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const faqItems = [
  {
    q: "What is Lancherix Card?",
    a: "A budgeting dashboard that tracks your spending, categorizes transactions, and shows your goals — all in one place.",
  },
  {
    q: "Is my financial data private?",
    a: "Yes. Your transactions and budgets stay on your device by default — nothing is shared without your say.",
  },
  {
    q: "Does it work without a bank connection?",
    a: "Yes. Lancherix is built around manual entry, so you never have to share your bank credentials.",
  },
  {
    q: "Can I track multiple currencies?",
    a: "Yes, you can set your account currency in Settings and switch it at any time.",
  },
  {
    q: "Is Lancherix Card really free?",
    a: "Yes — no subscriptions, no hidden fees, no premium tier required for core budgeting features.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Card() {
  return (
    <div className="font-sans text-gray-900 bg-white">
      <Hero />

      <div className="max-w-6xl mx-auto px-8">
        <FeatureRow
          eyebrow="Transactions"
          title="Every purchase, instantly logged."
          description="See exactly where your money goes, categorized automatically the moment it happens."
          mock={<MockDashboard />}
        />
        <FeatureRow
          eyebrow="Objectifs"
          title="Save toward what matters."
          description="Set a goal, track progress, and watch your MacBook fund — or your next trip — get closer every week."
          mock={<MockGoals />}
          reverse
        />
      </div>

      <ProductTour />
      <StatSection />
      <PrivacySection />
      <ComparisonSection />

      <div className="py-28">
        <div className="max-w-3xl mx-auto text-center mb-12 px-6">
          <span className="text-blue-600 text-sm font-bold uppercase tracking-wide">FAQ</span>
          <h3 className="text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">Questions? Answers.</h3>
        </div>
        <Accordion items={faqItems} />
      </div>

      <footer id="signup" className="bg-gray-950 text-white py-20 text-center px-6">
        <h3 className="text-3xl font-extrabold mb-4">Ready to see where your money goes?</h3>
        <a
          href="#signup"
          className="inline-block bg-blue-600 px-7 py-3.5 rounded-full font-semibold hover:bg-blue-700 transition-colors mb-14"
        >
          Sign Up Free
        </a>
        <p className="text-gray-500 text-sm">© 2026 Lancherix</p>
      </footer>

      <StickyCTA />
    </div>
  );
}