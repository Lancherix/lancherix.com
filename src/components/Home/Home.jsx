import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  CONTENT BLOCKS                                                    */
/* ------------------------------------------------------------------ */

function SectionBlock({ tone = "plain", eyebrow, title, children }) {
  return (
    <section className={`section-block tone-${tone}`}>
      {eyebrow && <span className="section-block__eyebrow">{eyebrow}</span>}
      {title && <h2 className="section-block__title">{title}</h2>}
      <div className="section-block__body">{children}</div>
    </section>
  );
}

function HeroBlock({ title, subtitle }) {
  return (
    <div className="hero-block">
      <div className="hero-block__blob" aria-hidden="true" />
      <div className="hero-block__phone">
        <div className="hero-block__screen" />
      </div>
      <h1 className="hero-block__title">{title}</h1>
      <p className="hero-block__subtitle">{subtitle}</p>
    </div>
  );
}

function SplitBlock({ reverse = false, visualTone = "blue", visualLabel = "Visual", children }) {
  return (
    <div className={`split-block ${reverse ? "split-block--reverse" : ""}`}>
      <div className={`split-block__visual tone-${visualTone}`}>
        <span>{visualLabel}</span>
      </div>
      <div className="split-block__text">{children}</div>
    </div>
  );
}

function GridBlock({ columns = 3, children }) {
  return (
    <div className="grid-block" style={{ "--grid-cols": columns }}>
      {children}
    </div>
  );
}

