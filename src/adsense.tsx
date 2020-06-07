import React from 'react';

type Props = {
  className?: string;
  style?: React.CSSProperties;
  client: string;
  slot: string;
  layout?: string;
  layoutKey?: string;
  format?: string;
  responsive?: string;
};

export const Adsense = ({
  className = '',
  style,
  client,
  slot,
  layout = '',
  layoutKey = '',
  format = 'auto',
  responsive = 'false',
}: Props) => {
  React.useEffect(() => {
    if (window) {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
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
    />
  );
};
