import { NavLink } from "react-router-dom";

import { getServiceMedia } from "@/src/content/serviceMedia";
import { t } from "@/src/content/site";
import { MediaPlaceholder } from "@/src/components/MediaPlaceholder";
import type { Locale, ServiceEntry } from "@/src/types";

interface ServicePreviewCardProps {
  locale: Locale;
  service: ServiceEntry;
  to: string;
  compact?: boolean;
}

export function ServicePreviewCard({
  locale,
  service,
  to,
  compact = false,
}: ServicePreviewCardProps) {
  const media = getServiceMedia(service.slug);
  const bullets = service.bullets[locale].slice(0, compact ? 2 : 3);

  return (
    <NavLink to={to} className={`service-card ${compact ? "service-card--compact" : ""}`.trim()}>
      <MediaPlaceholder
        accent={service.accent}
        badge={t(locale, media.badge)}
        title={t(locale, service.shortLabel)}
        caption={t(locale, media.signal)}
        signals={[]}
        variant="panel"
        image={media.image}
      />

      <div className="service-card__body">
        <div className="service-card__meta">
          <span className={`tone-dot tone-dot--${service.accent}`} />
          <span>{t(locale, service.shortLabel)}</span>
        </div>
        <h3>{t(locale, service.title)}</h3>
        <p>{t(locale, service.summary)}</p>
        <div className="service-card__tags">
          {bullets.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </NavLink>
  );
}
