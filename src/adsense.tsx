import { Suspense, use, useEffect, useRef, type ComponentProps, type JSX } from 'react';
import { browser } from 'react-dom';

type AdsWindow = Window & { adsbygoogle?: Array<Record<string, unknown>> };

// Each push fills the first empty <ins class="adsbygoogle"> on the page, so a server rendered one
// can be filled by another ad's push before React hydrates it. Only the browser renders the <ins>.
const inBrowser = browser('@ctrl/react-adsense renders ads in the browser');

export interface AdsenseProps extends ComponentProps<'ins'> {
  /** `data-ad-client`, your publisher ID (`ca-pub-…`) */
  readonly client: string;
  /** `data-ad-slot`, the ad unit ID */
  readonly slot: string;
  /** `data-ad-layout`, e.g. `in-article` */
  readonly layout?: string | undefined;
  /** `data-ad-layout-key`, used by in-feed ads */
  readonly layoutKey?: string | undefined;
  /** `data-ad-format`, pass `''` for fixed size ad units */
  readonly format?: string | undefined;
  /** `data-full-width-responsive` */
  readonly responsive?: string | undefined;
  /** Push `{ google_ad_client, enable_page_level_ads: true }` instead of `{}` */
  readonly pageLevelAds?: boolean | undefined;
  /** `data-adtest`, set to `on` while testing */
  readonly adTest?: string | undefined;
}

export function Adsense(props: AdsenseProps): JSX.Element {
  // The server sends an empty <ins> with the same className and style, so a sized slot keeps its space
  return (
    <Suspense
      fallback={<ins className={props.className} style={{ display: 'block', ...props.style }} />}
    >
      <AdsenseIns {...props} />
    </Suspense>
  );
}

function AdsenseIns({
  className,
  style,
  client,
  slot,
  layout,
  layoutKey,
  format = 'auto',
  responsive = 'false',
  pageLevelAds = false,
  adTest,
  children,
  ...rest
}: AdsenseProps): JSX.Element {
  use(inBrowser);

  // Each push fills one <ins>, so only the first run pushes. StrictMode, <Activity> and prop
  // changes rerun this effect for the same <ins>, a new ad needs a remount (`key`).
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) {
      return;
    }

    pushed.current = true;
    try {
      ((window as AdsWindow).adsbygoogle ??= []).push(
        pageLevelAds ? { google_ad_client: client, enable_page_level_ads: true } : {},
      );
    } catch {
      // adsbygoogle.push() throws when it can't place the ad (blocked, no size, no empty slot)
    }
  }, [client, pageLevelAds]);

  return (
    <ins
      className={className ? `adsbygoogle ${className}` : 'adsbygoogle'}
      style={{ display: 'block', ...style }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      data-adtest={adTest}
      {...rest}
    >
      {children}
    </ins>
  );
}
