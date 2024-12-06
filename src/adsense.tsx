import React from 'react';
import { useEffect } from 'react';

interface Props {
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly client: string;
  readonly slot: string;
  readonly layout?: string;
  readonly layoutKey?: string;
  readonly format?: string;
  readonly responsive?: string;
  // eslint-disable-next-line react/boolean-prop-naming
  readonly pageLevelAds?: boolean;
  readonly adTest?: string;
  readonly children?: React.ReactNode;
}

export function Adsense({
  className = '',
  style = { display: 'block' },
  client,
  slot,
  layout = '',
  layoutKey = '',
  format = 'auto',
  responsive = 'false',
  pageLevelAds = false,
  adTest,
  children,
  ...rest
}: Props) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: run only once
  useEffect(() => {
    const p: any = {};
    if (pageLevelAds) {
      p.google_ad_client = client;
      p.enable_page_level_ads = true;
    }

    try {
      if (typeof window === 'object') {
        // biome-ignore lint/suspicious/noAssignInExpressions: adsense
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(p);
      }
    } catch {
      // Pass
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
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
