import "./Card.css";

/**
 * Card
 * A single feature card for the promo site, styled after Apple.com's
 * light-mode product cards: quiet surface, hairline border, system font
 * stack, and a small "Learn more ›" link instead of a heavy CTA button.
 *
 * Usage:
 * <Card
 *   eyebrow="Budgeting"
 *   title="See where it went."
 *   description="Every expense, sorted into categories automatically as you enter it."
 *   image={budgetScreenshot}
 *   accent="#1a7f37"
 *   href="#budgeting"
 * />
 */
function Card({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  accent = "#0071e3",
  href,
  size = "regular", // "regular" | "large"
}) {
  const isLink = Boolean(href);
  const Wrapper = isLink ? "a" : "div";

  return (
    <Wrapper
      className={`promo-card promo-card--${size}${isLink ? " promo-card--linked" : ""}`}
      href={href}
      style={{ "--card-accent": accent }}
    >
      {image && (
        <div className="promo-card-media">
          <img src={image} alt={imageAlt} loading="lazy" />
        </div>
      )}

      <div className="promo-card-body">
        {eyebrow && <span className="promo-card-eyebrow">{eyebrow}</span>}
        {title && <h3 className="promo-card-title">{title}</h3>}
        {description && (
          <p className="promo-card-description">{description}</p>
        )}

        {isLink && (
          <span className="promo-card-link">
            Learn more <span className="promo-card-chevron">›</span>
          </span>
        )}
      </div>
    </Wrapper>
  );
}

export default Card;