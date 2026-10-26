import { cleanup, render } from '@testing-library/react';
import { createRef, StrictMode } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { Adsense } from './index.js';

const ads = window as Window & { adsbygoogle?: unknown };

afterEach(() => {
  cleanup();
  delete ads.adsbygoogle;
});

describe('Adsense', () => {
  it('should render an adsbygoogle ins', () => {
    const { container } = render(<Adsense client="123" slot="abc" className="ads-class" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should allow children', () => {
    const { container } = render(
      <Adsense client="123" slot="abc" className="ads-class">
        <img alt="placeholder" />
      </Adsense>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should leave out attributes that are not set', () => {
    const { container } = render(<Adsense client="123" slot="abc" />);
    const ins = container.querySelector('ins');
    expect(ins?.className).toBe('adsbygoogle');
    expect(ins?.hasAttribute('data-ad-layout')).toBe(false);
    expect(ins?.hasAttribute('data-ad-layout-key')).toBe(false);
    expect(ins?.hasAttribute('data-adtest')).toBe(false);
  });

  it('should keep display block when given a style', () => {
    const { container } = render(
      <>
        <Adsense client="123" slot="abc" format="" style={{ width: 300, height: 250 }} />
        <Adsense client="123" slot="abc" style={{ display: 'inline-block' }} />
      </>,
    );
    const [sized, inline] = container.querySelectorAll('ins');
    expect(sized?.style.display).toBe('block');
    expect(sized?.style.width).toBe('300px');
    expect(inline?.style.display).toBe('inline-block');
  });

  it('should pass other props and the ref to the ins', () => {
    const ref = createRef<HTMLModElement>();
    const { container } = render(
      <Adsense ref={ref} client="123" slot="abc" id="sidebar-ad" aria-label="Advertisement" />,
    );
    const ins = container.querySelector('#sidebar-ad');
    expect(ins).toBe(ref.current);
    expect(ins?.getAttribute('aria-label')).toBe('Advertisement');
  });

  it('should push to window adsbygoogle', () => {
    render(<Adsense client="123" slot="abc" />);
    expect(ads.adsbygoogle).toEqual([{}]);
  });

  it('should push the page level ads config', () => {
    render(<Adsense client="123" slot="abc" pageLevelAds />);
    expect(ads.adsbygoogle).toEqual([{ google_ad_client: '123', enable_page_level_ads: true }]);
  });

  it('should push once in StrictMode', () => {
    render(
      <StrictMode>
        <Adsense client="123" slot="abc" />
      </StrictMode>,
    );
    expect(ads.adsbygoogle).toEqual([{}]);
  });

  it('should push again when remounted with a new key', () => {
    const { rerender } = render(<Adsense key="/a" client="123" slot="abc" />);
    rerender(<Adsense key="/b" client="123" slot="abc" />);
    expect(ads.adsbygoogle).toEqual([{}, {}]);
  });

  it('should ignore errors thrown by adsbygoogle.push()', () => {
    ads.adsbygoogle = {
      push() {
        throw new Error('TagError: adsbygoogle.push() error: No slot size for availableWidth=0');
      },
    };
    expect(() => render(<Adsense client="123" slot="abc" />)).not.toThrow();
  });
});