function ListBlock({ items }) {
  return (
    <ul className="list-block">
      {items.map((item, i) => (
        <li key={i} className="list-block__item">
          <span className="list-block__dot" style={{ "--dot-tone": item.tone || "blue" }} />
          <div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function GalleryBlock({ count = 4 }) {
  return (
    <div className="gallery-block">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="gallery-block__frame">
          <span>Screenshot {i + 1}</span>
        </div>
      ))}
    </div>
  );
}

function BannerBlock({ tone = "dark", children }) {
  return (
    <div className={`banner-block tone-${tone}`}>
      <p>{children}</p>
    </div>
  );
}

function CardBlock({ icon = "●", title, summary, detail, flippable = false, tone = "white" }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`card-block ${flippable ? "card-block--flippable" : ""} ${flipped ? "is-flipped" : ""}`}
      onClick={() => flippable && setFlipped((f) => !f)}
    >
      <div className="card-block__inner">
        <div className={`card-block__face card-block__face--front tone-${tone}`}>
          <span className="card-block__icon">{icon}</span>
          <h4>{title}</h4>
          <p>{summary}</p>
          {flippable && <span className="card-block__hint">Tap to expand →</span>}
        </div>
        {flippable && (
          <div className={`card-block__face card-block__face--back tone-${tone}`}>
            <h4>{title}</h4>
            <p>{detail}</p>
            <span className="card-block__hint">← Tap to close</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LAYOUT WRAPPERS                                                    */
/* ------------------------------------------------------------------ */

function Row2Layout({ children }) {
  return <div className="layout-row2">{children}</div>;
}

function Row3Layout({ children }) {
  return <div className="layout-row3">{children}</div>;
}

function StackThenRowLayout({ children }) {
  return <div className="layout-stack-row">{children}</div>;
}

function AsymmetricLayout({ wide, narrow }) {
  return (
    <div className="layout-asymmetric">
      <div className="layout-asymmetric__wide">{wide}</div>
      <div className="layout-asymmetric__narrow">{narrow}</div>
    </div>
  );
}

function LayoutSwatch({ label, tone = "blue", wide = false }) {
  return <div className={`layout-swatch tone-${tone} ${wide ? "layout-swatch--wide" : ""}`}>{label}</div>;
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="home">
      <header className="home__header">
        <span className="home__kicker">Component library</span>
        <h1>Block Catalog</h1>
        <p>A working set of reusable pieces, styled the Apple.com way — bright color cards, big rounded corners, bold type.</p>
      </header>

      <main className="home__body">
        <SectionBlock tone="plain">
          <HeroBlock
            title="[Project Title]"
            subtitle="[One confident line describing what this project does and who it's for.]"
          />
        </SectionBlock>

        <SectionBlock tone="blue" eyebrow="Overview" title="Start here. See everything.">
          <SplitBlock visualTone="blue" visualLabel="Screenshot">
            <h4>[Section heading]</h4>
            <p>[Short paragraph — the problem this project solves, or how a specific part of the stack works.]</p>
          </SplitBlock>
        </SectionBlock>

        <SectionBlock tone="plain" eyebrow="Stack" title="Built with the right tools.">
          <GridBlock columns={3}>
            <CardBlock icon="🍃" title="MongoDB" summary="[Role in this project]" tone="white" />
            <CardBlock icon="⚙️" title="Express" summary="[Role in this project]" tone="white" />
            <CardBlock icon="⚛️" title="React" summary="[Role in this project]" tone="white" />
          </GridBlock>
        </SectionBlock>

        <SectionBlock tone="green" eyebrow="Features" title="Your even more capable app.">
          <ListBlock
            items={[
              { title: "[Feature name]", description: "[What it does and why it matters.]", tone: "green" },
              { title: "[Feature name]", description: "[What it does and why it matters.]", tone: "green" },
              { title: "[Feature name]", description: "[What it does and why it matters.]", tone: "green" },
            ]}
          />
        </SectionBlock>

        <SectionBlock tone="plain" eyebrow="Gallery" title="A closer look.">
          <GalleryBlock count={4} />
        </SectionBlock>

        <SectionBlock tone="plain">
          <BannerBlock tone="dark">[Short, confident callout — a stat, a quote, or a link to the live demo.]</BannerBlock>
        </SectionBlock>

        <SectionBlock tone="orange" eyebrow="Details" title="Always on hand.">
          <GridBlock columns={3}>
            <CardBlock
              icon="🔐"
              title="[Feature A]"
              summary="[Short summary]"
              detail="[Longer explanation shown on flip — how it works, why it was built this way.]"
              flippable
              tone="white"
            />
            <CardBlock
              icon="⚡"
              title="[Feature B]"
              summary="[Short summary]"
              detail="[Longer explanation shown on flip.]"
              flippable
              tone="white"
            />
            <CardBlock icon="✨" title="[Feature C]" summary="[Short summary — not flippable]" tone="white" />
          </GridBlock>
        </SectionBlock>
      </main>

      <div className="home__divider">
        <span>Layout wrappers</span>
      </div>

      <main className="home__body">
        <SectionBlock tone="plain" eyebrow="L1" title="Two columns, equal width">
          <Row2Layout>
            <LayoutSwatch label="A" tone="blue" />
            <LayoutSwatch label="B" tone="coral" />
          </Row2Layout>
        </SectionBlock>

        <SectionBlock tone="plain" eyebrow="L2" title="Three columns, equal width">
          <Row3Layout>
            <LayoutSwatch label="A" tone="blue" />
            <LayoutSwatch label="B" tone="green" />
            <LayoutSwatch label="C" tone="orange" />
          </Row3Layout>
        </SectionBlock>

        <SectionBlock tone="plain" eyebrow="L3" title="Two stacked, then one full-width">
          <StackThenRowLayout>
            <LayoutSwatch label="A" tone="blue" />
            <LayoutSwatch label="B" tone="coral" />
            <LayoutSwatch label="C — full width" tone="purple" wide />
          </StackThenRowLayout>
        </SectionBlock>

        <SectionBlock tone="plain" eyebrow="L4" title="Wide + narrow column">
          <AsymmetricLayout
            wide={<LayoutSwatch label="Wide — 70%" tone="blue" />}
            narrow={<LayoutSwatch label="Narrow — 30%" tone="green" />}
          />
        </SectionBlock>
      </main>
    </div>
  );
}